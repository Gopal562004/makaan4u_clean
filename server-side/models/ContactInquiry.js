import mongoose from "mongoose";

const contactInquirySchema = new mongoose.Schema(
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
    inquiryType: {
      type: String,
      enum: ["whatsapp", "call", "sms", "email", "appointment", "general"],
      required: true,
    },
    message: {
      type: String,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "responded", "closed"],
      default: "new",
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    responseNotes: {
      type: String,
      maxlength: 1000,
    },
    respondedAt: Date,
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export default mongoose.model("ContactInquiry", contactInquirySchema);
