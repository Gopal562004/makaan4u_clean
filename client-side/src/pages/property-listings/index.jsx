import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import FloatingChat from "../../components/ui/FloatingChat";
import FilterSidebar from "./components/FilterSidebar";
import PropertyGrid from "./components/PropertyGrid";
import PropertyMap from "./components/PropertyMap";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import Input from "../../components/ui/Input";

import {
  getAllProperties,
  getFilterOptions,
} from "../../lib/mongo/services/propertyService";

// SearchAndSort Component
const SearchAndSort = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onFilterToggle,
  propertyCount = 0,
  showMapView = false,
  onMapToggle,
  className = "",
  showResultsCount = true,
  searchPlaceholder = "Search by location, property name, or keywords...",
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery || "");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const sortRef = useRef(null);
  const buttonRef = useRef(null);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate dropdown position based on available space
  useEffect(() => {
    if (isSortOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const dropdownHeight = 320;

      setDropdownPosition(
        spaceBelow < dropdownHeight && spaceAbove > spaceBelow
          ? "top"
          : "bottom"
      );
    }
  }, [isSortOpen]);

  // Sync local search with prop changes
  useEffect(() => {
    setLocalSearch(searchQuery || "");
  }, [searchQuery]);

  const sortOptions = [
    { value: "relevance", label: "Most Relevant", icon: "Star" },
    { value: "price-low", label: "Price: Low to High", icon: "ArrowUp" },
    { value: "price-high", label: "Price: High to Low", icon: "ArrowDown" },
    { value: "newest", label: "Newest First", icon: "Calendar" },
    { value: "oldest", label: "Oldest First", icon: "Clock" },
    { value: "area-large", label: "Largest Area", icon: "Maximize2" },
    { value: "area-small", label: "Smallest Area", icon: "Minimize2" },
    { value: "bedrooms", label: "Most Bedrooms", icon: "Bed" },
    { value: "bathrooms", label: "Most Bathrooms", icon: "Bath" },
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearchChange(localSearch.trim());
  };

  const handleSearchClear = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  const handleSearchChange = (value) => {
    setLocalSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    } else if (e.key === "Escape") {
      handleSearchClear();
    }
  };

  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsSortOpen(false);
  };

  const getSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === sortBy);
    return option ? option.label : "Sort by";
  };

  const formatPropertyCount = () => {
    if (propertyCount === 0) return "No properties found";
    if (propertyCount === 1) return "1 property found";
    return `${propertyCount.toLocaleString()} properties found`;
  };

  return (
    <div
      className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 py-4 lg:py-5">
          {/* Search Bar */}
          <div className="flex-1 w-full lg:max-w-md xl:max-w-xl min-w-0">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder={searchPlaceholder}
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                aria-label="Search properties"
              />

              {/* Search Icon */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Icon
                  name="Search"
                  size={18}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 p-1.5 text-primary hover:text-primary/80 transition-colors duration-200"
                aria-label="Search"
              >
                <Icon name="Search" size={16} />
              </button>
            </form>
          </div>

          {/* Controls Container */}
          <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-3 lg:gap-4 min-w-0">
            {/* Results Count - Hidden on mobile */}
            {showResultsCount && (
              <div className="hidden lg:block text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                {formatPropertyCount()}
              </div>
            )}

            {/* Sort Dropdown */}
            <div className="relative flex-shrink-0" ref={sortRef}>
              <Button
                ref={buttonRef}
                variant="outline"
                onClick={toggleSortDropdown}
                iconName="ArrowUpDown"
                iconPosition="left"
                className="min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] justify-between px-3 sm:px-4 py-2 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black"
                aria-expanded={isSortOpen}
                aria-haspopup="listbox"
              >
                <span className="truncate text-xs sm:text-sm">
                  {getSortLabel()}
                </span>
                <Icon
                  name="ChevronDown"
                  size={14}
                  className={`ml-1 sm:ml-2 flex-shrink-0 transition-transform duration-200 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {/* Dropdown Menu */}
              {isSortOpen && (
                <div
                  className={`absolute ${
                    dropdownPosition === "top"
                      ? "bottom-full mb-2"
                      : "top-full mt-2"
                  } right-0 w-64 max-w-[90vw] sm:max-w-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 animate-in fade-in-0 zoom-in-95 max-h-80 overflow-y-auto`}
                >
                  <div className="p-2 space-y-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortSelect(option.value)}
                        className={`w-full flex items-center gap-2 sm:gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                          sortBy === option.value
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        role="option"
                        aria-selected={sortBy === option.value}
                      >
                        <Icon
                          name={option.icon}
                          size={14}
                          className={`flex-shrink-0 ${
                            sortBy === option.value
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="flex-1 text-left truncate">
                          {option.label}
                        </span>
                        {sortBy === option.value && (
                          <Icon
                            name="Check"
                            size={14}
                            className="text-primary flex-shrink-0"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700 flex-shrink-0">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm border border-gray-300 dark:border-gray-600"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                title="Grid View"
                aria-label="Switch to grid view"
              >
                <Icon name="Grid3X3" size={16} className="sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm border border-gray-300 dark:border-gray-600"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                title="List View"
                aria-label="Switch to list view"
              >
                <Icon name="List" size={16} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Map Toggle - Hidden on mobile */}
            <Button
              variant={showMapView ? "primary" : "outline"}
              onClick={onMapToggle}
              iconName="Map"
              iconPosition="left"
              className="hidden lg:flex px-3 sm:px-4 py-2 text-sm font-medium whitespace-nowrap flex-shrink-0"
            >
              <span className="hidden xl:inline">
                {showMapView ? "Hide Map" : "Show Map"}
              </span>
              <span className="xl:hidden">{showMapView ? "Map" : "Map"}</span>
            </Button>

            {/* Filter Button - Mobile only */}
            <Button
              variant="outline"
              onClick={onFilterToggle}
              iconName="Filter"
              className="lg:hidden px-3 py-2 text-sm font-medium bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 flex-shrink-0 min-w-[auto]"
              aria-label="Open filters"
            >
              <span className="sr-only sm:not-sr-only sm:inline">Filters</span>
            </Button>
          </div>
        </div>

        {/* Mobile Results Count */}
        {showResultsCount && (
          <div className="lg:hidden pb-3 lg:pb-0">
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium text-center lg:text-left">
              {formatPropertyCount()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchAndSortMemo = React.memo(SearchAndSort);

// URL Parameter Helper Functions
const useURLParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getURLParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      search: params.get("search") || "",
      sort: params.get("sort") || "relevance",
      view: params.get("view") || "grid",
      map: params.get("map") === "true",
      page: parseInt(params.get("page")) || 1,
      price_min: params.get("price_min") || "",
      price_max: params.get("price_max") || "",
      location: params.get("location") ? params.get("location").split(",") : [],
      type: params.get("type") ? params.get("type").split(",") : [],
      bedrooms: params.get("bedrooms") || "",
      bathrooms: params.get("bathrooms") || "",
      amenities: params.get("amenities")
        ? params.get("amenities").split(",")
        : [],
      agent: params.get("agent") || "",
    };
  };

  const updateURLParams = (updates) => {
    const currentParams = getURLParams();
    const newParams = { ...currentParams, ...updates };

    const params = new URLSearchParams();

    // Only add non-empty parameters to URL
    Object.entries(newParams).forEach(([key, value]) => {
      if (key === "page" && value === 1) return; // Don't show page=1 in URL
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      )
        return;

      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(","));
        }
      } else if (typeof value === "boolean") {
        params.set(key, value.toString());
      } else {
        params.set(key, value.toString());
      }
    });

    const newSearch = params.toString();
    const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ""}`;

    // Use replace instead of push to avoid adding to browser history for every filter change
    navigate(newUrl, { replace: true });
  };

  return { getURLParams, updateURLParams };
};

// Main PropertyListings Component
const PropertyListings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getURLParams, updateURLParams } = useURLParams();

  const [user] = useState({
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    role: "buyer",
  });

  // Initialize state from URL parameters
  const urlParams = getURLParams();

  const [filters, setFilters] = useState({
    priceRange: { min: urlParams.price_min, max: urlParams.price_max },
    location: urlParams.location,
    propertyType: urlParams.type,
    bedrooms: urlParams.bedrooms,
    bathrooms: urlParams.bathrooms,
    amenities: urlParams.amenities,
    agent: urlParams.agent,
  });

  const [searchQuery, setSearchQuery] = useState(urlParams.search);
  const [sortBy, setSortBy] = useState(urlParams.sort);
  const [viewMode, setViewMode] = useState(urlParams.view);
  const [showMapView, setShowMapView] = useState(urlParams.map);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMapProperty, setSelectedMapProperty] = useState(null);
  const [wishlistedProperties, setWishlistedProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    cities: [],
    types: [],
    amenities: [],
    priceRange: { min: 0, max: 0 },
    bedrooms: [],
    bathrooms: [],
  });
  const [page, setPage] = useState(urlParams.page);
  const [totalPages, setTotalPages] = useState(1);

  // Helper functions for sorting
  const getSortField = (sortValue) => {
    const sortMap = {
      relevance: "createdAt",
      "price-low": "price",
      "price-high": "price",
      newest: "createdAt",
      oldest: "createdAt",
      "area-large": "specifications.area",
      "area-small": "specifications.area",
      bedrooms: "specifications.bedrooms",
      bathrooms: "specifications.bathrooms",
    };
    return sortMap[sortValue] || "createdAt";
  };

  const getSortOrder = (sortValue) => {
    const descendingSorts = [
      "price-high",
      "newest",
      "area-large",
      "bedrooms",
      "bathrooms",
    ];
    return descendingSorts.includes(sortValue) ? "desc" : "asc";
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      // Map frontend filters to backend API parameters
      const queryFilters = {
        page,
        limit: 12,
        search: searchQuery,
        type: filters.propertyType[0] || "",
        city: filters.location[0] || "",
        minPrice: filters.priceRange.min || "",
        maxPrice: filters.priceRange.max || "",
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
        agent: filters.agent,
        sortBy: getSortField(sortBy),
        sortOrder: getSortOrder(sortBy),
        amenities:
          filters.amenities.length > 0 ? filters.amenities.join(",") : "",
      };

      // Remove empty filters
      Object.keys(queryFilters).forEach((key) => {
        if (
          queryFilters[key] === "" ||
          queryFilters[key] === null ||
          queryFilters[key] === undefined
        ) {
          delete queryFilters[key];
        }
      });

      const data = await getAllProperties(queryFilters);
      setProperties(data.properties || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const data = await getFilterOptions();
      setFilterOptions(data.options || { cities: [], types: [] });
    } catch (err) {
      console.error("Failed to fetch filter options:", err);
    }
  };

  // Update URL when filters change
  const updateFiltersInURL = useCallback(
    (newFilters) => {
      updateURLParams({
        search: searchQuery,
        sort: sortBy,
        view: viewMode,
        map: showMapView,
        page: page > 1 ? page : 1,
        price_min: newFilters.priceRange.min,
        price_max: newFilters.priceRange.max,
        location: newFilters.location.join(","),
        type: newFilters.propertyType.join(","),
        bedrooms: newFilters.bedrooms,
        bathrooms: newFilters.bathrooms,
        amenities: newFilters.amenities.join(","),
        agent: newFilters.agent,
      });
    },
    [searchQuery, sortBy, viewMode, showMapView, page, updateURLParams]
  );

  // Handle URL parameter changes
  useEffect(() => {
    const params = getURLParams();

    // Update state from URL parameters
    if (params.search !== searchQuery) setSearchQuery(params.search);
    if (params.sort !== sortBy) setSortBy(params.sort);
    if (params.view !== viewMode) setViewMode(params.view);
    if (params.map !== showMapView) setShowMapView(params.map);
    if (params.page !== page) setPage(params.page);

    const newFilters = {
      priceRange: { min: params.price_min, max: params.price_max },
      location: params.location,
      propertyType: params.type,
      bedrooms: params.bedrooms,
      bathrooms: params.bathrooms,
      amenities: params.amenities,
      agent: params.agent,
    };

    setFilters(newFilters);
  }, [location.search]); // Only depend on location.search

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [filters, searchQuery, sortBy, page]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    updateFiltersInURL(newFilters);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1);
    updateURLParams({
      search: query,
      page: 1,
    });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    updateURLParams({
      sort: newSortBy,
    });
  };

  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
    updateURLParams({
      view: newViewMode,
    });
  };

  const handleMapToggle = () => {
    const newMapView = !showMapView;
    setShowMapView(newMapView);
    updateURLParams({
      map: newMapView,
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    updateURLParams({
      page: newPage > 1 ? newPage : 1,
    });
  };

  const handleWishlistToggle = (propertyId) => {
    setWishlistedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleLogout = () => navigate("/login");

  // Generate dynamic meta tags based on URL parameters
  const getPageMetaTags = () => {
    const params = getURLParams();
    const baseTitle = "Property Listings | Find Your Dream Home";
    const baseDescription =
      "Browse through our extensive collection of properties. Find apartments, villas, plots, and commercial spaces with detailed filters and map view.";

    let dynamicTitle = baseTitle;
    let dynamicDescription = baseDescription;

    // Customize based on search query
    if (params.search) {
      dynamicTitle = `Properties in ${params.search} | Real Estate Platform`;
      dynamicDescription = `Find properties in ${params.search}. Browse listings with prices, photos, and contact details.`;
    }

    // Customize based on property type filter
    if (params.type.length > 0) {
      const types = params.type.join(", ");
      dynamicTitle = `${types} Properties | Real Estate Listings`;
      dynamicDescription = `Explore ${types.toLowerCase()} properties for sale and rent. Find your perfect ${types.toLowerCase()} with our advanced search filters.`;
    }

    // Customize based on location filter
    if (params.location.length > 0) {
      const locations = params.location.join(", ");
      dynamicTitle = `Properties in ${locations} | Real Estate`;
      dynamicDescription = `Discover properties in ${locations}. Browse residential and commercial real estate listings with verified details.`;
    }

    // Add price range to description if specified
    if (params.price_min || params.price_max) {
      const priceText =
        params.price_min && params.price_max
          ? ` priced between ₹${parseInt(
              params.price_min
            ).toLocaleString()} and ₹${parseInt(
              params.price_max
            ).toLocaleString()}`
          : params.price_min
          ? ` priced from ₹${parseInt(params.price_min).toLocaleString()}`
          : ` priced up to ₹${parseInt(params.price_max).toLocaleString()}`;

      dynamicDescription += priceText;
    }

    const currentUrl = window.location.href;
    const imageUrl = "/images/property-listings-og.jpg";

    // Generate canonical URL without page parameter for SEO
    const canonicalParams = new URLSearchParams(location.search);
    canonicalParams.delete("page");
    const canonicalUrl = `${window.location.origin}${location.pathname}${
      canonicalParams.toString() ? `?${canonicalParams.toString()}` : ""
    }`;

    return (
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <meta
          name="keywords"
          content="real estate, property, buy property, rent apartment, commercial property, residential property, house for sale"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Real Estate Platform" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={dynamicTitle} />
        <meta property="twitter:description" content={dynamicDescription} />
        <meta property="twitter:image" content={imageUrl} />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Pagination SEO */}
        {page > 1 && (
          <link rel="prev" href={`${canonicalUrl}?page=${page - 1}`} />
        )}
        {page < totalPages && (
          <link rel="next" href={`${canonicalUrl}?page=${page + 1}`} />
        )}

        {/* Structured Data for Search Engines */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: dynamicTitle,
            description: dynamicDescription,
            url: canonicalUrl,
            numberOfItems: properties.length,
            itemListElement: properties.slice(0, 10).map((property, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "RealEstateListing",
                name: property.title,
                description: `Property in ${
                  property.location?.city || property.location
                }`,
                url: `${window.location.origin}/property-details/${property.slug}`,
                image: property.images?.[0]?.url,
                offers: {
                  "@type": "Offer",
                  price: property.price,
                  priceCurrency: "INR",
                  availability:
                    property.status === "available"
                      ? "https://schema.org/InStock"
                      : "https://schema.org/OutOfStock",
                },
              },
            })),
          })}
        </script>

        {/* Additional Schema for SearchAction */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: window.location.origin,
            potentialAction: {
              "@type": "SearchAction",
              target: `${window.location.origin}/properties?search={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          })}
        </script>

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: window.location.origin,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Properties",
                item: currentUrl,
              },
            ],
          })}
        </script>
      </Helmet>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SEO Meta Tags */}
      {getPageMetaTags()}

      <Header
        user={user}
        notificationCount={3}
        onLogout={handleLogout}
        onSearch={handleSearchChange}
      />

      <motion.div
        className="flex h-[calc(100vh-64px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            propertyCount={properties.length}
            filterOptions={filterOptions}
          />
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          propertyCount={properties.length}
          filterOptions={filterOptions}
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          isMobile
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <SearchAndSortMemo
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onFilterToggle={() => setIsMobileFilterOpen(true)}
            propertyCount={properties.length}
            showMapView={showMapView}
            onMapToggle={handleMapToggle}
          />

          <div className="flex-1 overflow-hidden bg-white">
            {showMapView ? (
              <div className="h-full flex">
                <div className="w-1/2 overflow-y-auto border-r border-slate-200 custom-scrollbar">
                  <PropertyGrid
                    properties={properties}
                    viewMode={viewMode}
                    onWishlistToggle={handleWishlistToggle}
                    wishlistedProperties={wishlistedProperties}
                    loading={loading}
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
                <div className="w-1/2">
                  <PropertyMap
                    properties={properties}
                    onPropertySelect={setSelectedMapProperty}
                    selectedProperty={selectedMapProperty}
                  />
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto custom-scrollbar">
                <PropertyGrid
                  properties={properties}
                  viewMode={viewMode}
                  onWishlistToggle={handleWishlistToggle}
                  wishlistedProperties={wishlistedProperties}
                  loading={loading}
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <FloatingChat
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-40 bg-white border-slate-300 shadow-lg hover:shadow-xl hover:border-slate-400"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={18} />
      </Button>

      {/* Scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
          border: 2px solid #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default PropertyListings;