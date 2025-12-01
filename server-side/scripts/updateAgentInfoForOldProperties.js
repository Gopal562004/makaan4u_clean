import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import mongoose from "mongoose";
import Property from "../models/Property.js";
import User from "../models/User.js";

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGODB_URI missing in .env");
  process.exit(1);
}

async function updateAgentInfo() {
  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected");

    // Find all properties with postedBy user
    const properties = await Property.find({
      postedBy: { $exists: true, $ne: null },
    });

    console.log(`🔍 Found ${properties.length} properties...\n`);

    let updated = 0;

    for (const property of properties) {
      const user = property.postedBy?._id
        ? await User.findById(property.postedBy._id)
        : await User.findById(property.postedBy);

      if (!user) {
        console.log(`⚠ No user found for property ${property._id}`);
        continue;
      }

      // Build new agent info
      const agentInfo = {
        name: user.name || "Agent",
        email: user.email || "",
        phone: user.phone || "",
        designation: user.designation || "Property Consultant",
        avatar: user.avatar || "",
        experience: user.experience ? `${user.experience}+` : "0+",
        languages: user.languages || ["English", "Hindi"],
        rating: user.rating?.average || 0,
        reviewCount: user.rating?.totalReviews || 0,
        propertiesSold: user.performance?.totalPropertiesSold || 0,
        isManualAgent: false,
      };

      // Update without validation (SAFE)
      await Property.updateOne(
        { _id: property._id },
        { $set: { agentInfo } },
        { strict: false }
      );

      console.log(`✔ Updated agentInfo for ${property._id}`);
      updated++;
    }

    console.log(`\n🎉 DONE — Updated ${updated} properties`);
    process.exit();
  } catch (err) {
    console.error("❌ ERROR:", err);
    process.exit(1);
  }
}

updateAgentInfo();
