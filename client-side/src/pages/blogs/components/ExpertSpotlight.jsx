// import React from "react";
// import { Award, BookOpen, Calendar } from "lucide-react";

// const ExpertSpotlight = ({ experts }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//       <div className="text-center mb-6">
//         <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
//         <h3 className="text-lg font-bold text-gray-900">Expert Spotlight</h3>
//         <p className="text-sm text-gray-600">Learn from industry leaders</p>
//       </div>

//       <div className="space-y-6">
//         {experts.map((expert) => (
//           <div
//             key={expert.id}
//             className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
//           >
//             <img
//               src={expert.avatar}
//               alt={expert.name}
//               className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-white shadow-sm"
//             />
//             <h4 className="font-bold text-gray-900">{expert.name}</h4>
//             <p className="text-sm text-blue-600 font-medium mb-1">
//               {expert.role}
//             </p>
//             <p className="text-xs text-gray-600 mb-3">{expert.expertise}</p>

//             <div className="flex justify-center space-x-4 text-xs text-gray-500">
//               <div className="flex items-center">
//                 <BookOpen className="w-3 h-3 mr-1" />
//                 <span>{expert.articles} articles</span>
//               </div>
//               <div className="flex items-center">
//                 <Calendar className="w-3 h-3 mr-1" />
//                 <span>{expert.experience}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 text-center">
//         <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//           Meet All Experts →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExpertSpotlight;
import React from "react";
import { Award, BookOpen, Calendar } from "lucide-react";

const ExpertSpotlight = ({ experts }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-500 mx-auto mb-1 sm:mb-2" />
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
          Expert Spotlight
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Learn from industry leaders
        </p>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 md:gap-6">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-md transition-all duration-300"
          >
            {/* Expert Avatar */}
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mx-auto mb-2 sm:mb-3 border-2 border-white shadow-sm"
            />

            {/* Expert Info */}
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">
              {expert.name}
            </h4>
            <p className="text-blue-600 font-medium mb-1 text-xs sm:text-sm">
              {expert.role}
            </p>
            <p className="text-gray-600 mb-2 sm:mb-3 text-xs leading-relaxed line-clamp-2">
              {expert.expertise}
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-3 sm:space-x-4 text-gray-500">
              <div className="flex items-center">
                <BookOpen className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="text-xs">{expert.articles} articles</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="text-xs">{expert.experience}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-4 sm:mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 text-xs sm:text-sm">
          Meet All Experts →
        </button>
      </div>
    </div>
  );
};

export default ExpertSpotlight;