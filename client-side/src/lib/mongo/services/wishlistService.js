import axios from "axios";
import { getApiUrl } from "../../../utils/getApiUrl";

const API_BASE_URL = getApiUrl();

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  // 🔥 ADD REQUEST LOGGING
  console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
    data: config.data,
    headers: config.headers,
  });

  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (res) => {
    // 🔥 ADD SUCCESS RESPONSE LOGGING
    console.log(`✅ API Response: ${res.status} ${res.config.url}`, res.data);
    return res;
  },
  (err) => {
    // 🔥 ADD ERROR RESPONSE LOGGING
    console.error(`❌ API Error: ${err.response?.status} ${err.config?.url}`, {
      error: err.response?.data,
      config: err.config,
    });
    return Promise.reject(err.response?.data || { message: err.message });
  }
);

/** Wishlist APIs **/

// Add to wishlist - matches backend POST /wishlist
export const addToWishlist = async (propertyId) => {
  try {
    const res = await api.post("/wishlist", { propertyId });
    return res.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

// Remove from wishlist - matches backend DELETE /wishlist/:propertyId
export const removeFromWishlist = async (propertyId) => {
  try {
    const res = await api.delete(`/wishlist/${propertyId}`);
    return res.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};

// Get wishlist items (paginated) - matches backend GET /wishlist
export const getWishlist = async (page = 1, limit = 12) => {
  try {
    const res = await api.get("/wishlist", { params: { page, limit } });
    return res.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Check if a property is wishlisted - matches backend GET /wishlist/:propertyId/status
export const checkWishlistStatus = async (propertyId) => {
  try {
    const res = await api.get(`/wishlist/${propertyId}/status`);
    return res.data;
  } catch (error) {
    console.error("Error checking wishlist status:", error);
    throw error;
  }
};

/** Unified wishlist service **/
export const wishlistService = {
  add: addToWishlist,
  remove: removeFromWishlist,
  get: getWishlist,
  checkStatus: checkWishlistStatus,

  // Aliases for convenience
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  checkWishlistStatus,
};

export default wishlistService;
