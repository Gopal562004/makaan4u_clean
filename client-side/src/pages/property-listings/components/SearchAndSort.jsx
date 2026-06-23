
// import React, { useState, useEffect, useRef } from "react";
// import Icon from "../../../components/AppIcon";
// import Input from "../../../components/ui/Input";
// import Button from "../../../components/ui/Button";

// const SearchAndSort = ({
//   searchQuery,
//   onSearchChange,
//   sortBy,
//   onSortChange,
//   viewMode,
//   onViewModeChange,
//   onFilterToggle,
//   propertyCount = 0,
//   showMapView = false,
//   onMapToggle,
//   className = "",
//   showResultsCount = true,
//   searchPlaceholder = "Search by location, property name, or keywords...",
// }) => {
//   const [localSearch, setLocalSearch] = useState(searchQuery || "");
//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const [dropdownPosition, setDropdownPosition] = useState("bottom");
//   const sortRef = useRef(null);
//   const buttonRef = useRef(null);

//   // Close sort dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sortRef.current && !sortRef.current.contains(event.target)) {
//         setIsSortOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Calculate dropdown position based on available space
//   useEffect(() => {
//     if (isSortOpen && buttonRef.current) {
//       const buttonRect = buttonRef.current.getBoundingClientRect();
//       const spaceBelow = window.innerHeight - buttonRect.bottom;
//       const spaceAbove = buttonRect.top;
//       const dropdownHeight = 320; // Approximate dropdown height

//       setDropdownPosition(
//         spaceBelow < dropdownHeight && spaceAbove > spaceBelow
//           ? "top"
//           : "bottom"
//       );
//     }
//   }, [isSortOpen]);

//   // Sync local search with prop changes
//   useEffect(() => {
//     setLocalSearch(searchQuery || "");
//   }, [searchQuery]);

//   const sortOptions = [
//     { value: "relevance", label: "Most Relevant", icon: "Star" },
//     { value: "price-low", label: "Price: Low to High", icon: "ArrowUp" },
//     { value: "price-high", label: "Price: High to Low", icon: "ArrowDown" },
//     { value: "newest", label: "Newest First", icon: "Calendar" },
//     { value: "oldest", label: "Oldest First", icon: "Clock" },
//     { value: "area-large", label: "Largest Area", icon: "Maximize2" },
//     { value: "area-small", label: "Smallest Area", icon: "Minimize2" },
//     { value: "bedrooms", label: "Most Bedrooms", icon: "Bed" },
//     { value: "bathrooms", label: "Most Bathrooms", icon: "Bath" },
//   ];

//   const handleSearchSubmit = (e) => {
//     e?.preventDefault();
//     onSearchChange(localSearch.trim());
//   };

//   const handleSearchClear = () => {
//     setLocalSearch("");
//     onSearchChange("");
//   };

//   const handleSearchChange = (value) => {
//     setLocalSearch(value);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearchSubmit(e);
//     } else if (e.key === "Escape") {
//       handleSearchClear();
//     }
//   };

//   const toggleSortDropdown = () => {
//     setIsSortOpen(!isSortOpen);
//   };

//   const handleSortSelect = (value) => {
//     onSortChange(value);
//     setIsSortOpen(false);
//   };

//   const getSortLabel = () => {
//     const option = sortOptions.find((opt) => opt.value === sortBy);
//     return option ? option.label : "Sort by";
//   };

//   const formatPropertyCount = () => {
//     if (propertyCount === 0) return "No properties found";
//     if (propertyCount === 1) return "1 property found";
//     return `${propertyCount.toLocaleString()} properties found`;
//   };

//   return (
//     <div
//       className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
//     >
//       <div className="container mx-auto px-3 sm:px-4 lg:px-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 py-4 lg:py-5">
//           {/* Search Bar */}
//           <div className="flex-1 w-full lg:max-w-md xl:max-w-xl min-w-0">
//             <form onSubmit={handleSearchSubmit} className="relative">
//               <Input
//                 type="search"
//                 placeholder={searchPlaceholder}
//                 value={localSearch}
//                 onChange={(e) => handleSearchChange(e.target.value)}
//                 onKeyDown={handleKeyPress}
//                 className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
//                 aria-label="Search properties"
//               />

//               {/* Search Icon */}
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                 <Icon
//                   name="Search"
//                   size={18}
//                   className="text-gray-400 dark:text-gray-500"
//                 />
//               </div>

//               {/* Clear Button */}
//               {/* {localSearch && (
//                 // <button
//                 //   type="button"
//                 //   onClick={handleSearchClear}
//                 //   className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
//                 //   aria-label="Clear search"
//                 // >
//                 //   <Icon name="X" size={16} />
//                 // </button>
//               )} */}

//               {/* Search Button */}
//               <button
//                 type="submit"
//                 className="absolute right-2.5 top-1/2 transform -translate-y-1/2 p-1.5 text-primary hover:text-primary/80 transition-colors duration-200"
//                 aria-label="Search"
//               >
//                 <Icon name="Search" size={16} />
//               </button>
//             </form>
//           </div>

//           {/* Controls Container */}
//           <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-3 lg:gap-4 min-w-0">
//             {/* Results Count - Hidden on mobile */}
//             {showResultsCount && (
//               <div className="hidden lg:block text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
//                 {formatPropertyCount()}
//               </div>
//             )}

//             {/* Sort Dropdown */}
//             <div className="relative flex-shrink-0" ref={sortRef}>
//               <Button
//                 ref={buttonRef}
//                 variant="outline"
//                 onClick={toggleSortDropdown}
//                 iconName="ArrowUpDown"
//                 iconPosition="left"
//                 className="min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] justify-between px-3 sm:px-4 py-2 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black"
//                 aria-expanded={isSortOpen}
//                 aria-haspopup="listbox"
//               >
//                 <span className="truncate text-xs sm:text-sm">
//                   {getSortLabel()}
//                 </span>
//                 <Icon
//                   name="ChevronDown"
//                   size={14}
//                   className={`ml-1 sm:ml-2 flex-shrink-0 transition-transform duration-200 ${
//                     isSortOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </Button>

//               {/* Dropdown Menu - Responsive positioning */}
//               {isSortOpen && (
//                 <div
//                   className={`absolute ${
//                     dropdownPosition === "top"
//                       ? "bottom-full mb-2"
//                       : "top-full mt-2"
//                   } right-0 w-64 max-w-[90vw] sm:max-w-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 animate-in fade-in-0 zoom-in-95 max-h-80 overflow-y-auto`}
//                 >
//                   <div className="p-2 space-y-1">
//                     {sortOptions.map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => handleSortSelect(option.value)}
//                         className={`w-full flex items-center gap-2 sm:gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
//                           sortBy === option.value
//                             ? "bg-primary/10 text-primary font-semibold"
//                             : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                         }`}
//                         role="option"
//                         aria-selected={sortBy === option.value}
//                       >
//                         <Icon
//                           name={option.icon}
//                           size={14}
//                           className={`flex-shrink-0 ${
//                             sortBy === option.value
//                               ? "text-primary"
//                               : "text-gray-400"
//                           }`}
//                         />
//                         <span className="flex-1 text-left truncate">
//                           {option.label}
//                         </span>
//                         {sortBy === option.value && (
//                           <Icon
//                             name="Check"
//                             size={14}
//                             className="text-primary flex-shrink-0"
//                           />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* View Mode Toggle */}
//             <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700 flex-shrink-0">
//               <button
//                 onClick={() => onViewModeChange("grid")}
//                 className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${
//                   viewMode === "grid"
//                     ? "bg-white dark:bg-gray-700 text-primary shadow-sm border border-gray-300 dark:border-gray-600"
//                     : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
//                 }`}
//                 title="Grid View"
//                 aria-label="Switch to grid view"
//               >
//                 <Icon name="Grid3X3" size={16} className="sm:w-4 sm:h-4" />
//               </button>
//               <button
//                 onClick={() => onViewModeChange("list")}
//                 className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${
//                   viewMode === "list"
//                     ? "bg-white dark:bg-gray-700 text-primary shadow-sm border border-gray-300 dark:border-gray-600"
//                     : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
//                 }`}
//                 title="List View"
//                 aria-label="Switch to list view"
//               >
//                 <Icon name="List" size={16} className="sm:w-4 sm:h-4" />
//               </button>
//             </div>

//             {/* Map Toggle - Hidden on mobile */}
//             <Button
//               variant={showMapView ? "primary" : "outline"}
//               onClick={onMapToggle}
//               iconName="Map"
//               iconPosition="left"
//               className="hidden lg:flex px-3 sm:px-4 py-2 text-sm font-medium whitespace-nowrap flex-shrink-0"
//             >
//               <span className="hidden xl:inline">
//                 {showMapView ? "Hide Map" : "Show Map"}
//               </span>
//               <span className="xl:hidden">{showMapView ? "Map" : "Map"}</span>
//             </Button>

//             {/* Filter Button - Mobile only */}
//             <Button
//               variant="outline"
//               onClick={onFilterToggle}
//               iconName="Filter"
//               className="lg:hidden px-3 py-2 text-sm font-medium bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 flex-shrink-0 min-w-[auto]"
//               aria-label="Open filters"
//             >
//               <span className="sr-only sm:not-sr-only sm:inline">Filters</span>
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Results Count - Below controls */}
//         {showResultsCount && (
//           <div className="lg:hidden pb-3 lg:pb-0">
//             <div className="text-sm text-gray-600 dark:text-gray-400 font-medium text-center lg:text-left">
//               {formatPropertyCount()}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default React.memo(SearchAndSort);

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
  const [isMobile, setIsMobile] = useState(false);
  const sortRef = useRef(null);
  const buttonRef = useRef(null);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      const dropdownHeight = isMobile ? 280 : 320; // Adjust for mobile

      setDropdownPosition(
        spaceBelow < dropdownHeight && spaceAbove > spaceBelow
          ? "top"
          : "bottom"
      );
    }
  }, [isSortOpen, isMobile]);

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
    return option ? option.label : "Sort";
  };

  const formatPropertyCount = () => {
    if (propertyCount === 0) return "No properties";
    if (propertyCount === 1) return "1 property";
    return `${propertyCount.toLocaleString()} properties`;
  };

  return (
    <div
      className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-30 ${className}`}
    >
      <div className="container mx-auto px-2 xs:px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 sm:gap-3 lg:gap-4 py-3 sm:py-4 lg:py-5">
          {/* Search Bar - Full width on mobile, flex on larger */}
          <div className="w-full lg:flex-1 lg:max-w-md xl:max-w-xl min-w-0 order-1 lg:order-1">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder={
                  isMobile ? "Search properties..." : searchPlaceholder
                }
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                aria-label="Search properties"
              />

              {/* Search Icon */}
              <div className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2">
                <Icon
                  name="Search"
                  size={isMobile ? 16 : 18}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>

              {/* Clear Button (optional - uncomment if needed) */}
              {localSearch && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className="absolute right-8 sm:right-10 top-1/2 transform -translate-y-1/2 p-0.5 sm:p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <Icon name="X" size={isMobile ? 14 : 16} />
                </button>
              )}

              {/* Search Button */}
              <button
                type="submit"
                className="absolute right-2 sm:right-2.5 top-1/2 transform -translate-y-1/2 p-1 sm:p-1.5 text-primary hover:text-primary/80 transition-colors duration-200"
                aria-label="Search"
              >
                <Icon name="Search" size={isMobile ? 14 : 16} />
              </button>
            </form>
          </div>

          {/* Controls Container */}
          <div className="flex items-center justify-between lg:justify-end gap-1.5 sm:gap-2 lg:gap-3 xl:gap-4 min-w-0 order-2 lg:order-2">
            {/* Mobile Results Count */}
            {showResultsCount && (
              <div className="lg:hidden text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0 px-1 sm:px-2">
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
                className="min-w-[90px] xs:min-w-[100px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px] justify-between px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black"
                aria-expanded={isSortOpen}
                aria-haspopup="listbox"
              >
                <span className="truncate text-xs sm:text-sm">
                  {getSortLabel()}
                </span>
                <Icon
                  name="ChevronDown"
                  size={isMobile ? 12 : 14}
                  className={`ml-1 sm:ml-2 flex-shrink-0 transition-transform duration-200 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {/* Dropdown Menu - Responsive positioning and sizing */}
              {isSortOpen && (
                <div
                  className={`absolute ${
                    dropdownPosition === "top"
                      ? "bottom-full mb-1 sm:mb-2"
                      : "top-full mt-1 sm:mt-2"
                  } right-0 w-56 xs:w-64 sm:w-72 max-w-[90vw] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl shadow-xl z-50 animate-in fade-in-0 zoom-in-95 max-h-72 sm:max-h-80 overflow-y-auto`}
                >
                  <div className="p-1.5 sm:p-2 space-y-0.5 sm:space-y-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortSelect(option.value)}
                        className={`w-full flex items-center gap-1.5 sm:gap-2 md:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-md sm:rounded-lg transition-all duration-200 ${
                          sortBy === option.value
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        role="option"
                        aria-selected={sortBy === option.value}
                      >
                        <Icon
                          name={option.icon}
                          size={isMobile ? 12 : 14}
                          className={`flex-shrink-0 ${
                            sortBy === option.value
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="flex-1 text-left truncate">
                          {isMobile && option.value === "relevance"
                            ? "Relevance"
                            : isMobile
                            ? option.label.split(":")[0] || option.label
                            : option.label}
                        </span>
                        {sortBy === option.value && (
                          <Icon
                            name="Check"
                            size={isMobile ? 12 : 14}
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
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md sm:rounded-lg p-0.5 sm:p-1 border border-gray-200 dark:border-gray-700 flex-shrink-0">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-1 sm:p-1.5 rounded transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm border border-gray-300 dark:border-gray-600"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                title="Grid View"
                aria-label="Switch to grid view"
              >
                <Icon
                  name="Grid3X3"
                  size={isMobile ? 14 : 16}
                  className="sm:w-4 sm:h-4"
                />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-1 sm:p-1.5 rounded transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm border border-gray-300 dark:border-gray-600"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                title="List View"
                aria-label="Switch to list view"
              >
                <Icon
                  name="List"
                  size={isMobile ? 14 : 16}
                  className="sm:w-4 sm:h-4"
                />
              </button>
            </div>

            {/* Map Toggle - Tablet and larger */}
            <Button
              variant={showMapView ? "primary" : "outline"}
              onClick={onMapToggle}
              iconName="Map"
              iconPosition={isMobile ? "left" : "left"}
              className="hidden xs:flex px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0"
            >
              <span className="hidden md:inline xl:hidden">Map</span>
              <span className="hidden xl:inline">
                {showMapView ? "Hide Map" : "Show Map"}
              </span>
              <span className="md:hidden">Map</span>
            </Button>

            {/* Filter Button - Mobile only */}
            <Button
              variant="outline"
              onClick={onFilterToggle}
              iconName="Filter"
              className="xs:hidden px-2 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 flex-shrink-0 min-w-[auto]"
              aria-label="Open filters"
            >
              <span className="sr-only">Filters</span>
            </Button>

            {/* Filter Button - Tablet and up */}
            <Button
              variant="outline"
              onClick={onFilterToggle}
              iconName="Filter"
              className="hidden xs:flex px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 flex-shrink-0"
              aria-label="Open filters"
            >
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>

        {/* Desktop Results Count */}
        {showResultsCount && (
          <div className="hidden lg:block -mt-2 pb-1 lg:pb-0">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {propertyCount === 0
                ? "No properties found"
                : propertyCount === 1
                ? "1 property found"
                : `${propertyCount.toLocaleString()} properties found`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchAndSort);