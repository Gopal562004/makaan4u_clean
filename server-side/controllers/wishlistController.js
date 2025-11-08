import Wishlist from "../models/Wishlist.js";
import Property from "../models/Property.js";

export const addToWishlist = async (req, res) => {
  try {
    const { propertyId } = req.body;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check if already in wishlist
    const existingWishlist = await Wishlist.findOne({
      user: req.user.id,
      property: propertyId,
    });

    if (existingWishlist) {
      return res.status(400).json({
        success: false,
        message: "Property already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      property: propertyId,
    });

    res.status(201).json({
      success: true,
      message: "Property added to wishlist",
      wishlist: await wishlist.populate("property"),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const wishlist = await Wishlist.findOneAndDelete({
      user: req.user.id,
      property: propertyId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Property not found in wishlist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;

    const wishlistItems = await Wishlist.find({ user: req.user.id })
      .populate({
        path: "property",
        populate: {
          path: "postedBy",
          select: "name avatar designation",
        },
      })
      .sort({ addedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Wishlist.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: wishlistItems.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      wishlist: wishlistItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkWishlistStatus = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const wishlistItem = await Wishlist.findOne({
      user: req.user.id,
      property: propertyId,
    });

    res.status(200).json({
      success: true,
      inWishlist: !!wishlistItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
