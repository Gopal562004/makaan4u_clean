// scripts/updateSlugs.js
import mongoose from "mongoose";
import slugify from "slugify";
import dotenv from "dotenv";
dotenv.config();

import Property from "../models/Property.js"; // ✅ FIXED REAL PATH

// ---------------------------------------------
// CONNECT DB
// ---------------------------------------------
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  }
}

// ---------------------------------------------
// GENERATE UNIQUE SLUG
// ---------------------------------------------
async function generateUniqueSlug(property) {
  const titlePart = slugify(property.title || "property", {
    lower: true,
    strict: true,
  });

  const cityPart = property.location?.city
    ? slugify(property.location.city, { lower: true, strict: true })
    : "";

  let baseSlug = cityPart ? `${titlePart}-in-${cityPart}` : titlePart;

  let slug = baseSlug;
  let counter = 1;

  while (await Property.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

// ---------------------------------------------
// UPDATE SLUGS
// ---------------------------------------------
async function updateSlugs() {
  await connectDB();

  const properties = await Property.find({
    $or: [{ slug: { $exists: false } }, { slug: "" }, { slug: null }],
  });

  console.log(`🔍 Found ${properties.length} properties needing slug update`);

  for (const property of properties) {
    const newSlug = await generateUniqueSlug(property);

    await Property.findByIdAndUpdate(
      property._id,
      { slug: newSlug },
      { runValidators: false }
    );

    console.log(`✔ Updated ${property._id} → ${newSlug}`);
  }

  console.log("🎉 Slug update complete!");
  process.exit(0);
}

updateSlugs();
