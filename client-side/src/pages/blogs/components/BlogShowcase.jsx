// import React from "react";
// import BlogCard from "./BlogCard";
// import BlogListCard from "./BlogListCard";

// const BlogShowcase = ({ posts, currentView }) => {
//   if (posts.length === 0) {
//     return (
//       <div className="text-center py-16">
//         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <span className="text-3xl">🔍</span>
//         </div>
//         <h3 className="text-xl font-semibold text-gray-900 mb-2">
//           No stories found
//         </h3>
//         <p className="text-gray-600">
//           Try adjusting your search criteria or browse different categories
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">Latest Insights</h2>
//           <p className="text-gray-600 mt-2">
//             {posts.length} stories to explore
//           </p>
//         </div>

//         <div className="text-sm text-gray-500">
//           Showing {posts.length} of {posts.length} results
//         </div>
//       </div>

//       {currentView === "grid" ? (
//         <div className="grid md:grid-cols-2 gap-8">
//           {posts.map((post) => (
//             <BlogCard key={post.id} post={post} />
//           ))}
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {posts.map((post) => (
//             <BlogListCard key={post.id} post={post} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogShowcase;
import React from "react";
import BlogCard from "./BlogCard";
import BlogListCard from "./BlogListCard";

const BlogShowcase = ({ posts, currentView }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <span className="text-2xl sm:text-3xl">🔍</span>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">
          No stories found
        </h3>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto px-4">
          Try adjusting your search criteria or browse different categories
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Latest Insights
          </h2>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            {posts.length} {posts.length === 1 ? "story" : "stories"} to explore
          </p>
        </div>

        <div className="text-xs sm:text-sm text-gray-500">
          Showing {posts.length} of {posts.length} results
        </div>
      </div>

      {/* Content Grid/List */}
      {currentView === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {posts.map((post) => (
            <BlogListCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Load More / Pagination Placeholder */}
      {posts.length > 6 && (
        <div className="flex justify-center mt-8 sm:mt-12">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-sm sm:text-base">
            Load More Stories
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogShowcase;