import React, { useState } from "react";
import { useProfileContext } from "../ProfileLayout";
import {
  Camera,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Edit3,
  Save,
  X,
  User,
} from "lucide-react";

const Profile = () => {
  const {
    user,
    onUserUpdate,
    onAvatarUpdate,
    loading,
    setError,
    getUserInitials,
    isValidAvatar,
  } = useProfileContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });
  const [avatarLoading, setAvatarLoading] = useState(false);

  const handleSave = async () => {
    try {
      await onUserUpdate(formData);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      setError(error.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      bio: user?.bio || "",
    });
    setIsEditing(false);
    setError(null);
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("Image size should be less than 5MB");
      return;
    }

    try {
      setAvatarLoading(true);
      await onAvatarUpdate(file);
      setError(null);
    } catch (error) {
      setError(error.message || "Failed to update avatar");
    } finally {
      setAvatarLoading(false);
      // Reset file input
      event.target.value = "";
    }
  };

  if (!user) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Profile Information
          </h2>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
            disabled={loading}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            {loading ? "Loading..." : "Edit Profile"}
          </button>
        ) : (
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              disabled={loading}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Avatar & Basic Info */}
        <div className="lg:col-span-1">
          <div className="text-center">
            <div className="relative inline-block">
              {isValidAvatar(user.avatar) ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full border-4 border-white shadow-lg mx-auto flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {getUserInitials(user.name)}
                  </span>
                </div>
              )}
              {isEditing && (
                <div className="absolute bottom-2 right-2">
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    disabled={avatarLoading}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer block ${
                      avatarLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {avatarLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </label>
                </div>
              )}
            </div>

            {!isEditing && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    Joined{" "}
                    {new Date(
                      user.joinedDate || user.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {user.location || "Not specified"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              ) : (
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{user.name}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              ) : (
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{user.email}</span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              ) : (
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{user.phone || "Not specified"}</span>
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              ) : (
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{user.location || "Not specified"}</span>
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about yourself and your property preferences..."
                  disabled={loading}
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    {user.bio ||
                      "No bio added yet. Tell us about yourself and your property preferences."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
