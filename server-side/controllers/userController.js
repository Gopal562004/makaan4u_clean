import User from "../models/User.js";
import Property from "../models/Property.js";
import Appointment from "../models/Appointment.js";
import Review from "../models/Review.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      bio,
      languages,
      specialties,
      contactInfo,
      socialLinks,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        phone,
        bio,
        languages,
        specialties,
        contactInfo: contactInfo ? JSON.parse(contactInfo) : {},
        socialLinks: socialLinks ? JSON.parse(socialLinks) : {},
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.path },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAgents = async (req, res) => {
  try {
    const { page = 1, limit = 12, city, specialty } = req.query;

    let filter = {
      role: { $in: ["employee", "admin"] },
      isActive: true,
    };

    if (city) {
      filter["contactInfo.officeAddress"] = new RegExp(city, "i");
    }

    if (specialty) {
      filter.specialties = specialty;
    }

    const agents = await User.find(filter)
      .select(
        "name email phone avatar designation experience specialties languages rating performance contactInfo"
      )
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ "rating.average": -1, "performance.totalPropertiesSold": -1 });

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: agents.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      agents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAgentProfile = async (req, res) => {
  try {
    const agent = await User.findById(req.params.id).select(
      "name email phone avatar designation bio experience specialties languages rating performance contactInfo socialLinks"
    );

    if (!agent || !["employee", "admin"].includes(agent.role)) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    // Get agent's active properties count
    const propertiesCount = await Property.countDocuments({
      postedBy: agent._id,
      isActive: true,
      status: "available",
    });

    // Get agent's upcoming appointments
    const upcomingAppointments = await Appointment.countDocuments({
      employee: agent._id,
      status: "confirmed",
      appointmentDate: { $gte: new Date() },
    });

    // Get agent's recent reviews
    const recentReviews = await Review.find({ agent: agent._id })
      .populate("customer", "name avatar")
      .populate("property", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      agent: {
        ...agent.toObject(),
        stats: {
          propertiesCount,
          upcomingAppointments,
          totalReviews: agent.rating.totalReviews,
          averageRating: agent.rating.average,
        },
        recentReviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    let stats = {};

    if (req.user.role === "customer") {
      // Customer stats
      const propertiesViewed = await PropertyView.countDocuments({
        user: req.user.id,
      });
      const appointments = await Appointment.countDocuments({
        customer: req.user.id,
      });
      const wishlistCount = await (
        await import("../models/Wishlist.js")
      ).default.countDocuments({ user: req.user.id });

      stats = {
        propertiesViewed,
        appointments,
        wishlistCount,
      };
    } else if (["employee", "admin"].includes(req.user.role)) {
      // Agent/Admin stats
      const totalProperties = await Property.countDocuments({
        postedBy: req.user.id,
      });
      const activeProperties = await Property.countDocuments({
        postedBy: req.user.id,
        status: "available",
        isActive: true,
      });
      const totalAppointments = await Appointment.countDocuments({
        employee: req.user.id,
      });
      const upcomingAppointments = await Appointment.countDocuments({
        employee: req.user.id,
        status: "confirmed",
        appointmentDate: { $gte: new Date() },
      });
      const newInquiries = await (
        await import("../models/ContactInquiry.js")
      ).default.countDocuments({
        agent: req.user.id,
        status: "new",
      });

      stats = {
        totalProperties,
        activeProperties,
        totalAppointments,
        upcomingAppointments,
        newInquiries,
        ...req.user.performance,
      };
    }

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
