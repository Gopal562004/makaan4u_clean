import axios from "axios";
import { getApiUrl } from "utils/getApiUrl";
const API_BASE_URL = getApiUrl();

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data || error);
  }
);

/**
 * Get all notifications for the current user
 * @returns {Promise}
 */
export const fetchNotifications = async () => {
  try {
    const response = await api.get("/notifications");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get notification stats (unread count)
 * @returns {Promise}
 */
export const getNotificationStats = async () => {
  try {
    const response = await api.get("/notifications/stats");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Mark a specific notification as read
 * @param {string} id - Notification ID
 * @returns {Promise}
 */
export const markAsRead = async (id) => {
  try {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Mark all notifications as read
 * @returns {Promise}
 */
export const markAllAsRead = async () => {
  try {
    const response = await api.put("/notifications/mark-all-read");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete a notification
 * @param {string} id - Notification ID
 * @returns {Promise}
 */
export const deleteNotification = async (id) => {
  try {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
