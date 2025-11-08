import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    // Lead Source
    source: {
      type: String,
      enum: ["website", "whatsapp", "call", "email", "walk-in", "referral"],
      required: true,
    },

    // Lead Information
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },

    // Property Interest
    interestedIn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    budget: {
      min: Number,
      max: Number,
    },
    preferences: {
      type: String,
      maxlength: 500,
    },

    // Assignment & Status
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "lost"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    // Communication History
    notes: [
      {
        message: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Conversion Tracking
    convertedToAppointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    convertedToCustomer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    convertedAt: Date,
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

leadSchema.index({ assignedTo: 1, status: 1 });
leadSchema.index({ createdAt: -1 });

export default mongoose.model("Lead", leadSchema);
