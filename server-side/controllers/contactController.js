import ContactInquiry from "../models/ContactInquiry.js";
import Property from "../models/Property.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { sendInquiryNotification } from "../utils/email.js";

export const createContactInquiry = async (req, res) => {
  try {
    const { propertyId, inquiryType, message } = req.body;

    // Get property details
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Get agent details
    const agent = await User.findById(property.postedBy);
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Property agent not found",
      });
    }

    const contactInquiry = await ContactInquiry.create({
      property: propertyId,
      customer: req.user.id,
      agent: agent._id,
      inquiryType,
      message,
    });

    // Send notification to agent
    await sendInquiryNotification(contactInquiry, req.user, agent, property);

    // Create notification for agent
    await Notification.create({
      user: agent._id,
      title: "New Contact Inquiry",
      message: `${req.user.name} sent a ${inquiryType} inquiry for ${property.title}`,
      type: "inquiry",
      relatedEntity: contactInquiry._id,
      relatedEntityModel: "ContactInquiry",
      priority: "high",
    });

    // Generate contact links for immediate use
    const contactLinks = agent.getContactLinks();

    res.status(201).json({
      success: true,
      message: "Contact inquiry submitted successfully",
      contactInquiry,
      agentContact: {
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        designation: agent.designation,
        contactLinks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyInquiries = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let filter = { customer: req.user.id };
    if (status) filter.status = status;

    const inquiries = await ContactInquiry.find(filter)
      .populate("property", "title price location images")
      .populate("agent", "name email phone avatar designation")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ContactInquiry.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: inquiries.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAgentInquiries = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let filter = { agent: req.user.id };
    if (status) filter.status = status;

    const inquiries = await ContactInquiry.find(filter)
      .populate("property", "title price location images")
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ContactInquiry.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: inquiries.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { status, responseNotes } = req.body;

    const inquiry = await ContactInquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    // Check if user is the assigned agent or admin
    if (inquiry.agent.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this inquiry",
      });
    }

    inquiry.status = status;
    if (responseNotes) {
      inquiry.responseNotes = responseNotes;
      inquiry.respondedBy = req.user.id;
      inquiry.respondedAt = new Date();
    }

    await inquiry.save();

    // Create notification for customer
    if (status === "contacted" || status === "responded") {
      await Notification.create({
        user: inquiry.customer,
        title: "Inquiry Update",
        message: `Your inquiry for ${inquiry.propertyInfo.title} has been ${status}`,
        type: "inquiry",
        relatedEntity: inquiry._id,
        relatedEntityModel: "ContactInquiry",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry status updated successfully",
      inquiry: await inquiry.populate([
        { path: "property", select: "title price location" },
        { path: "customer", select: "name email phone" },
      ]),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
