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
      if (currentIndex < fullSentence.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullSentence.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setIsTypingSentence(false);
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      const currentWord = words[currentWordIndex];
      if (isDeleting) {
        if (currentIndex > baseText.length) {
          timeout = setTimeout(() => {
            setDisplayText(
              baseText +
                currentWord.substring(0, currentIndex - baseText.length - 1)
            );
            setCurrentIndex(currentIndex - 1);
          }, 50);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      } else {
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
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      }
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentWordIndex, isTypingSentence, fullSentence]);

  const locationOptions = [
    { value: "mumbai", label: "Mumbai" },
    { value: "pune", label: "Pune" },
    { value: "bangalore", label: "Bangalore" },
    { value: "delhi", label: "Delhi" },
  ];

  const propertyTypeOptions = [
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "commercial", label: "Commercial" },
  ];

  const priceRangeOptions = [
    { value: "0-5000000", label: "Under ₹50L" },
    { value: "5000000-10000000", label: "₹50L - ₹1 Cr" },
    { value: "10000000-50000000", label: "₹1Cr - ₹5Cr" },
  ];

  const bedroomOptions = [
    { value: "1", label: "1 BHK" },
    { value: "2", label: "2 BHK" },
    { value: "3", label: "3 BHK" },
    { value: "4+", label: "4+ BHK" },
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (location) params.append("location", location);
    if (propertyType) params.append("type", propertyType);
    if (priceRange) {
      const [min, max] = priceRange.split("-");
      if (min) params.append("price_min", min);
      if (max && max !== "100000000") params.append("price_max", max);
    }
    if (bedrooms) params.append("bedrooms", bedrooms);
    navigate(`/property-listings?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPropertyType("");
    setPriceRange("");
    setBedrooms("");
  };

  const hasActiveFilters = searchQuery || location || propertyType || priceRange || bedrooms;
  const isChangingWord = !isTypingSentence && currentIndex >= baseText.length;

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Immersive Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105 will-change-transform transform-gpu"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/90 transform-gpu"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 border border-white/20 shadow-xl">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"></div>
            India's Premium Property Platform
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight min-h-[100px] sm:min-h-[120px] md:min-h-[80px] flex items-center justify-center">
            <span className="whitespace-pre-wrap text-center drop-shadow-2xl">
              {displayText.substring(0, baseText.length)}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                {displayText.substring(baseText.length)}
                {(isTypingSentence && currentIndex < fullSentence.length) ||
                (isChangingWord && currentIndex < baseText.length + words[currentWordIndex].length) ? (
                  <span className="inline-block w-1 h-8 sm:h-10 md:h-12 bg-blue-400 ml-1 animate-pulse"></span>
                ) : null}
              </span>
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
            Discover exceptional homes in premium locations across India. Elevate your living standard today.
          </p>
        </div>

        {/* Premium Search Form */}
        <div className="max-w-5xl mx-auto px-2 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-md lg:rounded-full shadow-2xl p-2 sm:p-3 mx-auto"
          >
            {/* Desktop Search Pill */}
            <div className="hidden lg:flex items-center w-full">
              {/* Keyword */}
              <div className="flex-1 relative flex items-center pl-4 pr-2">
                <Search className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                <input
                  type="search"
                  placeholder="Location, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full h-12 bg-transparent text-gray-900 placeholder-gray-500 border-none focus:ring-0 text-sm font-medium outline-none"
                />
              </div>
              
              <div className="w-px h-8 bg-gray-200 mx-2"></div>
              
              {/* Location */}
              <div className="w-40 px-2 relative flex items-center">
                <MapPin className="text-gray-400 w-4 h-4 mr-2 absolute left-2" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-12 bg-transparent border-none focus:ring-0 text-gray-700 text-sm font-medium outline-none cursor-pointer appearance-none pl-7 pr-2"
                >
                  <option value="">City</option>
                  {locationOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <ChevronDown className="text-gray-400 w-4 h-4 absolute right-2 pointer-events-none" />
              </div>

              <div className="w-px h-8 bg-gray-200 mx-2"></div>

              {/* Property Type */}
              <div className="w-44 px-2 relative flex items-center">
                <Home className="text-gray-400 w-4 h-4 mr-2 absolute left-2" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full h-12 bg-transparent border-none focus:ring-0 text-gray-700 text-sm font-medium outline-none cursor-pointer appearance-none pl-7 pr-2"
                >
                  <option value="">Property Type</option>
                  {propertyTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <ChevronDown className="text-gray-400 w-4 h-4 absolute right-2 pointer-events-none" />
              </div>

              <div className="w-px h-8 bg-gray-200 mx-2"></div>

              {/* Budget */}
              <div className="w-40 px-2 relative flex items-center">
                <DollarSign className="text-gray-400 w-4 h-4 mr-2 absolute left-2" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full h-12 bg-transparent border-none focus:ring-0 text-gray-700 text-sm font-medium outline-none cursor-pointer appearance-none pl-7 pr-2"
                >
                  <option value="">Budget</option>
                  {priceRangeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <ChevronDown className="text-gray-400 w-4 h-4 absolute right-2 pointer-events-none" />
              </div>

              {/* Submit */}
              <div className="pl-2">
                <Button
                  type="submit"
                  className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold uppercase tracking-wider rounded-full shadow-md transition-all duration-300 border-none whitespace-nowrap text-sm"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="lg:hidden flex flex-col space-y-2 p-1">
              <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 h-12">
                <Search className="text-gray-400 w-4 h-4 mr-2 flex-shrink-0" />
                <input
                  type="search"
                  placeholder="Location, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full h-full bg-transparent text-gray-900 placeholder-gray-500 border-none focus:ring-0 text-sm font-medium outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 h-12">
                  <MapPin className="text-gray-400 w-4 h-4 mr-2 absolute left-3" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-full bg-transparent border-none focus:ring-0 text-gray-700 text-sm font-medium outline-none cursor-pointer appearance-none pl-6 pr-2"
                  >
                    <option value="">City</option>
                    {locationOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  <ChevronDown className="text-gray-400 w-4 h-4 absolute right-2 pointer-events-none" />
                </div>

                <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 h-12">
                  <Home className="text-gray-400 w-4 h-4 mr-2 absolute left-3" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full h-full bg-transparent border-none focus:ring-0 text-gray-700 text-sm font-medium outline-none cursor-pointer appearance-none pl-6 pr-2"
                  >
                    <option value="">Type</option>
                    {propertyTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  <ChevronDown className="text-gray-400 w-4 h-4 absolute right-2 pointer-events-none" />
                </div>
              </div>

              <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 h-12">
                <DollarSign className="text-gray-400 w-4 h-4 mr-2 absolute left-3" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full h-full bg-transparent border-none focus:ring-0 text-gray-700 text-sm font-medium outline-none cursor-pointer appearance-none pl-6 pr-2"
                >
                  <option value="">Budget</option>
                  {priceRangeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <ChevronDown className="text-gray-400 w-4 h-4 absolute right-2 pointer-events-none" />
              </div>

              <Button
                type="submit"
                className="w-full h-12 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold uppercase tracking-wider rounded-md shadow-lg border-none text-sm"
              >
                Search Properties
              </Button>
            </div>
          </form>
        </div>

        {/* Premium Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto px-4 border-t border-white/10 pt-10">
          {[
            { number: "10K+", label: "Premium Properties" },
            { number: "5K+", label: "Satisfied Clients" },
            { number: "50+", label: "Cities Nationwide" },
            { number: "15+", label: "Years Excellence" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2 group-hover:text-blue-400 transition-colors drop-shadow-md">
                {stat.number}
              </div>
              <div className="text-gray-300 text-xs md:text-sm font-bold uppercase tracking-wider">
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