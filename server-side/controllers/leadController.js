import Lead from "../models/Lead.js";
import User from "../models/User.js";
import Property from "../models/Property.js";
import Notification from "../models/Notification.js";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, source, interestedIn, budget, preferences } =
      req.body;

    // Check if lead already exists
    const existingLead = await Lead.findOne({ email, phone });
    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: "Lead already exists with this contact information",
      });
    }

    // Auto-assign to available agent (round-robin or based on specialty)
    const availableAgents = await User.find({
      role: { $in: ["employee", "admin"] },
      isActive: true,
      availability: "available",
    }).select("_id");

    let assignedTo = null;
    if (availableAgents.length > 0) {
      // Simple round-robin assignment
      const randomIndex = Math.floor(Math.random() * availableAgents.length);
      assignedTo = availableAgents[randomIndex]._id;
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      source,
      interestedIn: interestedIn ? JSON.parse(interestedIn) : [],
      budget: budget ? JSON.parse(budget) : {},
      preferences,
      assignedTo,
    });

    // Notify assigned agent
    if (assignedTo) {
      await Notification.create({
        user: assignedTo,
        title: "New Lead Assigned",
        message: `New lead from ${name} has been assigned to you`,
        type: "inquiry",
        relatedEntity: lead._id,
        relatedEntityModel: "Lead",
        priority: "medium",
      });
    }

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLeads = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, priority, assignedTo } = req.query;

    let filter = {};

    // Agents can only see their assigned leads
    if (req.user.role === "employee") {
      filter.assignedTo = req.user.id;
    }

    // Admins can see all leads
    if (req.user.role === "admin" && assignedTo) {
      filter.assignedTo = assignedTo;
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email phone avatar")
      .populate("interestedIn", "title price location")
      .populate("convertedToAppointment", "appointmentDate appointmentTime")
      .populate("convertedToCustomer", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Lead.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: leads.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { status, priority, notes } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Check authorization
    if (
      lead.assignedTo?.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this lead",
      });
    }

    lead.status = status;
    if (priority) lead.priority = priority;

    if (notes) {
      lead.notes.push({
        message: notes,
        createdBy: req.user.id,
      });
    }

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      lead: await lead.populate("assignedTo", "name email phone avatar"),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignLead = async (req, res) => {
  try {
    const { agentId } = req.body;

    const lead = await Lead.findById(req.params.id);
    const agent = await User.findById(agentId);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    if (!agent || !["employee", "admin"].includes(agent.role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid agent",
      });
    }

    // Only admin can reassign leads
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can reassign leads",
      });
    }

    lead.assignedTo = agentId;
    await lead.save();

    // Notify the new agent
    await Notification.create({
      user: agentId,
      title: "New Lead Assigned",
      message: `Lead ${lead.name} has been assigned to you`,
      type: "inquiry",
      relatedEntity: lead._id,
      relatedEntityModel: "Lead",
      priority: "medium",
    });

    res.status(200).json({
      success: true,
      message: "Lead assigned successfully",
      lead: await lead.populate("assignedTo", "name email phone avatar"),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const convertLeadToAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const lead = await Lead.findById(req.params.id);
    const Appointment = await import("../models/Appointment.js").then(
      (module) => module.default
    );
    const appointment = await Appointment.findById(appointmentId);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check authorization
    if (
      lead.assignedTo?.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this lead",
      });
    }

    lead.convertedToAppointment = appointmentId;
    lead.status = "converted";
    lead.convertedAt = new Date();

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead converted to appointment successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLeadStats = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "employee") {
      filter.assignedTo = req.user.id;
    }

    const stats = await Lead.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalLeads = await Lead.countDocuments(filter);
    const newLeads = await Lead.countDocuments({ ...filter, status: "new" });
    const convertedLeads = await Lead.countDocuments({
      ...filter,
      status: "converted",
    });

    res.status(200).json({
      success: true,
      stats: {
        total: totalLeads,
        new: newLeads,
        converted: convertedLeads,
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
