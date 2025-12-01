// utils/urlParams.js

/**
 * Utility functions for managing URL parameters for search, filter, and sort
 */

// Default filter state
export const defaultFilters = {
  priceRange: { min: "", max: "" },
  location: [],
  propertyType: [],
  bedrooms: "",
  bathrooms: "",
  amenities: [],
  agent: "",
};

// Default search and sort state
export const defaultSearchState = {
  query: "",
  sortBy: "relevance",
  viewMode: "grid",
  showMapView: false,
  page: 1,
};

/**
 * Convert filters to URL parameters
 */
export const filtersToParams = (filters, searchState) => {
  const params = new URLSearchParams();

  // Search query
  if (searchState.query && searchState.query.trim() !== "") {
    params.set("q", searchState.query.trim());
  }

  // Sort parameters
  if (searchState.sortBy && searchState.sortBy !== defaultSearchState.sortBy) {
    params.set("sort", searchState.sortBy);
  }

  // View mode
  if (
    searchState.viewMode &&
    searchState.viewMode !== defaultSearchState.viewMode
  ) {
    params.set("view", searchState.viewMode);
  }

  // Map view
  if (searchState.showMapView !== defaultSearchState.showMapView) {
    params.set("map", searchState.showMapView.toString());
  }

  // Pagination
  if (searchState.page && searchState.page !== defaultSearchState.page) {
    params.set("page", searchState.page.toString());
  }

  // Price range
  if (filters.priceRange?.min && filters.priceRange.min !== "") {
    params.set("min_price", filters.priceRange.min);
  }

  if (filters.priceRange?.max && filters.priceRange.max !== "") {
    params.set("max_price", filters.priceRange.max);
  }

  // Location (array)
  if (filters.location && filters.location.length > 0) {
    params.set("location", filters.location.join(","));
  }

  // Property type (array)
  if (filters.propertyType && filters.propertyType.length > 0) {
    params.set("type", filters.propertyType.join(","));
  }

  // Bedrooms
  if (filters.bedrooms && filters.bedrooms !== "") {
    params.set("bedrooms", filters.bedrooms);
  }

  // Bathrooms
  if (filters.bathrooms && filters.bathrooms !== "") {
    params.set("bathrooms", filters.bathrooms);
  }

  // Amenities (array)
  if (filters.amenities && filters.amenities.length > 0) {
    params.set("amenities", filters.amenities.join(","));
  }

  // Agent
  if (filters.agent && filters.agent !== "") {
    params.set("agent", filters.agent);
  }

  return params;
};

/**
 * Convert URL parameters to filters and search state
 */
export const paramsToFilters = (searchParams) => {
  const filters = { ...defaultFilters };
  const searchState = { ...defaultSearchState };

  // Convert URLSearchParams to plain object
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  // Search query
  if (params.q) {
    searchState.query = params.q;
  }

  // Sort parameters
  if (params.sort) {
    searchState.sortBy = params.sort;
  }

  // View mode
  if (params.view) {
    searchState.viewMode = params.view;
  }

  // Map view
  if (params.map) {
    searchState.showMapView = params.map === "true";
  }

  // Pagination
  if (params.page) {
    const page = parseInt(params.page);
    if (!isNaN(page) && page > 0) {
      searchState.page = page;
    }
  }

  // Price range
  if (params.min_price) {
    filters.priceRange.min = params.min_price;
  }
  if (params.max_price) {
    filters.priceRange.max = params.max_price;
  }

  // Location (array)
  if (params.location) {
    filters.location = params.location
      .split(",")
      .filter((loc) => loc.trim() !== "");
  }

  // Property type (array)
  if (params.type) {
    filters.propertyType = params.type
      .split(",")
      .filter((type) => type.trim() !== "");
  }

  // Bedrooms
  if (params.bedrooms) {
    filters.bedrooms = params.bedrooms;
  }

  // Bathrooms
  if (params.bathrooms) {
    filters.bathrooms = params.bathrooms;
  }

  // Amenities (array)
  if (params.amenities) {
    filters.amenities = params.amenities
      .split(",")
      .filter((amenity) => amenity.trim() !== "");
  }

  // Agent
  if (params.agent) {
    filters.agent = params.agent;
  }

  return { filters, searchState };
};

/**
 * Update URL with new parameters
 */
export const updateURL = (filters, searchState, navigate, location) => {
  const params = filtersToParams(filters, searchState);
  const queryString = params.toString();
  const newPath = `${location.pathname}${queryString ? `?${queryString}` : ""}`;

  // Use replace to update URL without adding to history
  navigate(newPath, { replace: true });
};

/**
 * Check if filters are active
 */
export const hasActiveFilters = (filters, searchState) => {
  if (searchState.query && searchState.query.trim() !== "") return true;
  if (filters.priceRange.min || filters.priceRange.max) return true;
  if (filters.location.length > 0) return true;
  if (filters.propertyType.length > 0) return true;
  if (filters.bedrooms) return true;
  if (filters.bathrooms) return true;
  if (filters.amenities.length > 0) return true;
  if (filters.agent) return true;
  if (searchState.sortBy !== defaultSearchState.sortBy) return true;
  if (searchState.viewMode !== defaultSearchState.viewMode) return true;
  if (searchState.showMapView !== defaultSearchState.showMapView) return true;

  return false;
};

/**
 * Generate SEO-friendly canonical URL
 */
export const getCanonicalUrl = (filters, searchState, baseUrl) => {
  const params = filtersToParams(filters, searchState);
  return `${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`;
};

/**
 * Generate meta description based on filters and search
 */
export const generateMetaDescription = (
  filters,
  searchState,
  totalProperties
) => {
  const parts = [];

  if (searchState.query) {
    parts.push(`Properties for "${searchState.query}"`);
  } else {
    parts.push("Properties");
  }

  if (filters.location.length > 0) {
    parts.push(`in ${filters.location.join(", ")}`);
  }

  if (filters.propertyType.length > 0) {
    parts.push(
      `- ${filters.propertyType
        .map(
          (type) =>
            type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")
        )
        .join(", ")}`
    );
  }

  if (filters.priceRange.min || filters.priceRange.max) {
    const min = filters.priceRange.min
      ? `₹${parseInt(filters.priceRange.min).toLocaleString()}`
      : "";
    const max = filters.priceRange.max
      ? `₹${parseInt(filters.priceRange.max).toLocaleString()}`
      : "";
    parts.push(`priced ${min}${min && max ? " - " : ""}${max}`);
  }

  parts.push(`| ${totalProperties} properties found`);

  return parts.join(" ");
};
