// import React from "react";
// import { Grid, List } from "lucide-react";

// const CategoryFilters = ({
//   categories,
//   selectedCategory,
//   onCategoryChange,
//   currentView,
//   onViewChange,
// }) => {
//   return (
//     <section className="bg-white py-6 border-b border-gray-200 sticky top-16 z-40">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//           {/* View Toggle */}
//           <div className="flex items-center space-x-4">
//             <span className="text-sm font-medium text-gray-900">View as:</span>
//             <div className="flex bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => onViewChange("grid")}
//                 className={`p-2 rounded-md transition-all duration-200 ${
//                   currentView === "grid"
//                     ? "bg-white text-blue-600 shadow-sm"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 <Grid className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => onViewChange("list")}
//                 className={`p-2 rounded-md transition-all duration-200 ${
//                   currentView === "list"
//                     ? "bg-white text-blue-600 shadow-sm"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 <List className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           {/* Categories */}
//           <div className="flex overflow-x-auto space-x-3 scrollbar-hide">
//             <button
//               onClick={() => onCategoryChange("all")}
//               className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all duration-200 ${
//                 selectedCategory === "all"
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//               }`}
//             >
//               All Articles
//             </button>

//             {categories
//               .filter((cat) => cat.id !== "all")
//               .map((category) => (
//                 <button
//                   key={category.id}
//                   onClick={() => onCategoryChange(category.id)}
//                   className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all duration-200 ${
//                     selectedCategory === category.id
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                   }`}
//                 >
//                   {category.name}
//                 </button>
//               ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryFilters;
import React from "react";
import { Grid, List } from "lucide-react";

const CategoryFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  currentView,
  onViewChange,
}) => {
  return (
    <section className="bg-white py-4 sm:py-6 border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 lg:gap-0">
          {/* View Toggle */}
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
              View as:
            </span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewChange("grid")}
                className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${
                  currentView === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewChange("list")}
                className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 ${
                  currentView === "list"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Categories - Scrollable on mobile */}
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
              <div className="flex space-x-2 sm:space-x-3 min-w-max">
                <button
                  onClick={() => onCategoryChange("all")}
                  className={`flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${
                    selectedCategory === "all"
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  All Articles
                </button>

                {categories
                  .filter((cat) => cat.id !== "all")
                  .map((category) => (
                    <button
                      key={category.id}
                      onClick={() => onCategoryChange(category.id)}
                      className={`flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${
                        selectedCategory === category.id
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
              </div>
            </div>

            {/* Gradient fade for scroll indication on mobile */}
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent pointer-events-none lg:hidden"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFilters;