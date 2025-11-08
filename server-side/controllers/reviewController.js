import Review from "../models/Review.js";
import Property from "../models/Property.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const createReview = async (req, res) => {
  try {
    const { propertyId, agentId, rating, title, comment } = req.body;

    // Verify that the user had an appointment with this agent for this property
    const appointment = await Appointment.findOne({
      property: propertyId,
      customer: req.user.id,
      employee: agentId,
      status: "completed",
    });

    if (!appointment) {
      return res.status(400).json({
        success: false,
        message:
          "You can only review properties you have visited through an appointment",
      });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({
      property: propertyId,
      customer: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this property",
      });
    }

    const review = await Review.create({
      property: propertyId,
      customer: req.user.id,
      agent: agentId,
      rating,
      title,
      comment,
      images: req.files
        ? req.files.map((file) => ({
            url: file.path,
            altText: `Review image for ${title}`,
          }))
        : [],
    });

    // Create notification for agent
    await Notification.create({
      user: agentId,
      title: "New Review Received",
      message: `${req.user.name} left a ${rating}-star review for your property`,
      type: "review",
      relatedEntity: review._id,
      relatedEntityModel: "Review",
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review: await review.populate([
        { path: "customer", select: "name avatar" },
        { path: "property", select: "title images" },
      ]),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPropertyReviews = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({ property: propertyId })
      .populate("customer", "name avatar")
      .populate("agent", "name avatar designation")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Review.countDocuments({ property: propertyId });

    // Calculate average rating
    const ratingStats = await Review.aggregate([
      { $match: { property: propertyId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: "$rating",
          },
        },
      },
    ]);

    const stats = ratingStats[0] || {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: [],
    };

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      stats,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAgentReviews = async (req, res) => {
  try {
    const { agentId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({ agent: agentId })
      .populate("customer", "name avatar")
      .populate("property", "title images")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Review.countDocuments({ agent: agentId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, title, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if user owns the review
    if (review.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this review",
      });
    }

    review.rating = rating;
    review.title = title;
    review.comment = comment;

    if (req.files && req.files.length > 0) {
      review.images = req.files.map((file) => ({
        url: file.path,
        altText: `Review image for ${title}`,
      }));
    }

    await review.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: await review.populate([
        { path: "customer", select: "name avatar" },
        { path: "property", select: "title images" },
      ]),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Check if user owns the review or is admin
    if (
      review.customer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this review",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markReviewHelpful = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.helpful += 1;
    await review.save();

    res.status(200).json({
      success: true,
      message: "Review marked as helpful",
      helpfulCount: review.helpful,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
