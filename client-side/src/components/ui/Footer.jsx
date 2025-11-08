// import React, { useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import Icon from "../AppIcon";

// const Footer = React.memo(() => {
//   const navigate = useNavigate();

//   // Memoize navigation handlers
//   const footerNavigation = useMemo(
//     () => ({
//       home: () => navigate("/home-page"),
//       properties: () => navigate("/property-listings"),
//       dashboard: () => navigate("/admin/dashboard"),
//     }),
//     [navigate]
//   );

//   const socialLinks = useMemo(() => ["Facebook", "Twitter", "Instagram"], []);

//   const quickLinks = useMemo(
//     () => [
//       { label: "Home", handler: footerNavigation.home },
//       { label: "Properties", handler: footerNavigation.properties },
//       { label: "Dashboard", handler: footerNavigation.dashboard },
//     ],
//     [footerNavigation]
//   );

//   const supportLinks = useMemo(
//     () => ["Help Center", "Contact Us", "Privacy Policy"],
//     []
//   );

//   return (
//     <footer className="bg-card border-t border-border mt-16">
//       <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="md:col-span-2">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
//                 <Icon name="Home" size={24} color="white" />
//               </div>
//               <span className="text-xl font-semibold text-foreground">
//                 RealConnect
//               </span>
//             </div>
//             <p className="text-muted-foreground mb-4 max-w-md">
//               Comprehensive real estate management platform for brokers,
//               employees, and buyers. Find your dream property with our advanced
//               search and AI-powered recommendations.
//             </p>
//             <div className="flex space-x-4">
//               {socialLinks.map((social) => (
//                 <button
//                   key={social}
//                   className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-smooth hover:scale-105"
//                 >
//                   <Icon
//                     name={social}
//                     size={20}
//                     className="text-muted-foreground hover:text-foreground"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="font-semibold text-foreground mb-4 text-lg">
//               Quick Links
//             </h3>
//             <div className="space-y-3">
//               {quickLinks.map((link) => (
//                 <button
//                   key={link.label}
//                   onClick={link.handler}
//                   className="block text-muted-foreground hover:text-foreground transition-smooth w-full text-left hover:translate-x-1 transform duration-200"
//                 >
//                   {link.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="font-semibold text-foreground mb-4 text-lg">
//               Support
//             </h3>
//             <div className="space-y-3">
//               {supportLinks.map((item) => (
//                 <a
//                   key={item}
//                   href="#"
//                   className="block text-muted-foreground hover:text-foreground transition-smooth hover:translate-x-1 transform duration-200"
//                 >
//                   {item}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-border mt-8 pt-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div className="text-center md:text-left mb-4 md:mb-0">
//               <p className="text-muted-foreground text-sm">
//                 &copy; {new Date().getFullYear()} RealConnect. All rights
//                 reserved.
//               </p>
//             </div>
//             <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-muted-foreground">
//               <a href="#" className="hover:text-foreground transition-smooth">
//                 Terms of Service
//               </a>
//               <a href="#" className="hover:text-foreground transition-smooth">
//                 Privacy Policy
//               </a>
//               <a href="#" className="hover:text-foreground transition-smooth">
//                 Cookie Policy
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// });

// Footer.displayName = "Footer";

// export default Footer;
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../AppIcon";

const Footer = React.memo(() => {
  const navigate = useNavigate();

  // Memoize navigation handlers
  const footerNavigation = useMemo(
    () => ({
      home: () => navigate("/home-page"),
      properties: () => navigate("/property-listings"),
      dashboard: () => navigate("/admin/dashboard"),
    }),
    [navigate]
  );

  const socialLinks = useMemo(() => ["Facebook", "Twitter", "Instagram"], []);

  const quickLinks = useMemo(
    () => [
      { label: "Home", handler: footerNavigation.home },
      { label: "Properties", handler: footerNavigation.properties },
      { label: "Dashboard", handler: footerNavigation.dashboard },
    ],
    [footerNavigation]
  );

  const supportLinks = useMemo(
    () => ["Help Center", "Contact Us", "Privacy Policy"],
    []
  );

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Icon name="Home" size={24} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Makaan4U
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your trusted partner in finding the perfect property. Makaan4U
              offers comprehensive real estate solutions with advanced search,
              AI-powered recommendations, and seamless property management for
              buyers, sellers, and agents.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social}
                  className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-smooth hover:scale-105"
                >
                  <Icon
                    name={social}
                    size={20}
                    className="text-muted-foreground hover:text-foreground"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-lg">
              Quick Links
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.handler}
                  className="block text-muted-foreground hover:text-foreground transition-smooth w-full text-left hover:translate-x-1 transform duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-lg">
              Support
            </h3>
            <div className="space-y-3">
              {supportLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-muted-foreground hover:text-foreground transition-smooth hover:translate-x-1 transform duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-muted-foreground text-sm">
                &copy; {new Date().getFullYear()} Makaan4U. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-smooth">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;