// import React from "react";
// import {
//   Calendar,
//   Clock,
//   User,
//   MessageCircle,
//   Eye,
//   Heart,
//   ArrowRight,
// } from "lucide-react";

// const BlogListCard = ({ post }) => {
//   return (
//     <article className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
//       <div className="flex flex-col md:flex-row md:items-center gap-6">
//         {/* Image */}
//         <div className="flex-shrink-0">
//           <div className="relative w-full md:w-40 h-32 rounded-xl overflow-hidden">
//             <img
//               src={post.image}
//               alt={post.title}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//             {post.premium && (
//               <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
//                 Premium
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center space-x-3 mb-3">
//             <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium capitalize">
//               {post.category}
//             </span>
//             <div className="flex items-center text-xs text-gray-500">
//               <Calendar className="w-3 h-3 mr-1" />
//               {new Date(post.date).toLocaleDateString()}
//             </div>
//           </div>

//           <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
//             {post.title}
//           </h3>

//           <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
//             {post.excerpt}
//           </p>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <img
//                   src={post.author.avatar}
//                   alt={post.author.name}
//                   className="w-6 h-6 rounded-full"
//                 />
//                 <span className="text-sm font-medium text-gray-700">
//                   {post.author.name}
//                 </span>
//               </div>

//               <div className="flex items-center space-x-4 text-xs text-gray-500">
//                 <div className="flex items-center">
//                   <Clock className="w-3 h-3 mr-1" />
//                   <span>{post.readTime}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Eye className="w-3 h-3 mr-1" />
//                   <span>{post.views}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <MessageCircle className="w-3 h-3 mr-1" />
//                   <span>{post.comments}</span>
//                 </div>
//               </div>
//             </div>

//             <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group/btn">
//               Read
//               <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default BlogListCard;
import React from "react";
import {
  Calendar,
  Clock,
  User,
  MessageCircle,
  Eye,
  Heart,
  ArrowRight,
} from "lucide-react";

const BlogListCard = ({ post }) => {
  return (
    <article className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-md sm:hover:shadow-lg transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 md:gap-6">
        {/* Image */}
        <div className="flex-shrink-0 w-full sm:w-32 md:w-40">
          <div className="relative w-full h-28 sm:h-24 md:h-32 rounded-lg sm:rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {post.premium && (
              <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-yellow-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium">
                Premium
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Category and Date */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium capitalize">
              {post.category}
            </span>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="whitespace-nowrap">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-tight sm:leading-normal">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 text-sm leading-relaxed">
            {post.excerpt}
          </p>

          {/* Footer - Author, Stats, and Read Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            {/* Author and Stats */}
            <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-4">
              {/* Author */}
              <div className="flex items-center space-x-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex-shrink-0"
                />
                <span className="text-sm font-medium text-gray-700 truncate max-w-[120px] sm:max-w-none">
                  {post.author.name}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>

            {/* Read Button */}
            <button
              className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group/btn self-start sm:self-auto text-sm sm:text-base"
              aria-label={`Read ${post.title}`}
            >
              Read
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover/btn:translate-x-0.5 sm:group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogListCard;