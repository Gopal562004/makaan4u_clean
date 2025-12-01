// import React from "react";
// import {
//   Calendar,
//   Clock,
//   User,
//   MessageCircle,
//   Eye,
//   Heart,
//   Bookmark,
//   Share2,
// } from "lucide-react";

// const BlogCard = ({ post }) => {
//   return (
//     <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 group">
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={post.image}
//           alt={post.title}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

//         {/* Premium Badge */}
//         {post.premium && (
//           <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
//             Premium
//           </div>
//         )}

//         <div className="absolute bottom-3 left-3">
//           <span className="bg-white bg-opacity-90 text-gray-700 px-2 py-1 rounded-full text-xs font-medium capitalize">
//             {post.category}
//           </span>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center space-x-2">
//             <img
//               src={post.author.avatar}
//               alt={post.author.name}
//               className="w-6 h-6 rounded-full"
//             />
//             <span className="text-sm font-medium text-gray-700">
//               {post.author.name}
//             </span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <button className="p-1 hover:bg-gray-100 rounded transition-colors">
//               <Bookmark className="w-4 h-4 text-gray-400" />
//             </button>
//             <button className="p-1 hover:bg-gray-100 rounded transition-colors">
//               <Share2 className="w-4 h-4 text-gray-400" />
//             </button>
//           </div>
//         </div>

//         <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
//           {post.title}
//         </h3>

//         <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
//           {post.excerpt}
//         </p>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-1 mb-4">
//           {post.tags.slice(0, 2).map((tag, index) => (
//             <span
//               key={index}
//               className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium"
//             >
//               #{tag}
//             </span>
//           ))}
//           {post.tags.length > 2 && (
//             <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
//               +{post.tags.length - 2}
//             </span>
//           )}
//         </div>

//         {/* Meta Information */}
//         <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center">
//               <Calendar className="w-3 h-3 mr-1" />
//               <span>{new Date(post.date).toLocaleDateString()}</span>
//             </div>
//             <div className="flex items-center">
//               <Clock className="w-3 h-3 mr-1" />
//               <span>{post.readTime}</span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <div className="flex items-center space-x-1">
//               <Eye className="w-3 h-3" />
//               <span>{post.views}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <MessageCircle className="w-3 h-3" />
//               <span>{post.comments}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <Heart className="w-3 h-3" />
//               <span>{post.likes}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default BlogCard;
import React from "react";
import {
  Calendar,
  Clock,
  User,
  MessageCircle,
  Eye,
  Heart,
  Bookmark,
  Share2,
} from "lucide-react";

const BlogCard = ({ post }) => {
  return (
    <article className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg sm:hover:shadow-xl transition-all duration-500 group">
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* Premium Badge */}
        {post.premium && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-yellow-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium">
            Premium
          </div>
        )}

        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
          <span className="bg-white bg-opacity-90 text-gray-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium capitalize">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        {/* Author and Actions */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex-shrink-0"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[100px] sm:max-w-none">
              {post.author.name}
            </span>
          </div>
          <div className="flex items-center space-x-0.5 sm:space-x-1">
            <button
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Save article"
            >
              <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight sm:leading-normal">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 text-xs sm:text-sm leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
          {post.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium">
              +{post.tags.length - 2}
            </span>
          )}
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-0.5 sm:mr-1 flex-shrink-0" />
              <span className="text-xs">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-0.5 sm:mr-1 flex-shrink-0" />
              <span className="text-xs">{post.readTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <Eye className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs">{post.views}</span>
            </div>
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <MessageCircle className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs">{post.comments}</span>
            </div>
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <Heart className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs">{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;