// import React from "react";
// import { Eye, MessageCircle, Heart, Clock } from "lucide-react";

// const StatsOverview = ({ posts }) => {
//   const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
//   const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
//   const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
//   const avgReadTime = (
//     posts.reduce((sum, post) => {
//       const time = parseInt(post.readTime);
//       return sum + (isNaN(time) ? 0 : time);
//     }, 0) / posts.length
//   ).toFixed(1);

//   const stats = [
//     {
//       icon: Eye,
//       value: `${(totalViews / 1000).toFixed(1)}K`,
//       label: "Monthly Views",
//       color: "blue",
//     },
//     {
//       icon: MessageCircle,
//       value: totalComments,
//       label: "Community Discussions",
//       color: "green",
//     },
//     {
//       icon: Heart,
//       value: totalLikes,
//       label: "Reader Engagement",
//       color: "red",
//     },
//     {
//       icon: Clock,
//       value: `${avgReadTime} min`,
//       label: "Avg. Read Time",
//       color: "purple",
//     },
//   ];

//   return (
//     <section className="bg-white py-12 border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300"
//             >
//               <div
//                 className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center mx-auto mb-4`}
//               >
//                 <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
//               </div>
//               <div className="text-2xl font-bold text-gray-900 mb-1">
//                 {stat.value}
//               </div>
//               <div className="text-sm text-gray-600">{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StatsOverview;
import React from "react";
import { Eye, MessageCircle, Heart, Clock } from "lucide-react";

const StatsOverview = ({ posts }) => {
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const avgReadTime = (
    posts.reduce((sum, post) => {
      const time = parseInt(post.readTime);
      return sum + (isNaN(time) ? 0 : time);
    }, 0) / posts.length
  ).toFixed(1);

  const stats = [
    {
      icon: Eye,
      value:
        totalViews > 1000
          ? `${(totalViews / 1000).toFixed(1)}K`
          : totalViews.toString(),
      label: "Monthly Views",
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      icon: MessageCircle,
      value:
        totalComments > 1000
          ? `${(totalComments / 1000).toFixed(1)}K`
          : totalComments.toString(),
      label: "Community Discussions",
      color: "green",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      icon: Heart,
      value:
        totalLikes > 1000
          ? `${(totalLikes / 1000).toFixed(1)}K`
          : totalLikes.toString(),
      label: "Reader Engagement",
      color: "red",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      icon: Clock,
      value: `${avgReadTime} min`,
      label: "Avg. Read Time",
      color: "purple",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  return (
    <section className="bg-white py-6 sm:py-8 md:py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 hover:shadow-sm sm:hover:shadow-md transition-all duration-300"
            >
              {/* Icon Container */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4`}
              >
                <stat.icon
                  className={`w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 ${stat.textColor}`}
                />
              </div>

              {/* Value */}
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm text-gray-600 leading-tight px-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsOverview;