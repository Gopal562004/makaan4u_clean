import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      maxlength: 100,
    },
    comment: {
      type: String,
      maxlength: 1000,
    },
    images: [
      {
        url: String,
        altText: String,
      },
    ],
    helpful: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    response: {
      by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      message: String,
      respondedAt: Date,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// Ensure one review per customer per property
reviewSchema.index({ customer: 1, property: 1 }, { unique: true });

// Update agent rating when new review is added
reviewSchema.post("save", async function () {
  const Review = mongoose.model("Review");
  const User = mongoose.model("User");

  const agentReviews = await Review.find({ agent: this.agent });
  const averageRating =
    agentReviews.reduce((sum, review) => sum + review.rating, 0) /
    agentReviews.length;

  await User.findByIdAndUpdate(this.agent, {
    "rating.average": Math.round(averageRating * 10) / 10,
    "rating.totalReviews": agentReviews.length,
  });
});

export default mongoose.model("Review", reviewSchema);
