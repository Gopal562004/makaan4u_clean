// import React from "react";
// import { Search, PenTool, TrendingUp, Sparkles } from "lucide-react";

// const BlogHero = ({
//   searchQuery,
//   onSearchChange,
//   onSearchSubmit,
//   totalArticles,
// }) => {
//   return (
//     <section className="relative bg-white py-20 border-b border-gray-100 overflow-hidden">
//       {/* Abstract Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-10 left-10 w-20 h-20 bg-blue-50 rounded-full blur-xl opacity-60"></div>
//         <div className="absolute bottom-10 right-10 w-24 h-24 bg-indigo-50 rounded-full blur-xl opacity-40"></div>
//         <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-50 rounded-full blur-xl opacity-50"></div>
//       </div>

//       <div className="relative max-w-6xl mx-auto px-4 text-center">
//         {/* Unique Header Badge */}
//         <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 text-lg font-semibold mb-8 shadow-sm">
//           <Sparkles className="w-5 h-5 mr-3 text-blue-600" />
//           The Knowledge Hub for Property Enthusiasts
//         </div>

//         {/* Main Heading with Creative Typography */}
//         <div className="mb-8">
//           <h1 className="text-6xl font-bold text-gray-900 mb-4 leading-tight">
//             Property
//             <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Perspectives
//             </span>
//           </h1>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
//         </div>

//         {/* Subheading with Icon */}
//         <div className="flex items-center justify-center mb-8">
//           <PenTool className="w-6 h-6 text-gray-400 mr-3" />
//           <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
//             Where data meets insight, and experience transforms into wisdom for
//             your property journey
//           </p>
//         </div>

//         {/* Enhanced Stats with Progress Indicators */}
//         <div className="flex justify-center items-center space-x-12 mb-10">
//           <div className="text-center">
//             <div className="text-3xl font-bold text-gray-900 mb-1">
//               {totalArticles}
//             </div>
//             <div className="text-sm text-gray-500 font-medium">
//               Curated Stories
//             </div>
//             <div className="w-16 h-1 bg-blue-200 rounded-full mx-auto mt-2">
//               <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
//             </div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-gray-900 mb-1">15+</div>
//             <div className="text-sm text-gray-500 font-medium">
//               Industry Experts
//             </div>
//             <div className="w-16 h-1 bg-green-200 rounded-full mx-auto mt-2">
//               <div className="w-10 h-1 bg-green-500 rounded-full"></div>
//             </div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-gray-900 mb-1">42</div>
//             <div className="text-sm text-gray-500 font-medium">
//               Topics Covered
//             </div>
//             <div className="w-16 h-1 bg-purple-200 rounded-full mx-auto mt-2">
//               <div className="w-14 h-1 bg-purple-500 rounded-full"></div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Search with Context */}
//         <div className="max-w-2xl mx-auto">
//           <div className="relative group">
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Dive into market insights, investment strategies, or expert analysis..."
//                 value={searchQuery}
//                 onChange={(e) => onSearchChange(e.target.value)}
//                 className="w-full px-6 py-5 pl-14 rounded-2xl border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-white shadow-lg"
//               />
//               <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-500 transition-colors" />
//               <button
//                 onClick={() => onSearchSubmit(searchQuery)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
//               >
//                 Discover
//               </button>
//             </div>
//           </div>

//           {/* Search Suggestions */}
//           <div className="flex justify-center space-x-6 mt-4">
//             <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
//               📈 Market Trends
//             </span>
//             <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
//               🏠 Home Buying
//             </span>
//             <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
//               💼 Investment
//             </span>
//           </div>
//         </div>

//         {/* Trust Indicator */}
//         <div className="mt-12 flex items-center justify-center space-x-2 text-sm text-gray-500">
//           <TrendingUp className="w-4 h-4 text-green-500" />
//           <span>Trusted by 10,000+ property professionals monthly</span>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogHero;
import React from "react";
import { Search, PenTool, TrendingUp, Sparkles } from "lucide-react";

const BlogHero = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  totalArticles,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 border-b border-gray-100 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-50 rounded-full blur-lg sm:blur-xl opacity-60"></div>
        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-indigo-50 rounded-full blur-lg sm:blur-xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/6 sm:left-1/4 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-50 rounded-full blur-lg sm:blur-xl opacity-50"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Unique Header Badge */}
        <div className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 text-sm sm:text-base md:text-lg font-semibold mb-6 sm:mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-600 flex-shrink-0" />
          <span className="text-xs sm:text-sm md:text-base">
            The Knowledge Hub for Property Enthusiasts
          </span>
        </div>

        {/* Main Heading with Creative Typography */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Property
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1 sm:mt-2">
              Perspectives
            </span>
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
        </div>

        {/* Subheading with Icon */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 px-2">
          <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mr-2 sm:mr-3 flex-shrink-0" />
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
            Where data meets insight, and experience transforms into wisdom for
            your property journey
          </p>
        </div>

        {/* Enhanced Stats with Progress Indicators */}
        <div className="flex justify-center items-center space-x-4 sm:space-x-8 md:space-x-12 mb-8 sm:mb-10">
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {totalArticles}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              Curated Stories
            </div>
            <div className="w-12 sm:w-14 md:w-16 h-0.5 sm:h-1 bg-blue-200 rounded-full mx-auto mt-1 sm:mt-2">
              <div className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              15+
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              Industry Experts
            </div>
            <div className="w-12 sm:w-14 md:w-16 h-0.5 sm:h-1 bg-green-200 rounded-full mx-auto mt-1 sm:mt-2">
              <div className="w-6 sm:w-8 md:w-10 h-0.5 sm:h-1 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              42
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              Topics Covered
            </div>
            <div className="w-12 sm:w-14 md:w-16 h-0.5 sm:h-1 bg-purple-200 rounded-full mx-auto mt-1 sm:mt-2">
              <div className="w-10 sm:w-12 md:w-14 h-0.5 sm:h-1 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Search with Context */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl blur opacity-20 sm:opacity-25 group-hover:opacity-30 sm:group-hover:opacity-40 transition duration-300"></div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search market insights, investment strategies..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 md:py-5 pl-12 sm:pl-14 rounded-xl sm:rounded-2xl border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-300 bg-white shadow-lg text-sm sm:text-base"
              />
              <Search className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 group-hover:text-blue-500 transition-colors" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base"
              >
                Discover
              </button>
            </div>
          </form>

          {/* Search Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6 mt-3 sm:mt-4">
            <span className="text-xs sm:text-sm text-gray-500 bg-gray-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-gray-200 whitespace-nowrap">
              📈 Market Trends
            </span>
            <span className="text-xs sm:text-sm text-gray-500 bg-gray-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-gray-200 whitespace-nowrap">
              🏠 Home Buying
            </span>
            <span className="text-xs sm:text-sm text-gray-500 bg-gray-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-gray-200 whitespace-nowrap">
              💼 Investment
            </span>
          </div>
        </div>

        {/* Trust Indicator */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 px-2">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
          <span>Trusted by 10,000+ property professionals monthly</span>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;