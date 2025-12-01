// import React from "react";
// import { Tag } from "lucide-react";

// const PopularTags = ({ tags }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
//         <Tag className="w-5 h-5 mr-2 text-blue-600" />
//         Popular Tags
//       </h3>
//       <div className="flex flex-wrap gap-2">
//         {tags.map((tag, index) => (
//           <button
//             key={index}
//             className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
//           >
//             #{tag}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularTags;
import React from "react";
import { Tag } from "lucide-react";

const PopularTags = ({ tags }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6">
      {/* Header */}
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
        <Tag className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 flex-shrink-0" />
        Popular Tags
      </h3>

      {/* Tags Container */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 hover:scale-105 active:scale-95"
            aria-label={`Browse articles tagged ${tag}`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Optional: Show more on mobile if many tags */}
      {tags.length > 8 && (
        <div className="mt-3 sm:mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors">
            Show More Tags
          </button>
        </div>
      )}
    </div>
  );
};

export default PopularTags;