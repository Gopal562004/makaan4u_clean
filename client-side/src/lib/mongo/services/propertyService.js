// // import axios from "axios";

// // // Base URL from environment
// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // // Create Axios instance
// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // // Add auth token if exists
// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token"); // assuming you store JWT here
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // /** Property APIs **/

// // // Get all properties with filters
// // export const getAllProperties = async (filters = {}) => {
// //   try {
// //     const response = await api.get("/properties", { params: filters });
// //     return response.data;
// //   } catch (error) {
// //     throw error.response?.data || error;
// //   }
// // };

// // // Get single property by ID
// // export const getPropertyById = async (id) => {
// //   try {
// //     const response = await api.get(`/properties/${id}`);
// //     return response.data;
// //   } catch (error) {
// //     throw error.response?.data || error;
// //   }
// // };

// // // Create new property (multipart for images)
// // export const createProperty = async (data) => {
// //   try {
// //     const formData = new FormData();
// //     Object.keys(data).forEach((key) => {
// //       if (Array.isArray(data[key]) || typeof data[key] === "object") {
// //         formData.append(key, JSON.stringify(data[key]));
// //       } else {
// //         formData.append(key, data[key]);
// //       }
// //     });

// //     if (data.images && data.images.length > 0) {
// //       data.images.forEach((file) => formData.append("images", file));
// //     }

// //     const response = await api.post("/properties", formData, {
// //       headers: { "Content-Type": "multipart/form-data" },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     throw error.response?.data || error;
// //   }
// // };

// // // Update property
// // export const updateProperty = async (id, data) => {
// //   try {
// //     const formData = new FormData();
// //     Object.keys(data).forEach((key) => {
// //       if (Array.isArray(data[key]) || typeof data[key] === "object") {
// //         formData.append(key, JSON.stringify(data[key]));
// //       } else {
// //         formData.append(key, data[key]);
// //       }
// //     });

// //     if (data.images && data.images.length > 0) {
// //       data.images.forEach((file) => formData.append("images", file));
// //     }

// //     const response = await api.put(`/properties/${id}`, formData, {
// //       headers: { "Content-Type": "multipart/form-data" },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     throw error.response?.data || error;
// //   }
// // };

// // // Delete property
// // export const deleteProperty = async (id) => {
// //   try {
// //     const response = await api.delete(`/properties/${id}`);
// //     return response.data;
// //   } catch (error) {
// //     throw error.response?.data || error;
// //   }
// // };

// // // Get featured properties
// // export const getFeaturedProperties = async () => {
// //   try {
// //     const response = await api.get("/properties/featured");
// //     return response.data;
// //   } catch (error) {
// //     throw error.response?.data || error;
// //   }
// // };

// // // Get properties of a specific agent
// // export const getAgentProperties = async (agentId, page = 1, limit = 12) => {
// //   try {
// //     const response = await api.get(`/properties/agent/${agentId}`, {
// //       params: { page, limit },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     throw error.response?.data || error;
// //   }
// // };

// // // Get filter options (cities, types)
// // export const getFilterOptions = async () => {
// //   try {
// //     const response = await api.get("/properties/filters");
// //     return response.data;
// //   } catch (error) {
// //     throw error.response?.data || error;
// //   }
// // };
// // api/propertyApi.js
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Auth interceptor
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Optional: response interceptor for unified error handling
// api.interceptors.response.use(
//   (res) => res,
//   (err) => Promise.reject(err.response?.data || { message: err.message })
// );

// /** Property APIs **/

// // Get all properties with filters & pagination
// export const getAllProperties = async (filters = {}) => {
//   const res = await api.get("/properties", { params: filters });
//   return res.data;
// };

// // Get single property by ID
// export const getPropertyById = async (id) => {
//   const res = await api.get(`/properties/${id}`);
//   return res.data;
// };

// // Create property (supports images)
// export const createProperty = async (data) => {
//   const formData = new FormData();

//   Object.keys(data).forEach((key) => {
//     if (Array.isArray(data[key]) || typeof data[key] === "object") {
//       formData.append(key, JSON.stringify(data[key]));
//     } else {
//       formData.append(key, data[key]);
//     }
//   });

//   if (data.images?.length) data.images.forEach((file) => formData.append("images", file));

//   const res = await api.post("/properties", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };

// // Update property
// export const updateProperty = async (id, data) => {
//   const formData = new FormData();

//   Object.keys(data).forEach((key) => {
//     if (Array.isArray(data[key]) || typeof data[key] === "object") {
//       formData.append(key, JSON.stringify(data[key]));
//     } else {
//       formData.append(key, data[key]);
//     }
//   });

//   if (data.images?.length) data.images.forEach((file) => formData.append("images", file));

//   const res = await api.put(`/properties/${id}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };

// // Delete property
// export const deleteProperty = async (id) => {
//   const res = await api.delete(`/properties/${id}`);
//   return res.data;
// };

// // Get featured properties
// export const getFeaturedProperties = async () => {
//   const res = await api.get("/properties/featured");
//   return res.data;
// };

// // Get agent properties
// export const getAgentProperties = async (agentId, page = 1, limit = 12) => {
//   const res = await api.get(`/properties/agent/${agentId}`, { params: { page, limit } });
//   return res.data;
// };

// // Get filter options (cities/types)
// export const getFilterOptions = async () => {
//   const res = await api.get("/properties/filters");
//   return res.data;
// };

// export const getAvailableAgents = async () => {
//   try {
//     const res = await api.get("/properties/available-agents/list");
//     return res.data; // { success, count, agents }
//   } catch (error) {
//     throw error.response?.data || error;
//   }
// };


import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Optional: response interceptor for unified error handling
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err.response?.data || { message: err.message })
);

/** Property APIs **/

// Get all properties with filters & pagination
export const getAllProperties = async (filters = {}) => {
  try {
    // Map frontend filter names to backend parameter names
    const params = {
      page: filters.page,
      limit: filters.limit,
      search: filters.search,
      type: filters.type,
      city: filters.city,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      bedrooms: filters.bedrooms,
      bathrooms: filters.bathrooms,
      agent: filters.agent,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      amenities: filters.amenities,
    };

    // Remove undefined or empty parameters
    Object.keys(params).forEach((key) => {
      if (
        params[key] === "" ||
        params[key] === null ||
        params[key] === undefined
      ) {
        delete params[key];
      }
    });

    const res = await api.get("/properties", { params });
    return res.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

// Get single property by ID
export const getPropertyById = async (id) => {
  try {
    const res = await api.get(`/properties/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
};

// Create property (supports images)
export const createProperty = async (data) => {
  try {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "images") return; // Skip images for now

      if (Array.isArray(data[key]) || typeof data[key] === "object") {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    });

    // Handle images separately
    if (data.images?.length) {
      data.images.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });
    }

    const res = await api.post("/properties", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};

// Update property
export const updateProperty = async (id, data) => {
  try {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "images") return; // Skip images for now

      if (Array.isArray(data[key]) || typeof data[key] === "object") {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    });

    // Handle new images
    if (data.images?.length) {
      data.images.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });
    }

    const res = await api.put(`/properties/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

// Delete property
export const deleteProperty = async (id) => {
  try {
    const res = await api.delete(`/properties/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

// Get featured properties
export const getFeaturedProperties = async () => {
  try {
    const res = await api.get("/properties/featured");
    return res.data;
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    throw error;
  }
};

// Get agent properties
export const getAgentProperties = async (agentId, page = 1, limit = 12) => {
  try {
    const res = await api.get(`/properties/agent/${agentId}`, {
      params: { page, limit },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching agent properties:", error);
    throw error;
  }
};

// Get filter options (cities/types/amenities)
export const getFilterOptions = async () => {
  try {
    const res = await api.get("/properties/filter-options");
    return res.data;
  } catch (error) {
    console.error("Error fetching filter options:", error);
    throw error;
  }
};

// Get available agents
export const getAvailableAgents = async () => {
  try {
    const res = await api.get("/properties/agents/available");
    return res.data;
  } catch (error) {
    console.error("Error fetching available agents:", error);
    throw error;
  }
};

// Enhanced property service with better error handling
export const propertyService = {
  // Search and filter
  searchProperties: async (filters = {}) => {
    return getAllProperties(filters);
  },

  // Get properties by various criteria
  getByType: async (type, page = 1, limit = 12) => {
    return getAllProperties({ type, page, limit });
  },

  getByLocation: async (city, page = 1, limit = 12) => {
    return getAllProperties({ city, page, limit });
  },

  getByPriceRange: async (minPrice, maxPrice, page = 1, limit = 12) => {
    return getAllProperties({ minPrice, maxPrice, page, limit });
  },

  // Property management
  create: createProperty,
  update: updateProperty,
  delete: deleteProperty,
  getById: getPropertyById,

  // Special queries
  getFeatured: getFeaturedProperties,
  getAgentProperties,
  getFilterOptions,
  getAvailableAgents,

  // Utility methods
  incrementViews: async (propertyId) => {
    try {
      // This would typically be handled automatically by the backend
      // when fetching a property, but you can add a separate endpoint if needed
      console.log(`View incremented for property: ${propertyId}`);
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  },
};

export default propertyService;