// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import Icon from "../AppIcon";

// const BreadcrumbTrail = ({
//   customBreadcrumbs = null,
//   user = null,
//   propertyData = null,
//   hideOnPages = ["/", "/login", "/register"],
// }) => {
//   const location = useLocation();

//   const routeMap = {
//     "/": "Home",
//     "/login": "Sign In",
//     "/register": "Register",
//     "/properties": "Properties",
//     "/property-listings": "Properties",
//     "/favorites": "My Favorites",
//     "/profile": user ? `${user.firstName}'s Profile` : "Profile",
//     "/home-page": "Home",
//     // Add more routes as needed
//   };

//   const generateBreadcrumbs = () => {
//     if (customBreadcrumbs) {
//       return customBreadcrumbs;
//     }

//     const pathSegments = location?.pathname
//       ?.split("/")
//       ?.filter((segment) => segment);

//     const breadcrumbs = [
//       {
//         label: "Home",
//         path: "/",
//         position: 1,
//       },
//     ];

//     let currentPath = "";

//     pathSegments?.forEach((segment, index) => {
//       currentPath += `/${segment}`;

//       // 🔥 FIX: Handle property-details route specially
//       if (segment === "property-details" && pathSegments[index + 1]) {
//         // Skip adding "property-details" as a breadcrumb
//         // Instead, add "Properties" breadcrumb
//         breadcrumbs.push({
//           label: "Properties",
//           path: "/property-listings", // Link back to property listings
//           isLast: false,
//           position: index + 2,
//         });
//         return; // Skip to next iteration
//       }

//       // Enhanced label generation
//       let label = routeMap?.[currentPath];

//       if (!label) {
//         // Handle property name (the slug after property-details)
//         if (
//           propertyData &&
//           propertyData.title &&
//           index === pathSegments.length - 1
//         ) {
//           label = propertyData.title;
//         } else {
//           label =
//             segment?.charAt(0)?.toUpperCase() +
//             segment?.slice(1)?.replace(/-/g, " ");
//         }
//       }

//       breadcrumbs.push({
//         label,
//         path: currentPath,
//         isLast: index === pathSegments?.length - 1,
//         position: index + 2,
//       });
//     });

//     return breadcrumbs;
//   };

//   const breadcrumbs = generateBreadcrumbs();

//   // Generate structured data for SEO
//   const generateBreadcrumbSchema = () => {
//     const schema = {
//       "@context": "https://schema.org",
//       "@type": "BreadcrumbList",
//       itemListElement: breadcrumbs.map((crumb, index) => ({
//         "@type": "ListItem",
//         position: crumb.position || index + 1,
//         name: crumb.label,
//         item: `${window.location.origin}${crumb.path}`,
//       })),
//     };

//     // Enhanced schema for property pages
//     if (propertyData && location.pathname.includes("/property-details/")) {
//       schema.itemListElement = breadcrumbs.map((crumb, index) => ({
//         "@type": "ListItem",
//         position: index + 1,
//         name: crumb.label,
//         item: `${window.location.origin}${crumb.path}`,
//         // Add additional context for property pages
//         ...(crumb.isLast && {
//           additionalProperty: {
//             "@type": "PropertyValue",
//             name: "propertyType",
//             value: propertyData.type,
//           },
//         }),
//       }));
//     }

//     return schema;
//   };

//   // Don't show breadcrumbs on specified pages
//   if (hideOnPages.includes(location?.pathname)) {
//     return null;
//   }

//   // Generate microdata for individual breadcrumb items
//   const getBreadcrumbMicrodata = (crumb, index) => {
//     return {
//       itemScope: true,
//       itemType: "https://schema.org/ListItem",
//       itemProp: "itemListElement",
//     };
//   };

//   return (
//     <>
//       {/* 🔥 SEO: Structured Data */}
//       <Helmet>
//         <script type="application/ld+json">
//           {JSON.stringify(generateBreadcrumbSchema())}
//         </script>
//       </Helmet>

//       <nav
//         className="flex items-center space-x-2 text-sm text-text-secondary mb-6"
//         aria-label="Breadcrumb"
//         itemScope
//         itemType="https://schema.org/BreadcrumbList"
//       >
//         <ol className="flex items-center space-x-2 flex-wrap">
//           {breadcrumbs?.map((crumb, index) => (
//             <li
//               key={crumb?.path}
//               className="flex items-center"
//               {...getBreadcrumbMicrodata(crumb, index)}
//             >
//               {index > 0 && (
//                 <Icon
//                   name="ChevronRight"
//                   size={16}
//                   className="mx-2 text-text-secondary"
//                   aria-hidden="true"
//                 />
//               )}

//               {crumb?.isLast ? (
//                 <span
//                   className="text-text-primary font-medium"
//                   aria-current="page"
//                   itemProp="name"
//                 >
//                   {crumb?.label}
//                 </span>
//               ) : (
//                 <Link
//                   to={crumb?.path}
//                   className="hover:text-primary transition-colors duration-200"
//                   itemProp="item"
//                 >
//                   <span itemProp="name">{crumb?.label}</span>
//                 </Link>
//               )}

//               {/* Hidden meta for structured data */}
//               <meta itemProp="position" content={crumb.position || index + 1} />
//             </li>
//           ))}
//         </ol>

//         {/* Mobile Back Button */}
//         <div className="ml-auto md:hidden">
//           <button
//             onClick={() => window.history?.back()}
//             className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors duration-200"
//             aria-label="Go back to previous page"
//           >
//             <Icon name="ArrowLeft" size={16} aria-hidden="true" />
//             <span>Back</span>
//           </button>
//         </div>
//       </nav>

//       {/* 🔥 SEO: Hidden but accessible breadcrumb description for screen readers */}
//       <div className="sr-only" aria-live="polite">
//         <p>
//           You are here: {breadcrumbs.map((crumb) => crumb.label).join(" > ")}
//         </p>
//       </div>
//     </>
//   );
// };

// export default React.memo(BreadcrumbTrail);

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Icon from "../AppIcon";

const BreadcrumbTrail = ({
  customBreadcrumbs = null,
  user = null,
  propertyData = null,
  hideOnPages = ["/", "/login", "/register"],
}) => {
  const location = useLocation();

  const routeMap = {
    "/": "Home",
    "/login": "Sign In",
    "/register": "Register",
    "/properties": "Properties",
    "/property-listings": "Properties",
    "/favorites": "My Favorites",
    "/profile": user ? `${user.firstName}'s Profile` : "Profile",
    "/home-page": "Home",
    // Add more routes as needed
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname
      ?.split("/")
      ?.filter((segment) => segment);

    const breadcrumbs = [
      {
        label: "Home",
        path: "/",
        position: 1,
      },
    ];

    let currentPath = "";

    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // 🔥 FIX: Handle property-details route specially
      if (segment === "property-details" && pathSegments[index + 1]) {
        // Skip adding "property-details" as a breadcrumb
        // Instead, add "Properties" breadcrumb
        breadcrumbs.push({
          label: "Properties",
          path: "/property-listings", // Link back to property listings
          isLast: false,
          position: index + 2,
        });
        return; // Skip to next iteration
      }

      // Enhanced label generation
      let label = routeMap?.[currentPath];

      if (!label) {
        // Handle property name (the slug after property-details)
        if (
          propertyData &&
          propertyData.title &&
          index === pathSegments.length - 1
        ) {
          label = propertyData.title;
        } else {
          label =
            segment?.charAt(0)?.toUpperCase() +
            segment?.slice(1)?.replace(/-/g, " ");
        }
      }

      breadcrumbs.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1,
        position: index + 2,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Generate structured data for SEO
  const generateBreadcrumbSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: crumb.position || index + 1,
        name: crumb.label,
        item: `${window.location.origin}${crumb.path}`,
      })),
    };

    // Enhanced schema for property pages
    if (propertyData && location.pathname.includes("/property-details/")) {
      schema.itemListElement = breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        item: `${window.location.origin}${crumb.path}`,
        // Add additional context for property pages
        ...(crumb.isLast && {
          additionalProperty: {
            "@type": "PropertyValue",
            name: "propertyType",
            value: propertyData.type,
          },
        }),
      }));
    }

    return schema;
  };

  // Don't show breadcrumbs on specified pages
  if (hideOnPages.includes(location?.pathname)) {
    return null;
  }

  // Generate microdata for individual breadcrumb items
  const getBreadcrumbMicrodata = (crumb, index) => {
    return {
      itemScope: true,
      itemType: "https://schema.org/ListItem",
      itemProp: "itemListElement",
    };
  };

  // Truncate long breadcrumb labels for mobile
  const truncateLabel = (label, maxLength = 20) => {
    if (typeof label !== "string") return label;
    return label.length > maxLength
      ? `${label.substring(0, maxLength)}...`
      : label;
  };

  // Responsive breadcrumb display logic
  const getDisplayBreadcrumbs = () => {
    if (breadcrumbs.length <= 3) {
      return breadcrumbs; // Show all if 3 or fewer items
    }

    // For mobile: show first, last, and ellipsis
    return [
      breadcrumbs[0], // First item (Home)
      { label: "...", path: null, isLast: false, position: 2 }, // Ellipsis
      ...breadcrumbs.slice(-2), // Last two items
    ];
  };

  return (
    <>
      {/* 🔥 SEO: Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema())}
        </script>
      </Helmet>

      {/* Desktop Breadcrumb */}
      <nav
        className="hidden md:flex items-center space-x-2 text-sm text-text-secondary mb-4 lg:mb-6"
        aria-label="Breadcrumb"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol className="flex items-center space-x-2 flex-wrap">
          {breadcrumbs?.map((crumb, index) => (
            <li
              key={`desktop-${crumb?.path}-${index}`}
              className="flex items-center"
              {...getBreadcrumbMicrodata(crumb, index)}
            >
              {index > 0 && (
                <Icon
                  name="ChevronRight"
                  size={16}
                  className="mx-2 text-text-secondary flex-shrink-0"
                  aria-hidden="true"
                />
              )}

              {crumb?.isLast ? (
                <span
                  className="text-text-primary font-medium whitespace-nowrap max-w-[200px] lg:max-w-none truncate"
                  aria-current="page"
                  itemProp="name"
                >
                  {crumb?.label}
                </span>
              ) : (
                <Link
                  to={crumb?.path}
                  className="hover:text-primary transition-colors duration-200 whitespace-nowrap max-w-[150px] lg:max-w-none truncate"
                  itemProp="item"
                >
                  <span itemProp="name">{crumb?.label}</span>
                </Link>
              )}

              {/* Hidden meta for structured data */}
              <meta itemProp="position" content={crumb.position || index + 1} />
            </li>
          ))}
        </ol>
      </nav>

      {/* Mobile Breadcrumb */}
      <nav
        className="md:hidden flex items-center justify-between mb-4"
        aria-label="Breadcrumb"
      >
        <div className="flex items-center space-x-1 flex-1 min-w-0">
          <ol className="flex items-center space-x-1 text-xs flex-1 min-w-0">
            {getDisplayBreadcrumbs()?.map((crumb, index, array) => (
              <li
                key={`mobile-${crumb?.path}-${index}`}
                className="flex items-center flex-shrink-0"
              >
                {index > 0 && (
                  <Icon
                    name="ChevronRight"
                    size={12}
                    className="mx-1 text-text-secondary flex-shrink-0"
                    aria-hidden="true"
                  />
                )}

                {crumb?.path === null ? (
                  // Ellipsis for truncated items
                  <span className="text-text-secondary px-1">...</span>
                ) : crumb?.isLast ? (
                  <span
                    className="text-text-primary font-medium truncate max-w-[120px]"
                    aria-current="page"
                  >
                    {truncateLabel(crumb?.label, 15)}
                  </span>
                ) : (
                  <Link
                    to={crumb?.path}
                    className="hover:text-primary transition-colors duration-200 truncate max-w-[80px]"
                  >
                    {truncateLabel(crumb?.label, 12)}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile Back Button */}
        <button
          onClick={() => window.history?.back()}
          className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors duration-200 ml-2 pl-2 border-l border-gray-200 flex-shrink-0"
          aria-label="Go back to previous page"
        >
          <Icon name="ArrowLeft" size={14} aria-hidden="true" />
          <span className="text-xs hidden xs:inline">Back</span>
        </button>
      </nav>

      {/* 🔥 SEO: Hidden but accessible breadcrumb description for screen readers */}
      <div className="sr-only" aria-live="polite">
        <p>
          You are here: {breadcrumbs.map((crumb) => crumb.label).join(" > ")}
        </p>
      </div>
    </>
  );
};

export default React.memo(BreadcrumbTrail);