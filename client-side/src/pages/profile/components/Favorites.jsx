// import React, { useState } from "react";
// import { useProfileContext } from "../ProfileLayout";
// import { Heart, MapPin, Bed, Bath, Square, Trash2, Filter } from "lucide-react";

// const Favorites = () => {
//   const { user } = useProfileContext();
//   const [filter, setFilter] = useState("all");

//   const favoriteProperties = [
//     {
//       id: 1,
//       title: "Luxury 3 BHK Apartment in Bandra",
//       image:
//         "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
//       price: "₹2.5 Cr",
//       location: "Bandra West, Mumbai",
//       beds: 3,
//       baths: 2,
//       area: "1200 sq ft",
//       type: "apartment",
//       addedDate: "2024-01-15",
//     },
//     {
//       id: 2,
//       title: "Modern Villa with Garden",
//       image:
//         "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
//       price: "₹4.2 Cr",
//       location: "Pune",
//       beds: 4,
//       baths: 3,
//       area: "2400 sq ft",
//       type: "villa",
//       addedDate: "2024-01-10",
//     },
//     {
//       id: 3,
//       title: "Studio Apartment for Investment",
//       image:
//         "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//       price: "₹85 L",
//       location: "Andheri East, Mumbai",
//       beds: 1,
//       baths: 1,
//       area: "600 sq ft",
//       type: "apartment",
//       addedDate: "2024-01-08",
//     },
//   ];

//   const filteredProperties =
//     filter === "all"
//       ? favoriteProperties
//       : favoriteProperties.filter((property) => property.type === filter);

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Favorite Properties
//           </h2>
//           <p className="text-gray-600 mt-1">
//             Your saved properties for quick access
//           </p>
//         </div>

//         {/* Filter */}
//         <div className="flex items-center space-x-2 mt-4 sm:mt-0">
//           <Filter className="w-4 h-4 text-gray-400" />
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//           >
//             <option value="all">All Types</option>
//             <option value="apartment">Apartments</option>
//             <option value="villa">Villas</option>
//             <option value="house">Houses</option>
//           </select>
//         </div>
//       </div>

//       {/* Properties Grid */}
//       {filteredProperties.length === 0 ? (
//         <div className="text-center py-12">
//           <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//             No favorites yet
//           </h3>
//           <p className="text-gray-600">
//             Start saving properties you're interested in!
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProperties.map((property) => (
//             <div
//               key={property.id}
//               className="bg-white rounded border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
//             >
//               {/* Image */}
//               <div className="relative h-48">
//                 <img
//                   src={property.image}
//                   alt={property.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
//                   <Heart className="w-4 h-4 text-red-500 fill-current" />
//                 </button>
//               </div>

//               {/* Content */}
//               <div className="p-4">
//                 <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
//                   {property.title}
//                 </h3>
//                 <div className="flex items-center text-gray-600 mb-3">
//                   <MapPin className="w-4 h-4 mr-1" />
//                   <span className="text-sm">{property.location}</span>
//                 </div>

//                 {/* Property Features */}
//                 <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
//                   <div className="flex items-center">
//                     <Bed className="w-4 h-4 mr-1" />
//                     <span>{property.beds} bed</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Bath className="w-4 h-4 mr-1" />
//                     <span>{property.baths} bath</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Square className="w-4 h-4 mr-1" />
//                     <span>{property.area}</span>
//                   </div>
//                 </div>

//                 {/* Price & Actions */}
//                 <div className="flex items-center justify-between">
//                   <div className="text-lg font-bold text-blue-600">
//                     {property.price}
//                   </div>
//                   <button className="text-red-500 hover:text-red-600 transition-colors">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favorites;
import React, { useState, useEffect } from "react";
import { useProfileContext } from "../ProfileLayout";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  Trash2,
  Filter,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { wishlistService } from "../../../lib/mongo/services/wishlistService";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { user } = useProfileContext();
  const [filter, setFilter] = useState("all");
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  // Fetch wishlist properties
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await wishlistService.get();
      console.log("Wishlist response:", response);

      if (response.success && response.wishlist) {
        // Transform the wishlist data to match our component structure
        const properties = response.wishlist.map((item) => ({
          id: item.property?._id || item._id,
          wishlistId: item._id,
          title: item.property?.title || "Property",
          image:
            item.property?.images?.[0]?.url ||
            "/images/property-placeholder.jpg",
          price: item.property?.price
            ? `₹${item.property.price.toLocaleString("en-IN")}`
            : "Price on Request",
          location:
            item.property?.location?.address ||
            (typeof item.property?.location === "string"
              ? item.property.location
              : "Location not specified"),
          beds: item.property?.bedrooms || 0,
          baths: item.property?.bathrooms || 0,
          area: item.property?.area
            ? `${item.property.area} ${item.property.areaUnit || "sq ft"}`
            : "Area not specified",
          type: item.property?.type || "property",
          addedDate: item.addedAt || item.createdAt,
          property: item.property, // Keep the full property object for navigation
        }));

        setFavoriteProperties(properties);
      } else {
        setFavoriteProperties([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to load your favorite properties");
      setFavoriteProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Remove from favorites
  const removeFromFavorites = async (propertyId, wishlistId) => {
    try {
      setRemovingId(propertyId);
      await wishlistService.remove(propertyId);

      // Update local state
      setFavoriteProperties((prev) =>
        prev.filter((property) => property.id !== propertyId)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
      setError("Failed to remove property from favorites");
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const filteredProperties =
    filter === "all"
      ? favoriteProperties
      : favoriteProperties.filter((property) => property.type === filter);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Favorite Properties
            </h2>
            <p className="text-gray-600 mt-1">
              Your saved properties for quick access
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded border border-gray-200 overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-3"></div>
                <div className="flex justify-between mb-4">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-tight">
            Saved Properties
          </h2>
          <p className="text-gray-500 mt-1 font-medium text-xs tracking-widest uppercase">
            {favoriteProperties.length} {" "}
            {favoriteProperties.length === 1 ? "property" : "properties"}
          </p>
        </div>

        {/* Filter - Only show if there are properties */}
        {favoriteProperties.length > 0 && (
          <div className="flex items-center space-x-2 mt-4 sm:mt-0 bg-white p-1 sm:p-1.5 border border-blue-600 rounded-none">
            <div className="p-1.5 bg-blue-600 text-white rounded-none">
              <Filter className="w-4 h-4 sm:w-4 sm:h-4" strokeWidth={1.5} />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-blue-600 font-bold uppercase tracking-widest cursor-pointer pr-6 text-[10px] sm:text-xs"
            >
              <option value="all">All Types</option>
              <option value="apartment">Apartments</option>
              <option value="villa">Villas</option>
              <option value="house">Houses</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4 bg-white border border-gray-200 text-center">
          {favoriteProperties.length === 0 ? (
            <>
              <div className="w-16 h-16 sm:w-20 sm:h-20 border border-gray-200 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 sm:w-8 sm:h-8 text-blue-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-black uppercase tracking-tight mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-500 text-xs tracking-widest uppercase mb-8 max-w-md">
                Start saving properties you're interested in by clicking the
                heart icon on any listing!
              </p>
              <Link
                to="/property-listings"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-blue-700 transition-colors"
              >
                Browse Properties
                <ExternalLink className="w-4 h-4 ml-2" strokeWidth={1.5} />
              </Link>
            </>
          ) : (
            <>
              <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No properties match your filter
              </h3>
              <p className="text-gray-600">
                Try changing your filter criteria to see more properties.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white border border-gray-200 overflow-hidden group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0 border-b border-gray-200">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = "/images/property-placeholder.jpg";
                  }}
                />

                {/* Added Date */}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center px-2 py-1 bg-blue-600 text-white text-[10px] tracking-widest uppercase">
                    <Calendar className="w-3 h-3 mr-1.5" strokeWidth={1.5} />
                    {formatDate(property.addedDate)}
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() =>
                    removeFromFavorites(property.id, property.wishlistId)
                  }
                  disabled={removingId === property.id}
                  className="absolute top-3 right-3 p-2 bg-white border border-transparent hover:border-blue-600 transition-colors disabled:opacity-50"
                >
                  {removingId === property.id ? (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <Link
                  to={`/property-details/${
                    property.property?.slug || property.id
                  }`}
                  className="block hover:no-underline"
                >
                  <h3 className="font-bold text-sm sm:text-base text-black uppercase tracking-tight mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                </Link>

                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" strokeWidth={1.5} />
                  <span className="text-xs uppercase tracking-widest truncate">{property.location}</span>
                </div>

                {/* Property Features */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-6 border border-gray-100 p-3 font-bold uppercase tracking-widest mt-auto">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-2 text-blue-600" strokeWidth={1.5} />
                    <span>{property.beds}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-2 text-blue-600" strokeWidth={1.5} />
                    <span>{property.baths}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-2 text-blue-600" strokeWidth={1.5} />
                    <span className="truncate">{property.area}</span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-base sm:text-lg font-extrabold text-black">
                    {property.price}
                  </div>
                  <Link
                    to={`/property/${property.property?.slug || property.id}`}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white text-[10px] uppercase tracking-widest font-bold hover:bg-blue-700 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;