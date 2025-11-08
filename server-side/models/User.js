import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "employee", "admin"],
      default: "customer",
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: "Phone number must be 10 digits",
      },
    },
    avatar: {
      type: String,
      default: "default-avatar.jpg",
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // Professional Information (for employees/admins)
    designation: {
      type: String,
      default: "Property Consultant",
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot be more than 500 characters"],
      default: "",
    },
    experience: {
      type: Number, // years of experience
      default: 0,
    },
    languages: [
      {
        type: String,
        default: ["English", "Hindi"],
      },
    ],
    specialties: [
      {
        type: String, // e.g., ["Residential", "Commercial", "Luxury Homes"]
      },
    ],

    // Performance Metrics (for agents)
    performance: {
      totalPropertiesListed: {
        type: Number,
        default: 0,
      },
      totalPropertiesSold: {
        type: Number,
        default: 0,
      },
      totalRevenueGenerated: {
        type: Number,
        default: 0,
      },
      averageDealSize: {
        type: Number,
        default: 0,
      },
    },

    // Rating System
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
    },

    // Contact Information
    contactInfo: {
      officePhone: {
        type: String,
        default: "",
      },
      officeEmail: {
        type: String,
        default: "",
      },
      officeAddress: {
        type: String,
        default: "",
      },
      whatsappNumber: {
        type: String,
        default: "",
      },
    },

    // Social Links
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
    },

    // Availability
    availability: {
      type: String,
      enum: ["available", "busy", "on-leave", "on-site"],
      default: "available",
    },

    // Settings
    settings: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      smsNotifications: {
        type: Boolean,
        default: true,
      },
      whatsappNotifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Get agent info for property (used in Property model pre-save)
userSchema.methods.getAgentInfo = function () {
  if (this.role === "customer") return null;

  return {
    name: this.name,
    email: this.email,
    phone: this.phone,
    designation: this.designation,
    avatar: this.avatar,
    experience: this.experience ? `${this.experience}+` : "0+",
    languages: this.languages,
    rating: this.rating.average,
    reviewCount: this.rating.totalReviews,
    propertiesSold: this.performance.totalPropertiesSold,
  };
};

// Generate contact links for frontend
userSchema.methods.getContactLinks = function () {
  const phone = this.contactInfo.officePhone || this.phone;
  const whatsapp = this.contactInfo.whatsappNumber || this.phone;
  const email = this.contactInfo.officeEmail || this.email;

  return {
    call: `tel:${phone}`,
    whatsapp: `https://wa.me/91${whatsapp}`,
    sms: `sms:${phone}`,
    email: `mailto:${email}`,
  };
};

// Update performance metrics when property is sold
userSchema.methods.updatePerformance = function (propertyPrice) {
  if (this.role === "customer") return;

  this.performance.totalPropertiesSold += 1;
  this.performance.totalRevenueGenerated += propertyPrice;
  this.performance.averageDealSize =
    this.performance.totalRevenueGenerated /
    this.performance.totalPropertiesSold;
};

export default mongoose.model("User", userSchema);
