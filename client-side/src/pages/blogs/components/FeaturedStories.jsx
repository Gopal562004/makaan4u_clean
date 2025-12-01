// import React from "react";
// import { Calendar, Clock, User, ArrowRight, Star } from "lucide-react";

// const FeaturedStories = ({ posts }) => {
//   if (posts.length === 0) return null;

//   return (
//     <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-blue-600 text-sm font-medium mb-4 shadow-sm">
//             <Star className="w-4 h-4 mr-2 fill-current" />
//             Editor's Choice
//           </div>
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Featured Insights
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Handpicked stories offering deep analysis and expert perspectives
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {posts.map((post, index) => (
//             <div
//               key={post.id}
//               className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 group ${
//                 index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
//               }`}
//             >
//               <div className={`relative ${index === 0 ? "h-80" : "h-48"}`}>
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

//                 {/* Premium Badge */}
//                 {post.premium && (
//                   <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
//                     Premium
//                   </div>
//                 )}

//                 <div className="absolute bottom-4 left-4 right-4">
//                   <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
//                     {post.category}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <h3
//                   className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${
//                     index === 0 ? "text-2xl" : "text-xl"
//                   }`}
//                 >
//                   {post.title}
//                 </h3>
//                 <p
//                   className={`text-gray-600 mb-4 ${
//                     index === 0 ? "text-lg" : "text-base"
//                   }`}
//                 >
//                   {post.excerpt}
//                 </p>

//                 {/* Author & Meta */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <img
//                       src={post.author.avatar}
//                       alt={post.author.name}
//                       className="w-8 h-8 rounded-full"
//                     />
//                     <div>
//                       <div className="text-sm font-medium text-gray-900">
//                         {post.author.name}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {post.author.role}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-4 text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       <span>{new Date(post.date).toLocaleDateString()}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 mr-1" />
//                       <span>{post.readTime}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Engagement Stats */}
//                 <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
//                   <div className="flex items-center space-x-4 text-sm text-gray-500">
//                     <span>{post.views} views</span>
//                     <span>{post.comments} comments</span>
//                     <span>{post.likes} likes</span>
//                   </div>
//                   <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
//                     Read Story
//                     <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedStories;
import React from "react";
import { Calendar, Clock, User, ArrowRight, Star } from "lucide-react";

const FeaturedStories = ({ posts }) => {
  if (posts.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-blue-600 text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 fill-current" />
            Editor's Choice
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Featured Insights
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Handpicked stories offering deep analysis and expert perspectives
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg sm:hover:shadow-xl transition-all duration-500 group ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              {/* Image Section */}
              <div
                className={`relative ${
                  index === 0 ? "h-48 sm:h-60 md:h-80" : "h-40 sm:h-48"
                }`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Premium Badge */}
                {post.premium && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-yellow-500 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 rounded-full text-xs font-medium">
                    Premium
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 md:bottom-4 md:left-4 md:right-4">
                  <span className="bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium capitalize">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5 md:p-6">
                {/* Title */}
                <h3
                  className={`font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors leading-tight ${
                    index === 0
                      ? "text-lg sm:text-xl md:text-2xl"
                      : "text-base sm:text-lg md:text-xl"
                  }`}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  className={`text-gray-600 mb-3 sm:mb-4 leading-relaxed ${
                    index === 0
                      ? "text-sm sm:text-base md:text-lg"
                      : "text-sm sm:text-base"
                  } ${index === 0 ? "line-clamp-3" : "line-clamp-2"}`}
                >
                  {post.excerpt}
                </p>

                {/* Author & Meta Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  {/* Author */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
                        {post.author.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-none">
                        {post.author.role}
                      </div>
                    </div>
                  </div>

                  {/* Date & Read Time */}
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span className="whitespace-nowrap">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Engagement Stats & CTA */}
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 sm:gap-0 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  {/* Stats */}
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                    <span>{post.views} views</span>
                    <span>{post.comments} comments</span>
                    <span>{post.likes} likes</span>
                  </div>

                  {/* Read Button */}
                  <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm sm:text-base self-start xs:self-auto">
                    Read Story
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;