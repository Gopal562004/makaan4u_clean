import Appointment from "../models/Appointment.js";
import Property from "../models/Property.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import {
  sendAppointmentConfirmation,
  sendAppointmentReminder,
} from "../utils/email.js";

export const createAppointment = async (req, res) => {
  try {
    const {
      propertyId,
      appointmentDate,
      appointmentTime,
      meetingMode,
      message,
    } = req.body;

    // Get property and agent
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const agent = await User.findById(property.postedBy);
    if (!agent) {
      return res.status(400).json({
        success: false,
        message: "Property agent not found",
      });
    }

    // Check if appointment time is available
    const existingAppointment = await Appointment.findOne({
      property: propertyId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message:
          "This time slot is already booked. Please choose another time.",
      });
    }

    const appointment = await Appointment.create({
      property: propertyId,
      customer: req.user.id,
      employee: agent._id,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      meetingMode,
      customerMessage: message,
    });

    // Send confirmation email
    await sendAppointmentConfirmation(appointment, req.user, agent, property);

    // Create notification for agent
    await Notification.create({
      user: agent._id,
      title: "New Appointment Scheduled",
      message: `${req.user.name} scheduled a viewing for ${property.title}`,
      type: "appointment",
      relatedEntity: appointment._id,
      relatedEntityModel: "Appointment",
      priority: "high",
    });

    res.status(201).json({
      success: true,
      message: "Appointment scheduled successfully",
      appointment: await appointment.populate([
        { path: "property", select: "title price location images" },
        { path: "employee", select: "name email phone avatar designation" },
      ]),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let filter = {};

    if (req.user.role === "customer") {
      filter.customer = req.user.id;
    } else if (req.user.role === "employee" || req.user.role === "admin") {
      filter.employee = req.user.id;
    }

    if (status) {
      filter.status = status;
    }

    const appointments = await Appointment.find(filter)
      .populate("property", "title price location images")
      .populate("customer", "name email phone")
      .populate("employee", "name email phone avatar designation")
      .sort({ appointmentDate: -1, appointmentTime: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: appointments.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("property")
      .populate("customer", "name email phone")
      .populate("employee", "name email phone avatar designation");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check if user is authorized to view this appointment
    if (
      appointment.customer._id.toString() !== req.user.id &&
      appointment.employee._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this appointment",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, internalNotes } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check authorization
    if (
      appointment.employee.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this appointment",
      });
    }

    appointment.status = status;
    if (internalNotes) appointment.internalNotes = internalNotes;

    if (status === "confirmed") {
      appointment.confirmedAt = new Date();
      appointment.confirmationSent = true;
    }

    await appointment.save();

    // Create notification for customer
    if (status === "confirmed" || status === "cancelled") {
      await Notification.create({
        user: appointment.customer,
        title: `Appointment ${status}`,
        message: `Your appointment for ${appointment.propertyInfo.title} has been ${status}`,
        type: "appointment",
        relatedEntity: appointment._id,
        relatedEntityModel: "Appointment",
      });
    }

    res.status(200).json({
      success: true,
      message: `Appointment ${status} successfully`,
      appointment: await appointment.populate([
        { path: "property", select: "title price location images" },
        { path: "customer", select: "name email phone" },
        { path: "employee", select: "name email phone avatar designation" },
      ]),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check if user can cancel
    if (
      appointment.customer.toString() !== req.user.id &&
      appointment.employee.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this appointment",
      });
    }

    if (!appointment.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message:
          "Appointment cannot be cancelled less than 2 hours before scheduled time",
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    // Create notification for the other party
    const notificationUser =
      appointment.customer.toString() === req.user.id
        ? appointment.employee
        : appointment.customer;

    await Notification.create({
      user: notificationUser,
      title: "Appointment Cancelled",
      message: `Appointment for ${appointment.propertyInfo.title} has been cancelled`,
      type: "appointment",
      relatedEntity: appointment._id,
      relatedEntityModel: "Appointment",
    });

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAppointmentStats = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "employee") {
      filter.employee = req.user.id;
    } else if (req.user.role === "customer") {
      filter.customer = req.user.id;
    }

    const stats = await Appointment.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalAppointments = await Appointment.countDocuments(filter);
    const upcomingAppointments = await Appointment.countDocuments({
      ...filter,
      status: "confirmed",
      appointmentDate: { $gte: new Date() },
    });

    res.status(200).json({
      success: true,
      stats: {
        total: totalAppointments,
        upcoming: upcomingAppointments,
        byStatus: stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
