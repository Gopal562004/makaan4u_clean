
import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

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
      const dropdownHeight = 320; // Approximate dropdown height

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

              {/* Clear Button */}
              {/* {localSearch && (
                // <button
                //   type="button"
                //   onClick={handleSearchClear}
                //   className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                //   aria-label="Clear search"
                // >
                //   <Icon name="X" size={16} />
                // </button>
              )} */}

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

              {/* Dropdown Menu - Responsive positioning */}
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

        {/* Mobile Results Count - Below controls */}
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

export default React.memo(SearchAndSort);