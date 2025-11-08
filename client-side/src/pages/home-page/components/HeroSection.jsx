// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Icon from "../../../components/AppIcon";
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
//   const [currentLanguage, setCurrentLanguage] = useState("en");

//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("language") || "en";
//     setCurrentLanguage(savedLanguage);
//   }, []);

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
//     { value: "house", label: "Independent House" },
//     { value: "plot", label: "Plot/Land" },
//     { value: "commercial", label: "Commercial" },
//     { value: "office", label: "Office Space" },
//   ];

//   const priceRangeOptions = [
//     { value: "0-25", label: "Under ₹25 Lakh" },
//     { value: "25-50", label: "₹25L - ₹50L" },
//     { value: "50-75", label: "₹50L - ₹75L" },
//     { value: "75-100", label: "₹75L - ₹1 Cr" },
//     { value: "100-200", label: "₹1Cr - ₹2Cr" },
//     { value: "200+", label: "Above ₹2 Cr" },
//   ];

//   const bedroomOptions = [
//     { value: "1", label: "1 BHK" },
//     { value: "2", label: "2 BHK" },
//     { value: "3", label: "3 BHK" },
//     { value: "4", label: "4 BHK" },
//     { value: "5+", label: "5+ BHK" },
//   ];

//   const handleSearch = (e) => {
//     e?.preventDefault();
//     const searchParams = {
//       query: searchQuery,
//       location,
//       propertyType,
//       priceRange,
//       bedrooms,
//     };
//     navigate("/property-listings", { state: { searchParams } });
//   };

//   const content = {
//     en: {
//       title: "Find Your Dream Property",
//       subtitle:
//         "Discover the perfect home with our comprehensive property search",
//       searchPlaceholder: "Search by location, property name, or area...",
//       location: "Location",
//       propertyType: "Property Type",
//       priceRange: "Price Range",
//       bedrooms: "Bedrooms",
//       searchButton: "Search Properties",
//       advancedFilters: "Advanced Filters",
//     },
//     hi: {
//       title: "अपनी सपनों की संपत्ति खोजें",
//       subtitle: "हमारी व्यापक संपत्ति खोज के साथ सही घर खोजें",
//       searchPlaceholder: "स्थान, संपत्ति का नाम या क्षेत्र से खोजें...",
//       location: "स्थान",
//       propertyType: "संपत्ति का प्रकार",
//       priceRange: "मूल्य सीमा",
//       bedrooms: "बेडरूम",
//       searchButton: "संपत्ति खोजें",
//       advancedFilters: "उन्नत फिल्टर",
//     },
//     mr: {
//       title: "तुमची स्वप्नांची मालमत्ता शोधा",
//       subtitle: "आमच्या व्यापक मालमत्ता शोधासह योग्य घर शोधा",
//       searchPlaceholder: "स्थान, मालमत्तेचे नाव किंवा क्षेत्राने शोधा...",
//       location: "स्थान",
//       propertyType: "मालमत्तेचा प्रकार",
//       priceRange: "किंमत श्रेणी",
//       bedrooms: "बेडरूम",
//       searchButton: "मालमत्ता शोधा",
//       advancedFilters: "प्रगत फिल्टर",
//     },
//   };

//   const t = content?.[currentLanguage] || content?.en;

//   return (
//     <section className="relative min-h-[600px] bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
//         <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-xl"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-2xl"></div>
//       </div>
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6 py-16">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//             {t?.title}
//           </h1>
//           <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
//             {t?.subtitle}
//           </p>
//         </div>

//         {/* Search Form */}
//         <div className="max-w-5xl mx-auto">
//           <form
//             onSubmit={handleSearch}
//             className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8"
//           >
//             {/* Mobile Search */}
//             <div className="lg:hidden space-y-4">
//               <Input
//                 type="search"
//                 placeholder={t?.searchPlaceholder}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e?.target?.value)}
//                 className="w-full"
//               />

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="w-full flex items-center justify-center space-x-2"
//               >
//                 <Icon name="SlidersHorizontal" size={18} />
//                 <span>{t?.advancedFilters}</span>
//                 <Icon
//                   name={isExpanded ? "ChevronUp" : "ChevronDown"}
//                   size={18}
//                 />
//               </Button>

//               {isExpanded && (
//                 <div className="space-y-4 pt-4 border-t border-gray-200">
//                   <Select
//                     placeholder={t?.location}
//                     options={locationOptions}
//                     value={location}
//                     onChange={setLocation}
//                     searchable
//                   />

//                   <Select
//                     placeholder={t?.propertyType}
//                     options={propertyTypeOptions}
//                     value={propertyType}
//                     onChange={setPropertyType}
//                   />

//                   <div className="grid grid-cols-2 gap-4">
//                     <Select
//                       placeholder={t?.priceRange}
//                       options={priceRangeOptions}
//                       value={priceRange}
//                       onChange={setPriceRange}
//                     />

//                     <Select
//                       placeholder={t?.bedrooms}
//                       options={bedroomOptions}
//                       value={bedrooms}
//                       onChange={setBedrooms}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Desktop Search */}
//             <div className="hidden lg:block">
//               <div className="grid grid-cols-12 gap-4 items-end">
//                 <div className="col-span-4">
//                   <Input
//                     type="search"
//                     placeholder={t?.searchPlaceholder}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e?.target?.value)}
//                   />
//                 </div>

//                 <div className="col-span-2">
//                   <Select
//                     placeholder={t?.location}
//                     options={locationOptions}
//                     value={location}
//                     onChange={setLocation}
//                     searchable
//                   />
//                 </div>

//                 <div className="col-span-2">
//                   <Select
//                     placeholder={t?.propertyType}
//                     options={propertyTypeOptions}
//                     value={propertyType}
//                     onChange={setPropertyType}
//                   />
//                 </div>

//                 <div className="col-span-2">
//                   <Select
//                     placeholder={t?.priceRange}
//                     options={priceRangeOptions}
//                     value={priceRange}
//                     onChange={setPriceRange}
//                   />
//                 </div>

//                 <div className="col-span-1">
//                   <Select
//                     placeholder={t?.bedrooms}
//                     options={bedroomOptions}
//                     value={bedrooms}
//                     onChange={setBedrooms}
//                   />
//                 </div>

//                 <div className="col-span-1">
//                   <Button
//                     type="submit"
//                     className="w-full h-12"
//                     iconName="Search"
//                     iconPosition="left"
//                   >
//                     <span className="hidden xl:inline">{t?.searchButton}</span>
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Mobile Search Button */}
//             <div className="lg:hidden mt-6">
//               <Button
//                 type="submit"
//                 className="w-full"
//                 iconName="Search"
//                 iconPosition="left"
//               >
//                 {t?.searchButton}
//               </Button>
//             </div>
//           </form>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
//           <div className="text-center text-white">
//             <div className="text-3xl lg:text-4xl font-bold mb-2">10K+</div>
//             <div className="text-blue-100 text-sm lg:text-base">
//               Properties Listed
//             </div>
//           </div>
//           <div className="text-center text-white">
//             <div className="text-3xl lg:text-4xl font-bold mb-2">5K+</div>
//             <div className="text-blue-100 text-sm lg:text-base">
//               Happy Customers
//             </div>
//           </div>
//           <div className="text-center text-white">
//             <div className="text-3xl lg:text-4xl font-bold mb-2">50+</div>
//             <div className="text-blue-100 text-sm lg:text-base">
//               Cities Covered
//             </div>
//           </div>
//           <div className="text-center text-white">
//             <div className="text-3xl lg:text-4xl font-bold mb-2">15+</div>
//             <div className="text-blue-100 text-sm lg:text-base">
//               Years Experience
//             </div>
//           </div>
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
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

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
    { value: "house", label: "Independent House" },
    { value: "plot", label: "Plot/Land" },
    { value: "commercial", label: "Commercial" },
    { value: "office", label: "Office Space" },
  ];

  const priceRangeOptions = [
    { value: "0-25", label: "Under ₹25 Lakh" },
    { value: "25-50", label: "₹25L - ₹50L" },
    { value: "50-75", label: "₹50L - ₹75L" },
    { value: "75-100", label: "₹75L - ₹1 Cr" },
    { value: "100-200", label: "₹1Cr - ₹2Cr" },
    { value: "200+", label: "Above ₹2 Cr" },
  ];

  const bedroomOptions = [
    { value: "1", label: "1 BHK" },
    { value: "2", label: "2 BHK" },
    { value: "3", label: "3 BHK" },
    { value: "4", label: "4 BHK" },
    { value: "5+", label: "5+ BHK" },
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    const searchParams = {
      query: searchQuery,
      location,
      propertyType,
      priceRange,
      bedrooms,
    };
    navigate("/property-listings", { state: { searchParams } });
  };

  const content = {
    en: {
      title: "Find Your Dream Property",
      subtitle: "Discover exceptional homes in premium locations across India",
      searchPlaceholder: "Search by location, property name, or area...",
      location: "Location",
      propertyType: "Property Type",
      priceRange: "Price Range",
      bedrooms: "Bedrooms",
      searchButton: "Search Properties",
      advancedFilters: "Advanced Filters",
    },
    hi: {
      title: "अपनी सपनों की संपत्ति खोजें",
      subtitle: "भारत के प्रीमियम स्थानों में उत्कृष्ट घरों की खोज करें",
      searchPlaceholder: "स्थान, संपत्ति का नाम या क्षेत्र से खोजें...",
      location: "स्थान",
      propertyType: "संपत्ति का प्रकार",
      priceRange: "मूल्य सीमा",
      bedrooms: "बेडरूम",
      searchButton: "संपत्ति खोजें",
      advancedFilters: "उन्नत फिल्टर",
    },
    mr: {
      title: "तुमची स्वप्नांची मालमत्ता शोधा",
      subtitle: "भारतातील प्रीमियम स्थानांमध्ये उत्कृष्ट घरे शोधा",
      searchPlaceholder: "स्थान, मालमत्तेचे नाव किंवा क्षेत्राने शोधा...",
      location: "स्थान",
      propertyType: "मालमत्तेचा प्रकार",
      priceRange: "किंमत श्रेणी",
      bedrooms: "बेडरूम",
      searchButton: "मालमत्ता शोधा",
      advancedFilters: "प्रगत फिल्टर",
    },
  };

  const t = content?.[currentLanguage] || content?.en;

  return (
    <section className="relative min-h-[700px] bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        {/* Accent Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-slate-50 to-transparent rounded-full blur-3xl opacity-50"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-slate-200 rounded-lg rotate-12 opacity-20"></div>
        <div className="absolute bottom-32 left-32 w-24 h-24 border border-slate-200 rounded-full opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-8 border border-blue-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            India's Premium Property Platform
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
            {t?.title}
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            {t?.subtitle}
          </p>
        </div>

        {/* Premium Search Form */}
        <div className="max-w-6xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 lg:p-10 backdrop-blur-sm"
          >
            {/* Mobile Search */}
            <div className="lg:hidden space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="search"
                  placeholder={t?.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-12 pr-4 py-3 text-slate-700 placeholder-slate-400 border-slate-200 focus:border-blue-300"
                />
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-center space-x-3 py-3 border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-medium">{t?.advancedFilters}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>

              {isExpanded && (
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Select
                      placeholder={t?.location}
                      options={locationOptions}
                      value={location}
                      onChange={setLocation}
                      searchable
                      className="pl-10"
                    />
                  </div>

                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Select
                      placeholder={t?.propertyType}
                      options={propertyTypeOptions}
                      value={propertyType}
                      onChange={setPropertyType}
                      className="pl-10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Select
                        placeholder={t?.priceRange}
                        options={priceRangeOptions}
                        value={priceRange}
                        onChange={setPriceRange}
                        className="pl-10"
                      />
                    </div>

                    <div className="relative">
                      <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Select
                        placeholder={t?.bedrooms}
                        options={bedroomOptions}
                        value={bedrooms}
                        onChange={setBedrooms}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-12 gap-6 items-end">
                <div className="col-span-3 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    type="search"
                    placeholder={t?.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full pl-12 pr-4 py-4 text-slate-700 placeholder-slate-400 border-slate-200 focus:border-blue-300 rounded-xl"
                  />
                </div>

                <div className="col-span-2 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                  <Select
                    placeholder={t?.location}
                    options={locationOptions}
                    value={location}
                    onChange={setLocation}
                    searchable
                    className="pl-10"
                  />
                </div>

                <div className="col-span-2 relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                  <Select
                    placeholder={t?.propertyType}
                    options={propertyTypeOptions}
                    value={propertyType}
                    onChange={setPropertyType}
                    className="pl-10"
                  />
                </div>

                <div className="col-span-2 relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                  <Select
                    placeholder={t?.priceRange}
                    options={priceRangeOptions}
                    value={priceRange}
                    onChange={setPriceRange}
                    className="pl-10"
                  />
                </div>

                <div className="col-span-2 relative">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                  <Select
                    placeholder={t?.bedrooms}
                    options={bedroomOptions}
                    value={bedrooms}
                    onChange={setBedrooms}
                    className="pl-10"
                  />
                </div>

                <div className="col-span-1">
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200"
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Search Button */}
            <div className="lg:hidden mt-6">
              <Button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25"
              >
                <Search className="w-5 h-5 mr-2" />
                {t?.searchButton}
              </Button>
            </div>
          </form>
        </div>

        {/* Premium Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto">
          {[
            { number: "10K+", label: "Premium Properties" },
            { number: "5K+", label: "Satisfied Clients" },
            { number: "50+", label: "Cities Nationwide" },
            { number: "15+", label: "Years Excellence" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative inline-block">
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 group-hover:scale-105 transition-transform duration-200">
                  {stat.number}
                </div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-3 rounded-full"></div>
              </div>
              <div className="text-slate-600 text-sm lg:text-base font-medium tracking-wide">
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