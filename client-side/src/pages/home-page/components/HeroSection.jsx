// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   SlidersHorizontal,
//   ChevronUp,
//   ChevronDown,
//   Home,
//   MapPin,
//   DollarSign,
//   Bed,
// } from "lucide-react";
// import Button from "../../../components/ui/Button";
// import Input from "../../../components/ui/Input";
// import Select from "../../../components/ui/Select";

// const HeroSection = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [location, setLocation] = useState("");
//   const [propertyType, setPropertyType] = useState("");
//   const [priceRange, setPriceRange] = useState("");
//   const [bedrooms, setBedrooms] = useState("");
//   const [isExpanded, setIsExpanded] = useState(false);

//   // Typewriter state
//   const [displayText, setDisplayText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isTypingSentence, setIsTypingSentence] = useState(true);

//   const baseText = "Find Your Dream ";
//   const words = ["Property", "Home", "Space", "Investment"];
//   const fullSentence = baseText + words[0];

//   useEffect(() => {
//     let timeout;

//     if (isTypingSentence) {
//       // Typing the full sentence for the first time
//       if (currentIndex < fullSentence.length) {
//         timeout = setTimeout(() => {
//           setDisplayText(fullSentence.substring(0, currentIndex + 1));
//           setCurrentIndex(currentIndex + 1);
//         }, 80);
//       } else {
//         // Sentence completed, wait then start word rotation
//         timeout = setTimeout(() => {
//           setIsTypingSentence(false);
//           setIsDeleting(true);
//         }, 2000);
//       }
//     } else {
//       // Word rotation phase - only change the last word
//       const currentWord = words[currentWordIndex];

//       if (isDeleting) {
//         // Deleting only the current word (after baseText)
//         if (currentIndex > baseText.length) {
//           timeout = setTimeout(() => {
//             setDisplayText(
//               baseText +
//                 currentWord.substring(0, currentIndex - baseText.length - 1)
//             );
//             setCurrentIndex(currentIndex - 1);
//           }, 50);
//         } else {
//           // Word completely deleted, move to next word
//           setIsDeleting(false);
//           setCurrentWordIndex((currentWordIndex + 1) % words.length);
//         }
//       } else {
//         // Typing the new word
//         const nextWord = words[currentWordIndex];

//         if (currentIndex < baseText.length + nextWord.length) {
//           timeout = setTimeout(() => {
//             setDisplayText(
//               baseText +
//                 nextWord.substring(0, currentIndex - baseText.length + 1)
//             );
//             setCurrentIndex(currentIndex + 1);
//           }, 100);
//         } else {
//           // Word completed, wait then start deleting
//           timeout = setTimeout(() => {
//             setIsDeleting(true);
//           }, 2000);
//         }
//       }
//     }

//     return () => clearTimeout(timeout);
//   }, [
//     currentIndex,
//     isDeleting,
//     currentWordIndex,
//     isTypingSentence,
//     fullSentence,
//   ]);

//   const locationOptions = [
//     { value: "mumbai", label: "Mumbai" },
//     { value: "pune", label: "Pune" },
//     { value: "bangalore", label: "Bangalore" },
//     { value: "delhi", label: "Delhi" },
//     { value: "hyderabad", label: "Hyderabad" },
//     { value: "chennai", label: "Chennai" },
//     { value: "kolkata", label: "Kolkata" },
//     { value: "ahmedabad", label: "Ahmedabad" },
//   ];

//   const propertyTypeOptions = [
//     { value: "apartment", label: "Apartment" },
//     { value: "villa", label: "Villa" },
//     { value: "independent-house", label: "Independent House" },
//     { value: "plot", label: "Plot/Land" },
//     { value: "commercial", label: "Commercial" },
//     { value: "office-space", label: "Office Space" },
//   ];

//   const priceRangeOptions = [
//     { value: "0-2000000", label: "Under ₹20 Lakh" },
//     { value: "2000000-5000000", label: "₹20L - ₹50L" },
//     { value: "5000000-10000000", label: "₹50L - ₹1 Cr" },
//     { value: "10000000-20000000", label: "₹1Cr - ₹2Cr" },
//     { value: "20000000-50000000", label: "₹2Cr - ₹5Cr" },
//     { value: "50000000-100000000", label: "₹5Cr - ₹10Cr" },
//   ];

//   const bedroomOptions = [
//     { value: "1", label: "1 BHK" },
//     { value: "2", label: "2 BHK" },
//     { value: "3", label: "3 BHK" },
//     { value: "4", label: "4 BHK" },
//     { value: "5", label: "5 BHK" },
//     { value: "6+", label: "6+ BHK" },
//   ];

//   const handleSearch = (e) => {
//     e?.preventDefault();

//     const params = new URLSearchParams();

//     // Add search parameters - matching PropertyListings URL structure
//     if (searchQuery) params.append("search", searchQuery);
//     if (location) params.append("location", location);
//     if (propertyType) params.append("type", propertyType);

//     // Handle price range - convert to min/max format used in PropertyListings
//     if (priceRange) {
//       const [min, max] = priceRange.split("-");
//       if (min) params.append("price_min", min);
//       if (max && max !== "100000000") params.append("price_max", max);
//     }

//     if (bedrooms) params.append("bedrooms", bedrooms);

//     // Navigate to property listings with all search parameters
//     navigate(`/property-listings?${params.toString()}`);
//   };

//   // Clear all filters
//   const handleClearFilters = () => {
//     setSearchQuery("");
//     setLocation("");
//     setPropertyType("");
//     setPriceRange("");
//     setBedrooms("");
//   };

//   // Check if any filters are active
//   const hasActiveFilters =
//     searchQuery || location || propertyType || priceRange || bedrooms;

//   // Check if we're currently typing/deleting the last word
//   const isChangingWord = !isTypingSentence && currentIndex >= baseText.length;

//   return (
//     <section className="relative min-h-[700px] bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center overflow-hidden">
//       {/* Background elements... */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
//         <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-3xl opacity-50"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-slate-50 to-transparent rounded-full blur-3xl opacity-50"></div>
//       </div>

//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6 py-16">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-8 border border-blue-100">
//             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//             India's Premium Property Platform
//           </div>

//           <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tight min-h-[200px] flex items-center justify-center">
//             <span className="whitespace-pre-wrap">
//               {/* Static part - "Find Your Dream " in normal color */}
//               {displayText.substring(0, baseText.length)}

//               {/* Changing word with gradient color */}
//               <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 {displayText.substring(baseText.length)}
//                 {(isTypingSentence && currentIndex < fullSentence.length) ||
//                 (isChangingWord &&
//                   currentIndex <
//                     baseText.length + words[currentWordIndex].length) ? (
//                   <span className="inline-block w-1 h-16 bg-blue-600 ml-1 animate-pulse"></span>
//                 ) : null}
//               </span>
//             </span>
//           </h1>

//           <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
//             Discover exceptional homes in premium locations across India
//           </p>
//         </div>

//         {/* Search form and stats remain exactly the same... */}
//         <div className="max-w-6xl mx-auto">
//           <form
//             onSubmit={handleSearch}
//             className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 lg:p-10 backdrop-blur-sm"
//           >
//             {/* Desktop Search */}
//             <div className="hidden lg:block">
//               <div className="grid grid-cols-12 gap-6 items-end">
//                 <div className="col-span-3 relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//                   <Input
//                     type="search"
//                     placeholder="Search by location, property name, or area..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e?.target?.value)}
//                     className="w-full pl-12 pr-4 py-4 text-slate-700 placeholder-slate-400 border-slate-200 focus:border-blue-300 rounded-xl"
//                   />
//                 </div>

//                 <div className="col-span-2 relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
//                   <Select
//                     placeholder="Location"
//                     options={locationOptions}
//                     value={location}
//                     onChange={setLocation}
//                     searchable
//                     className="pl-10"
//                   />
//                 </div>

//                 <div className="col-span-2 relative">
//                   <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
//                   <Select
//                     placeholder="Property Type"
//                     options={propertyTypeOptions}
//                     value={propertyType}
//                     onChange={setPropertyType}
//                     className="pl-10"
//                   />
//                 </div>

//                 <div className="col-span-2 relative">
//                   <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
//                   <Select
//                     placeholder="Price Range"
//                     options={priceRangeOptions}
//                     value={priceRange}
//                     onChange={setPriceRange}
//                     className="pl-10"
//                   />
//                 </div>

//                 <div className="col-span-2 relative">
//                   <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
//                   <Select
//                     placeholder="Bedrooms"
//                     options={bedroomOptions}
//                     value={bedrooms}
//                     onChange={setBedrooms}
//                     className="pl-10"
//                   />
//                 </div>

//                 <div className="col-span-1 flex gap-2">
//                   <Button
//                     type="submit"
//                     className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200"
//                   >
//                     <Search className="w-5 h-5" />
//                   </Button>

//                   {hasActiveFilters && (
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={handleClearFilters}
//                       className="h-14 px-4 border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-700"
//                       title="Clear all filters"
//                     >
//                       <SlidersHorizontal className="w-4 h-4" />
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Mobile Search */}
//             <div className="lg:hidden space-y-4">
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//                 <Input
//                   type="search"
//                   placeholder="Search properties..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e?.target?.value)}
//                   className="w-full pl-12 pr-4 py-4 text-slate-700 placeholder-slate-400 border-slate-200 focus:border-blue-300 rounded-xl"
//                 />
//               </div>

//               {/* Expandable filters for mobile */}
//               <div className="space-y-3">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setIsExpanded(!isExpanded)}
//                   className="w-full justify-between"
//                 >
//                   <span>Advanced Filters</span>
//                   {isExpanded ? (
//                     <ChevronUp size={16} />
//                   ) : (
//                     <ChevronDown size={16} />
//                   )}
//                 </Button>

//                 {isExpanded && (
//                   <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
//                     <Select
//                       placeholder="Location"
//                       options={locationOptions}
//                       value={location}
//                       onChange={setLocation}
//                       searchable
//                     />
//                     <Select
//                       placeholder="Property Type"
//                       options={propertyTypeOptions}
//                       value={propertyType}
//                       onChange={setPropertyType}
//                     />
//                     <Select
//                       placeholder="Price Range"
//                       options={priceRangeOptions}
//                       value={priceRange}
//                       onChange={setPriceRange}
//                     />
//                     <Select
//                       placeholder="Bedrooms"
//                       options={bedroomOptions}
//                       value={bedrooms}
//                       onChange={setBedrooms}
//                     />

//                     {hasActiveFilters && (
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         onClick={handleClearFilters}
//                         className="w-full text-slate-600"
//                       >
//                         Clear Filters
//                       </Button>
//                     )}
//                   </div>
//                 )}
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25"
//               >
//                 <Search className="w-5 h-5 mr-2" />
//                 Search Properties
//               </Button>
//             </div>
//           </form>
//         </div>

//         {/* Premium Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto">
//           {[
//             { number: "10K+", label: "Premium Properties" },
//             { number: "5K+", label: "Satisfied Clients" },
//             { number: "50+", label: "Cities Nationwide" },
//             { number: "15+", label: "Years Excellence" },
//           ].map((stat, index) => (
//             <div key={index} className="text-center group">
//               <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 group-hover:scale-105 transition-transform duration-200">
//                 {stat.number}
//               </div>
//               <div className="text-slate-600 text-sm lg:text-base font-medium tracking-wide">
//                 {stat.label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  Home,
  MapPin,
  DollarSign,
  Bed,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Typewriter state
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingSentence, setIsTypingSentence] = useState(true);

  const baseText = "Find Your Dream ";
  const words = ["Property", "Home", "Space", "Investment"];
  const fullSentence = baseText + words[0];

  useEffect(() => {
    let timeout;

    if (isTypingSentence) {
      // Typing the full sentence for the first time
      if (currentIndex < fullSentence.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullSentence.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 80);
      } else {
        // Sentence completed, wait then start word rotation
        timeout = setTimeout(() => {
          setIsTypingSentence(false);
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Word rotation phase - only change the last word
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        // Deleting only the current word (after baseText)
        if (currentIndex > baseText.length) {
          timeout = setTimeout(() => {
            setDisplayText(
              baseText +
                currentWord.substring(0, currentIndex - baseText.length - 1)
            );
            setCurrentIndex(currentIndex - 1);
          }, 50);
        } else {
          // Word completely deleted, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      } else {
        // Typing the new word
        const nextWord = words[currentWordIndex];

        if (currentIndex < baseText.length + nextWord.length) {
          timeout = setTimeout(() => {
            setDisplayText(
              baseText +
                nextWord.substring(0, currentIndex - baseText.length + 1)
            );
            setCurrentIndex(currentIndex + 1);
          }, 100);
        } else {
          // Word completed, wait then start deleting
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentWordIndex,
    isTypingSentence,
    fullSentence,
  ]);

  const locationOptions = [
    { value: "mumbai", label: "Mumbai" },
    { value: "pune", label: "Pune" },
    { value: "bangalore", label: "Bangalore" },
    { value: "delhi", label: "Delhi" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" },
    { value: "ahmedabad", label: "Ahmedabad" },
  ];

  const propertyTypeOptions = [
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "independent-house", label: "Independent House" },
    { value: "plot", label: "Plot/Land" },
    { value: "commercial", label: "Commercial" },
    { value: "office-space", label: "Office Space" },
  ];

  const priceRangeOptions = [
    { value: "0-2000000", label: "Under ₹20 Lakh" },
    { value: "2000000-5000000", label: "₹20L - ₹50L" },
    { value: "5000000-10000000", label: "₹50L - ₹1 Cr" },
    { value: "10000000-20000000", label: "₹1Cr - ₹2Cr" },
    { value: "20000000-50000000", label: "₹2Cr - ₹5Cr" },
    { value: "50000000-100000000", label: "₹5Cr - ₹10Cr" },
  ];

  const bedroomOptions = [
    { value: "1", label: "1 BHK" },
    { value: "2", label: "2 BHK" },
    { value: "3", label: "3 BHK" },
    { value: "4", label: "4 BHK" },
    { value: "5", label: "5 BHK" },
    { value: "6+", label: "6+ BHK" },
  ];

  const handleSearch = (e) => {
    e?.preventDefault();

    const params = new URLSearchParams();

    // Add search parameters - matching PropertyListings URL structure
    if (searchQuery) params.append("search", searchQuery);
    if (location) params.append("location", location);
    if (propertyType) params.append("type", propertyType);

    // Handle price range - convert to min/max format used in PropertyListings
    if (priceRange) {
      const [min, max] = priceRange.split("-");
      if (min) params.append("price_min", min);
      if (max && max !== "100000000") params.append("price_max", max);
    }

    if (bedrooms) params.append("bedrooms", bedrooms);

    // Navigate to property listings with all search parameters
    navigate(`/property-listings?${params.toString()}`);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPropertyType("");
    setPriceRange("");
    setBedrooms("");
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery || location || propertyType || priceRange || bedrooms;

  // Check if we're currently typing/deleting the last word
  const isChangingWord = !isTypingSentence && currentIndex >= baseText.length;

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.03)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]"></div>
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-2xl sm:blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-tr from-slate-50 to-transparent rounded-full blur-2xl sm:blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-blue-100">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
            India's Premium Property Platform
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight tracking-tight min-h-[120px] sm:min-h-[150px] md:min-h-[200px] flex items-center justify-center px-2">
            <span className="whitespace-pre-wrap text-center">
              {/* Static part - "Find Your Dream " in normal color */}
              {displayText.substring(0, baseText.length)}

              {/* Changing word with gradient color */}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {displayText.substring(baseText.length)}
                {(isTypingSentence && currentIndex < fullSentence.length) ||
                (isChangingWord &&
                  currentIndex <
                    baseText.length + words[currentWordIndex].length) ? (
                  <span className="inline-block w-0.5 sm:w-1 h-8 sm:h-12 md:h-16 bg-blue-600 ml-0.5 sm:ml-1 animate-pulse"></span>
                ) : null}
              </span>
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-light px-4">
            Discover exceptional homes in premium locations across India
          </p>
        </div>

        {/* Search form */}
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl shadow-slate-200/50 border border-slate-100 p-4 sm:p-6 md:p-8 lg:p-10 backdrop-blur-sm"
          >
            {/* Desktop Search */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-12 gap-4 lg:gap-6 items-end">
                <div className="col-span-12 lg:col-span-3 relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <Input
                    type="search"
                    placeholder="Search by location, property name, or area..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-slate-700 placeholder-slate-400 border-slate-200 focus:border-blue-300 rounded-xl text-sm sm:text-base"
                  />
                </div>

                <div className="col-span-6 lg:col-span-2 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-3 h-3 sm:w-4 sm:h-4 z-10" />
                  <Select
                    placeholder="Location"
                    options={locationOptions}
                    value={location}
                    onChange={setLocation}
                    searchable
                    className="pl-8 sm:pl-10 text-sm sm:text-base"
                  />
                </div>

                <div className="col-span-6 lg:col-span-2 relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-3 h-3 sm:w-4 sm:h-4 z-10" />
                  <Select
                    placeholder="Property Type"
                    options={propertyTypeOptions}
                    value={propertyType}
                    onChange={setPropertyType}
                    className="pl-8 sm:pl-10 text-sm sm:text-base"
                  />
                </div>

                <div className="col-span-6 lg:col-span-2 relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-3 h-3 sm:w-4 sm:h-4 z-10" />
                  <Select
                    placeholder="Price Range"
                    options={priceRangeOptions}
                    value={priceRange}
                    onChange={setPriceRange}
                    className="pl-8 sm:pl-10 text-sm sm:text-base"
                  />
                </div>

                <div className="col-span-6 lg:col-span-2 relative">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-3 h-3 sm:w-4 sm:h-4 z-10" />
                  <Select
                    placeholder="Bedrooms"
                    options={bedroomOptions}
                    value={bedrooms}
                    onChange={setBedrooms}
                    className="pl-8 sm:pl-10 text-sm sm:text-base"
                  />
                </div>

                <div className="col-span-12 lg:col-span-1 flex gap-2 mt-4 lg:mt-0">
                  <Button
                    type="submit"
                    className="flex-1 h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 text-sm sm:text-base"
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>

                  {hasActiveFilters && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClearFilters}
                      className="h-12 sm:h-14 px-3 sm:px-4 border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-700 text-sm sm:text-base"
                      title="Clear all filters"
                    >
                      <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Tablet Search */}
            <div className="hidden md:block lg:hidden">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    type="search"
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full pl-10 pr-4 py-3 text-slate-700 placeholder-slate-400 border-slate-200 focus:border-blue-300 rounded-xl"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                  <Select
                    placeholder="Location"
                    options={locationOptions}
                    value={location}
                    onChange={setLocation}
                    searchable
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                  <Select
                    placeholder="Property Type"
                    options={propertyTypeOptions}
                    value={propertyType}
                    onChange={setPropertyType}
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                  <Select
                    placeholder="Price Range"
                    options={priceRangeOptions}
                    value={priceRange}
                    onChange={setPriceRange}
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                  <Select
                    placeholder="Bedrooms"
                    options={bedroomOptions}
                    value={bedrooms}
                    onChange={setBedrooms}
                    className="pl-10"
                  />
                </div>

                <div className="col-span-2 flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search Properties
                  </Button>

                  {hasActiveFilters && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClearFilters}
                      className="px-4 border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-700"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-3 text-slate-700 placeholder-slate-400 border-slate-200 focus:border-blue-300 rounded-xl text-sm"
                />
              </div>

              {/* Expandable filters for mobile */}
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full justify-between text-sm py-2.5"
                >
                  <span>Advanced Filters</span>
                  {isExpanded ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </Button>

                {isExpanded && (
                  <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <Select
                      placeholder="Location"
                      options={locationOptions}
                      value={location}
                      onChange={setLocation}
                      searchable
                      className="text-sm"
                    />
                    <Select
                      placeholder="Property Type"
                      options={propertyTypeOptions}
                      value={propertyType}
                      onChange={setPropertyType}
                      className="text-sm"
                    />
                    <Select
                      placeholder="Price Range"
                      options={priceRangeOptions}
                      value={priceRange}
                      onChange={setPriceRange}
                      className="text-sm"
                    />
                    <Select
                      placeholder="Bedrooms"
                      options={bedroomOptions}
                      value={bedrooms}
                      onChange={setBedrooms}
                      className="text-sm"
                    />

                    {hasActiveFilters && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleClearFilters}
                        className="w-full text-slate-600 text-sm"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 text-sm"
              >
                <Search className="w-4 h-4 mr-2" />
                Search Properties
              </Button>
            </div>
          </form>
        </div>

        {/* Premium Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 max-w-4xl mx-auto px-4">
          {[
            { number: "10K+", label: "Premium Properties" },
            { number: "5K+", label: "Satisfied Clients" },
            { number: "50+", label: "Cities Nationwide" },
            { number: "15+", label: "Years Excellence" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-200">
                {stat.number}
              </div>
              <div className="text-slate-600 text-xs sm:text-sm font-medium tracking-wide leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;