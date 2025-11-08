import mongoose from "mongoose";

const propertyViewSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ipAddress: String,
    userAgent: String,
    viewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

propertyViewSchema.index({ property: 1, viewedAt: -1 });
propertyViewSchema.index({ user: 1, property: 1 });

// Update property views count
propertyViewSchema.post("save", async function () {
  const Property = mongoose.model("Property");
  const viewCount = await mongoose.model("PropertyView").countDocuments({
    property: this.property,
  });

  await Property.findByIdAndUpdate(this.property, { views: viewCount });
});

export default mongoose.model("PropertyView", propertyViewSchema);
