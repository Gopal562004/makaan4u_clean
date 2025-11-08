import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["appointment", "inquiry", "property", "system", "promotional"],
      required: true,
    },
    relatedEntity: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "relatedEntityModel",
    },
    relatedEntityModel: {
      type: String,
      enum: ["Property", "Appointment", "ContactInquiry", "Review"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    actionUrl: String,
    image: String,
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });

export default mongoose.model("Notification", notificationSchema);
