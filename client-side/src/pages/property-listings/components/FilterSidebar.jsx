
import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  X,
  RotateCcw,
  Building2,
  Home,
  Square,
  Building,
  TreePine,
  Warehouse,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";

const FilterSidebar = ({
  filters,
  onFiltersChange,
  propertyCount = 0,
  filterOptions = {},
  isOpen = false,
  onClose,
  isMobile = false,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    location: true,
    type: true,
    bedrooms: true,
    bathrooms: false,
    amenities: false,
    agent: false,
  });

  // Comprehensive price ranges
  const priceRanges = [
    { label: "Under ₹20L", min: 0, max: 2000000 },
    { label: "₹20L - ₹50L", min: 2000000, max: 5000000 },
    { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
    { label: "₹1Cr - ₹2Cr", min: 10000000, max: 20000000 },
    { label: "₹2Cr - ₹5Cr", min: 20000000, max: 50000000 },
    { label: "₹5Cr - ₹10Cr", min: 50000000, max: 100000000 },
    { label: "Above ₹10Cr", min: 100000000, max: 9999999999 },
  ];

  // Extensive locations list (50+ major Indian cities) - REMOVED DUPLICATES
  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Ranchi",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Kalyan-Dombivli",
    "Vasai-Virar",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Navi Mumbai",
    "Allahabad",
    "Howrah",
    "Gwalior",
    "Jabalpur",
    "Coimbatore",
    "Vijayawada",
    "Jodhpur",
    "Madurai",
    "Raipur",
    "Kota",
    "Chandigarh",
    "Guwahati",
    "Solapur",
    "Hubli-Dharwad",
    "Mysore",
    "Tiruchirappalli",
    "Bareilly",
    "Aligarh",
    "Jalandhar",
    "Bhubaneswar",
    "Salem",
    "Warangal",
    "Gurugram",
    "Noida",
    "Greater Noida",
  ];

  // Comprehensive property types with correct icons
  const propertyTypes = [
    { value: "apartment", label: "Apartment", icon: Building2 },
    { value: "villa", label: "Villa", icon: Home },
    { value: "independent-house", label: "Independent House", icon: Home },
    { value: "plot", label: "Residential Plot", icon: Square },
    { value: "commercial", label: "Commercial", icon: Building },
    { value: "office-space", label: "Office Space", icon: Building },
    { value: "shop", label: "Retail Shop", icon: Building },
    { value: "studio-apartment", label: "Studio Apartment", icon: Building2 },
    { value: "penthouse", label: "Penthouse", icon: Building2 },
    { value: "duplex", label: "Duplex", icon: Home },
    { value: "farm-house", label: "Farm House", icon: TreePine },
    { value: "warehouse", label: "Warehouse", icon: Warehouse },
    { value: "hotel", label: "Hotel/Resort", icon: Building },
    { value: "industrial", label: "Industrial", icon: Warehouse },
    { value: "agricultural-land", label: "Agricultural Land", icon: TreePine },
  ];

  // Extensive amenities list (40+ amenities)
  const amenities = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Security",
    "Garden",
    "Elevator",
    "Power Backup",
    "Club House",
    "Children's Play Area",
    "CCTV",
    "Intercom",
    "Maintenance Staff",
    "Water Storage",
    "Park",
    "Jogging Track",
    "Tennis Court",
    "Basketball Court",
    "Squash Court",
    "Badminton Court",
    "Yoga/Meditation Area",
    "Community Hall",
    "Party Area",
    "Barbecue Area",
    "Indoor Games",
    "Library",
    "Business Center",
    "Cafeteria",
    "Restaurant",
    "Spa",
    "Sauna",
    "Steam Room",
    "Jacuzzi",
    "Concierge",
    "Valet Parking",
    "Car Wash",
    "Pet Friendly",
    "Senior Living Features",
    "Wheelchair Accessible",
    "High Speed Internet",
    "Smart Home Features",
    "Central Air Conditioning",
    "Central Heating",
    "Fireplace",
    "Walk-in Closet",
    "Hardwood Floors",
  ];

  // Comprehensive agent list
  const agents = [
    { id: 1, name: "Rajesh Kumar", properties: 45, rating: 4.8 },
    { id: 2, name: "Priya Sharma", properties: 38, rating: 4.9 },
    { id: 3, name: "Amit Patel", properties: 52, rating: 4.7 },
    { id: 4, name: "Sneha Reddy", properties: 29, rating: 4.6 },
    { id: 5, name: "Vikram Singh", properties: 41, rating: 4.8 },
    { id: 6, name: "Anjali Mehta", properties: 33, rating: 4.9 },
    { id: 7, name: "Rahul Verma", properties: 47, rating: 4.7 },
    { id: 8, name: "Pooja Joshi", properties: 26, rating: 4.8 },
    { id: 9, name: "Sanjay Malhotra", properties: 39, rating: 4.6 },
    { id: 10, name: "Neha Kapoor", properties: 31, rating: 4.9 },
    { id: 11, name: "Arun Desai", properties: 44, rating: 4.7 },
    { id: 12, name: "Kavita Nair", properties: 27, rating: 4.8 },
  ];

  // More bedroom options
  const bedroomOptions = ["1", "2", "3", "4", "5", "6+"];

  // More bathroom options
  const bathroomOptions = ["1", "2", "3", "4", "5", "6+"];

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: { min: "", max: "" },
      location: [],
      propertyType: [],
      bedrooms: "",
      bathrooms: "",
      amenities: [],
      agent: "",
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  // Count active filters for badge display
  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.priceRange.min || localFilters.priceRange.max) count++;
    if (localFilters.location.length > 0) count++;
    if (localFilters.propertyType.length > 0) count++;
    if (localFilters.bedrooms) count++;
    if (localFilters.bathrooms) count++;
    if (localFilters.amenities.length > 0) count++;
    if (localFilters.agent) count++;
    return count;
  };

  const FilterSection = ({ title, children, sectionKey, count }) => (
    <div className="border-b border-slate-200 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all duration-200 group"
      >
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
          {count > 0 && (
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-medium min-w-6 text-center">
              {count}
            </span>
          )}
        </div>
        {expandedSections[sectionKey] ? (
          <ChevronUp
            size={18}
            className="text-slate-500 group-hover:text-slate-700 transition-transform"
          />
        ) : (
          <ChevronDown
            size={18}
            className="text-slate-500 group-hover:text-slate-700 transition-transform"
          />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-4 space-y-4 animate-in fade-in-0 duration-200">
          {children}
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Filters</h2>
            <p className="text-sm text-slate-600 mt-1">
              {propertyCount.toLocaleString()} properties found
            </p>
          </div>
          {getActiveFilterCount() > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-slate-100 rounded-xl"
          >
            <X size={20} className="text-slate-600" />
          </Button>
        )}
      </div>

      {/* Filters Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {/* Price Range */}
        <FilterSection
          title="Price Range"
          sectionKey="price"
          count={
            localFilters.priceRange.min || localFilters.priceRange.max ? 1 : 0
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1">
                  Min Price (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Min"
                  value={localFilters.priceRange.min || ""}
                  onChange={(e) =>
                    handleFilterChange("priceRange", {
                      ...localFilters.priceRange,
                      min: e.target.value,
                    })
                  }
                  className="text-sm border-slate-300 focus:border-blue-500 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">
                  Max Price (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Max"
                  value={localFilters.priceRange.max || ""}
                  onChange={(e) =>
                    handleFilterChange("priceRange", {
                      ...localFilters.priceRange,
                      max: e.target.value,
                    })
                  }
                  className="text-sm border-slate-300 focus:border-blue-500 rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-slate-500 font-medium">
                Quick select:
              </p>
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => {
                      handleFilterChange("priceRange", {
                        min: range.min.toString(),
                        max: range.max.toString(),
                      });
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                      localFilters.priceRange.min === range.min.toString() &&
                      localFilters.priceRange.max === range.max.toString()
                        ? "bg-blue-50 text-blue-700 border-blue-200 font-medium"
                        : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection
          title="Location"
          sectionKey="location"
          count={localFilters.location.length}
        >
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {locations.map((location) => (
              <Checkbox
                key={location}
                label={location}
                checked={localFilters.location.includes(location)}
                onChange={(e) => {
                  const currentLocations = localFilters.location || [];
                  const newLocations = e.target.checked
                    ? [...currentLocations, location]
                    : currentLocations.filter((l) => l !== location);
                  handleFilterChange("location", newLocations);
                }}
              />
            ))}
          </div>
        </FilterSection>

        {/* Property Type */}
        <FilterSection
          title="Property Type"
          sectionKey="type"
          count={localFilters.propertyType.length}
        >
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {propertyTypes.map((type) => (
              <Checkbox
                key={type.value}
                label={
                  <div className="flex items-center space-x-3">
                    <type.icon
                      size={16}
                      className="text-slate-600 flex-shrink-0"
                    />
                    <span className="text-slate-800 font-medium text-sm">
                      {type.label}
                    </span>
                  </div>
                }
                checked={localFilters.propertyType.includes(type.value)}
                onChange={(e) => {
                  const currentTypes = localFilters.propertyType || [];
                  const newTypes = e.target.checked
                    ? [...currentTypes, type.value]
                    : currentTypes.filter((t) => t !== type.value);
                  handleFilterChange("propertyType", newTypes);
                }}
              />
            ))}
          </div>
        </FilterSection>

        {/* Bedrooms */}
        <FilterSection
          title="Bedrooms"
          sectionKey="bedrooms"
          count={localFilters.bedrooms ? 1 : 0}
        >
          <div className="grid grid-cols-3 gap-2">
            {bedroomOptions.map((bedroom) => (
              <button
                key={bedroom}
                onClick={() =>
                  handleFilterChange(
                    "bedrooms",
                    localFilters.bedrooms === bedroom ? "" : bedroom
                  )
                }
                className={`p-3 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                  localFilters.bedrooms === bedroom
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {bedroom}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Bathrooms */}
        <FilterSection
          title="Bathrooms"
          sectionKey="bathrooms"
          count={localFilters.bathrooms ? 1 : 0}
        >
          <div className="grid grid-cols-3 gap-2">
            {bathroomOptions.map((bathroom) => (
              <button
                key={bathroom}
                onClick={() =>
                  handleFilterChange(
                    "bathrooms",
                    localFilters.bathrooms === bathroom ? "" : bathroom
                  )
                }
                className={`p-3 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                  localFilters.bathrooms === bathroom
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {bathroom}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection
          title="Amenities"
          sectionKey="amenities"
          count={localFilters.amenities.length}
        >
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {amenities.map((amenity) => (
              <Checkbox
                key={amenity}
                label={amenity}
                checked={localFilters.amenities.includes(amenity)}
                onChange={(e) => {
                  const currentAmenities = localFilters.amenities || [];
                  const newAmenities = e.target.checked
                    ? [...currentAmenities, amenity]
                    : currentAmenities.filter((a) => a !== amenity);
                  handleFilterChange("amenities", newAmenities);
                }}
              />
            ))}
          </div>
        </FilterSection>

        {/* Agent */}
        <FilterSection
          title="Top Agents"
          sectionKey="agent"
          count={localFilters.agent ? 1 : 0}
        >
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  localFilters.agent === agent.id.toString()
                    ? "bg-blue-50 border-blue-200 shadow-sm"
                    : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                }`}
                onClick={() =>
                  handleFilterChange(
                    "agent",
                    localFilters.agent === agent.id.toString()
                      ? ""
                      : agent.id.toString()
                  )
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900 text-sm block">
                      {agent.name}
                    </span>
                    <span className="text-xs text-slate-600">
                      {agent.properties} properties • ⭐ {agent.rating}
                    </span>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">
                    {agent.properties}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-200 bg-white space-y-3">
        <Button
          variant="outline"
          fullWidth
          onClick={clearAllFilters}
          disabled={getActiveFilterCount() === 0}
          className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 h-12 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw size={18} className="mr-2" />
          Clear All Filters
        </Button>
        {isMobile && (
          <Button
            fullWidth
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 h-12 rounded-xl font-semibold text-white transition-colors"
          >
            Show {propertyCount} Properties
          </Button>
        )}
      </div>

      {/* Fixed Custom Scrollbar Styles - REMOVED JSX ATTRIBUTE */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0"
              onClick={onClose}
            />
            <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200 shadow-2xl animate-in slide-in-from-left duration-300">
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-slate-200 h-full shadow-sm">
      {sidebarContent}
    </div>
  );
};

export default React.memo(FilterSidebar);