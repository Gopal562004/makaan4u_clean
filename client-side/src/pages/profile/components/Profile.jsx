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
  ShieldCheck,
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

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
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
      event.target.value = "";
    }
  };

  if (!user) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="bg-white border border-gray-200">
        <div className="p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start justify-between">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative group">
              {isValidAvatar(user.avatar) ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover border border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-bold text-black">
                    {getUserInitials(user.name)}
                  </span>
                </div>
              )}
              
              {isEditing && (
                <div className="absolute -bottom-3 -right-3">
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
                    className={`bg-blue-600 text-white p-2 cursor-pointer flex items-center justify-center border border-blue-600 ${
                      avatarLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                  >
                    {avatarLoading ? (
                      <div className="animate-spin h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Camera className="w-4 h-4" strokeWidth={1.5} />
                    )}
                  </label>
                </div>
              )}
            </div>

            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-black uppercase tracking-tight flex items-center justify-center sm:justify-start">
                {user.name}
                {user.role === 'agent' && (
                  <ShieldCheck className="w-5 h-5 text-black ml-3" strokeWidth={1.5} />
                )}
              </h2>
              <p className="text-gray-500 font-medium text-sm sm:text-base tracking-widest uppercase mt-1 sm:mt-2">{user.email}</p>
              
              {!isEditing && (
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-6">
                  <div className="flex items-center text-gray-500 text-xs tracking-widest uppercase">
                    <Calendar className="w-4 h-4 mr-2 text-black" strokeWidth={1.5} />
                    Joined {new Date(user.joinedDate || user.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-500 text-xs tracking-widest uppercase">
                    <MapPin className="w-4 h-4 mr-2 text-black" strokeWidth={1.5} />
                    {user.location || "Location not specified"}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 sm:mt-0 flex space-x-3 w-full sm:w-auto">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 sm:flex-none items-center justify-center px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-bold text-xs tracking-widest uppercase"
                disabled={loading}
              >
                <span className="flex items-center justify-center">
                  <Edit3 className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  {loading ? "Loading..." : "Edit Profile"}
                </span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none items-center justify-center px-6 py-3 bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors font-bold text-xs tracking-widest uppercase"
                  disabled={loading}
                >
                  <span className="flex items-center justify-center">
                    <X className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Cancel
                  </span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 sm:flex-none items-center justify-center px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-bold text-xs tracking-widest uppercase"
                  disabled={loading}
                >
                  <span className="flex items-center justify-center">
                    <Save className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    {loading ? "Saving..." : "Save"}
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Form Details Section */}
      <div className="bg-white border border-gray-200 p-6 sm:p-10">
        <h3 className="text-xl font-bold text-black uppercase tracking-widest mb-8 border-b border-black pb-4">Personal Details</h3>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {/* Name */}
          <div className="group">
            <label className="block text-xs font-bold text-black tracking-widest uppercase mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-0 py-2 bg-transparent border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors text-base text-black rounded-none"
                disabled={loading}
              />
            ) : (
              <div className="flex items-center py-2 border-b border-gray-100 group-hover:border-blue-600 transition-colors">
                <User className="w-5 h-5 text-gray-400 mr-4" strokeWidth={1.5} />
                <span className="font-medium text-black text-base">{user.name}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="group">
            <label className="block text-xs font-bold text-black tracking-widest uppercase mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-0 py-2 bg-transparent border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors text-base text-black rounded-none"
                disabled={loading}
              />
            ) : (
              <div className="flex items-center py-2 border-b border-gray-100 group-hover:border-blue-600 transition-colors">
                <Mail className="w-5 h-5 text-gray-400 mr-4" strokeWidth={1.5} />
                <span className="font-medium text-black text-base">{user.email}</span>
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="group">
            <label className="block text-xs font-bold text-black tracking-widest uppercase mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-0 py-2 bg-transparent border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors text-base text-black rounded-none"
                disabled={loading}
              />
            ) : (
              <div className="flex items-center py-2 border-b border-gray-100 group-hover:border-blue-600 transition-colors">
                <Phone className="w-5 h-5 text-gray-400 mr-4" strokeWidth={1.5} />
                <span className="font-medium text-black text-base">{user.phone || "Not specified"}</span>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="group">
            <label className="block text-xs font-bold text-black tracking-widest uppercase mb-2">
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-0 py-2 bg-transparent border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors text-base text-black rounded-none"
                disabled={loading}
              />
            ) : (
              <div className="flex items-center py-2 border-b border-gray-100 group-hover:border-blue-600 transition-colors">
                <MapPin className="w-5 h-5 text-gray-400 mr-4" strokeWidth={1.5} />
                <span className="font-medium text-black text-base">{user.location || "Not specified"}</span>
              </div>
            )}
          </div>

          {/* Bio */}
          <div className="md:col-span-2 group">
            <label className="block text-xs font-bold text-black tracking-widest uppercase mb-2">
              About Me
            </label>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows="3"
                className="w-full px-0 py-2 bg-transparent border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 transition-colors text-base text-black rounded-none resize-none"
                placeholder="Tell us about yourself and your property preferences..."
                disabled={loading}
              />
            ) : (
              <div className="py-2 border-b border-gray-100 group-hover:border-blue-600 transition-colors min-h-[80px]">
                <p className={`text-black leading-relaxed text-base ${!user.bio ? 'text-gray-400 italic' : ''}`}>
                  {user.bio || "No bio added yet. Tell us about yourself and your property preferences."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
