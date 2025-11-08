import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    // Property Reference
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    // User References
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Appointment Details
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
      enum: [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ],
    },
    meetingMode: {
      type: String,
      enum: ["in-person", "virtual", "phone"],
      default: "in-person",
    },

    // Status Tracking
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "rescheduled"],
      default: "pending",
    },

    // Customer Information (cached for easy access)
    customerInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },

    // Property Information (cached for easy access)
    propertyInfo: {
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      location: {
        address: String,
        city: String,
        state: String,
      },
      images: [
        {
          url: String,
          altText: String,
        },
      ],
    },

    // Agent Information (cached for easy access)
    agentInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      designation: String,
      avatar: String,
    },

    // Communication
    customerMessage: {
      type: String,
      maxlength: 500,
    },
    internalNotes: {
      type: String,
      maxlength: 1000,
    },

    // Confirmation & Reminders
    confirmationSent: {
      type: Boolean,
      default: false,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
    confirmedAt: Date,

    // Rescheduling
    rescheduledFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    rescheduleReason: String,
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// Auto-populate cached information before saving
appointmentSchema.pre("save", async function (next) {
  if (this.isModified("property") || !this.propertyInfo.title) {
    const Property = mongoose.model("Property");
    const property = await Property.findById(this.property);
    if (property) {
      this.propertyInfo = {
        title: property.title,
        price: property.price,
        location: {
          address: property.location.address,
          city: property.location.city,
          state: property.location.state,
        },
        images: property.images.slice(0, 1), // Primary image only
      };
    }
  }

  if (this.isModified("customer") || !this.customerInfo.name) {
    const User = mongoose.model("User");
    const customer = await User.findById(this.customer);
    if (customer) {
      this.customerInfo = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      };
    }
  }

  if (this.isModified("employee") || !this.agentInfo.name) {
    const User = mongoose.model("User");
    const agent = await User.findById(this.employee);
    if (agent) {
      this.agentInfo = {
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        designation: agent.designation,
        avatar: agent.avatar,
      };
    }
  }
  next();
});

// Virtual for formatted date and time
appointmentSchema.virtual("formattedDateTime").get(function () {
  const date = this.appointmentDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeSlots = {
    "09:00": "9:00 AM",
    "10:00": "10:00 AM",
    "11:00": "11:00 AM",
    "12:00": "12:00 PM",
    "14:00": "2:00 PM",
    "15:00": "3:00 PM",
    "16:00": "4:00 PM",
    "17:00": "5:00 PM",
  };

  return {
    date,
    time: timeSlots[this.appointmentTime],
    full: `${date} at ${timeSlots[this.appointmentTime]}`,
  };
});

// Virtual for appointment status color
appointmentSchema.virtual("statusColor").get(function () {
  const colors = {
    pending: "warning",
    confirmed: "success",
    completed: "primary",
    cancelled: "error",
    rescheduled: "info",
  };
  return colors[this.status] || "default";
});

// Indexes for better performance
appointmentSchema.index({ customer: 1 });
appointmentSchema.index({ employee: 1 });
appointmentSchema.index({ property: 1 });
appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ createdAt: -1 });

// Method to check if appointment is upcoming
appointmentSchema.methods.isUpcoming = function () {
  const now = new Date();
  const appointmentDateTime = new Date(this.appointmentDate);
  const [hours, minutes] = this.appointmentTime.split(":");
  appointmentDateTime.setHours(parseInt(hours), parseInt(minutes));

  return appointmentDateTime > now && this.status === "confirmed";
};

// Method to check if appointment can be cancelled
appointmentSchema.methods.canBeCancelled = function () {
  const now = new Date();
  const appointmentDateTime = new Date(this.appointmentDate);
  const [hours, minutes] = this.appointmentTime.split(":");
  appointmentDateTime.setHours(parseInt(hours), parseInt(minutes));

  const hoursDifference = (appointmentDateTime - now) / (1000 * 60 * 60);
  return hoursDifference > 2 && ["pending", "confirmed"].includes(this.status);
};

export default mongoose.model("Appointment", appointmentSchema);
