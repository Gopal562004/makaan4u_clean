// import React from "react";
// import { TrendingUp, ArrowRight } from "lucide-react";

// const TrendingTopics = ({ posts }) => {
//   const trendingTags = [
//     { name: "Smart Homes", count: 24, trend: "up" },
//     { name: "Sustainable Living", count: 18, trend: "up" },
//     { name: "Investment Strategies", count: 32, trend: "up" },
//     { name: "Market Analysis", count: 15, trend: "steady" },
//     { name: "Home Staging", count: 12, trend: "up" },
//     { name: "Legal Updates", count: 8, trend: "steady" },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-lg font-bold text-gray-900 flex items-center">
//           <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
//           Trending Topics
//         </h3>
//         <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
//           View All
//           <ArrowRight className="w-4 h-4 ml-1" />
//         </button>
//       </div>

//       <div className="space-y-4">
//         {trendingTags.map((tag, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group cursor-pointer"
//           >
//             <div className="flex items-center space-x-3">
//               <div
//                 className={`w-2 h-2 rounded-full ${
//                   tag.trend === "up" ? "bg-green-500" : "bg-blue-500"
//                 }`}
//               ></div>
//               <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
//                 {tag.name}
//               </span>
//             </div>
//             <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
//               {tag.count}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Trending Posts */}
//       <div className="mt-8">
//         <h4 className="font-semibold text-gray-900 mb-4">Hot This Week</h4>
//         <div className="space-y-3">
//           {posts.slice(0, 3).map((post) => (
//             <div
//               key={post.id}
//               className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
//             >
//               <img
//                 src={post.image}
//                 alt={post.title}
//                 className="w-12 h-12 rounded-lg object-cover"
//               />
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
//                   {post.title}
//                 </p>
//                 <div className="flex items-center space-x-2 mt-1">
//                   <span className="text-xs text-gray-500">
//                     {post.views} views
//                   </span>
//                   <span className="text-xs text-gray-500">•</span>
//                   <span className="text-xs text-gray-500">{post.readTime}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendingTopics;
import React from "react";
import { TrendingUp, ArrowRight } from "lucide-react";

const TrendingTopics = ({ posts }) => {
  const trendingTags = [
    { name: "Smart Homes", count: 24, trend: "up" },
    { name: "Sustainable Living", count: 18, trend: "up" },
    { name: "Investment Strategies", count: 32, trend: "up" },
    { name: "Market Analysis", count: 15, trend: "steady" },
    { name: "Home Staging", count: 12, trend: "up" },
    { name: "Legal Updates", count: 8, trend: "steady" },
  ];

  return (
    <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-500 flex-shrink-0" />
          Trending Topics
        </h3>
        <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors">
          View All
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 flex-shrink-0" />
        </button>
      </div>

      {/* Trending Tags */}
      <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-7 md:mb-8">
        {trendingTags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 sm:p-3 rounded-lg md:rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200 group cursor-pointer"
          >
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${
                  tag.trend === "up" ? "bg-green-500" : "bg-blue-500"
                }`}
              ></div>
              <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base truncate">
                {tag.name}
              </span>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 bg-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex-shrink-0 ml-2">
              {tag.count}
            </span>
          </div>
        ))}
      </div>

      {/* Trending Posts */}
      <div className="mt-6 sm:mt-7 md:mt-8">
        <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
          Hot This Week
        </h4>
        <div className="space-y-2 sm:space-y-3">
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </p>
                <div className="flex items-center space-x-1.5 sm:space-x-2 mt-0.5 sm:mt-1">
                  <span className="text-xs text-gray-500">
                    {post.views > 1000
                      ? `${(post.views / 1000).toFixed(1)}K`
                      : post.views}{" "}
                    views
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;