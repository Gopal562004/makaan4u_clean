import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error);
  }
);

/** Authentication Services **/

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise}
 */
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    // Store token and user data in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Login user
 * @param {Object} credentials - Email and password
 * @returns {Promise}
 */
export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);

    // Store token and user data in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Logout user
 * @returns {Promise}
 */
export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return response.data;
  } catch (error) {
    // Clear localStorage even if API call fails
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    throw error.response?.data || error;
  }
};

/**
 * Get current user profile
 * @returns {Promise}
 */
export const getMe = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update user profile
 * @param {Object} profileData - Profile data to update
 * @returns {Promise}
 */
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/auth/profile", profileData);

    // Update user in localStorage if needed
    if (response.data.user) {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...currentUser, ...response.data.user };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update user avatar
 * @param {File} avatarFile - Image file for avatar
 * @returns {Promise}
 */
export const updateAvatar = async (avatarFile) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await api.put("/auth/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Update user in localStorage
    if (response.data.user) {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...currentUser,
        avatar: response.data.user.avatar,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Change password
 * @param {Object} passwordData - Current and new password
 * @returns {Promise}
 */
export const changePassword = async (passwordData) => {
  try {
    const response = await api.put("/auth/change-password", passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Forgot password
 * @param {string} email - User email
 * @returns {Promise}
 */
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Reset password
 * @param {Object} resetData - Reset token and new password
 * @returns {Promise}
 */
export const resetPassword = async (resetData) => {
  try {
    const response = await api.post("/auth/reset-password", resetData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Verify email
 * @param {string} token - Verification token
 * @returns {Promise}
 */
export const verifyEmail = async (token) => {
  try {
    const response = await api.post("/auth/verify-email", { token });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Resend verification email
 * @param {string} email - User email
 * @returns {Promise}
 */
export const resendVerification = async (email) => {
  try {
    const response = await api.post("/auth/resend-verification", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Utility functions
export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export const getStoredToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
