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
//               <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
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
//                   className="w-10 h-10 bg-muted hover:bg-muted/80 rounded flex items-center justify-center transition-smooth hover:scale-105"
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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { toast } from "react-toastify";

const Footer = ({ className = "" }) => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

  const content = {
    en: {
      tagline: "Your trusted partner in premium real estate",
      quickLinks: "Quick Links",
      newsletter: "Newsletter",
      emailPlaceholder: "Your email",
      subscribe: "Subscribe",
      copyright: "All rights reserved.",
      links: [
        { label: "Home", path: "/home-page" },
        { label: "Properties", path: "/property-listings" },
        { label: "About Us", path: "/about" },
        { label: "Blog", path: "/blog" },
      ],
    },
    hi: {
      tagline: "प्रीमियम रियल एस्टेट में आपका विश्वसनीय साझीदार",
      quickLinks: "त्वरित लिंक",
      newsletter: "न्यूज़लेटर",
      emailPlaceholder: "आपका ईमेल",
      subscribe: "सब्सक्राइब करें",
      copyright: "सभी अधिकार सुरक्षित।",
      links: [
        { label: "होम", path: "/home-page" },
        { label: "संपत्तियां", path: "/property-listings" },
        { label: "हमारे बारे में", path: "/about" },
        { label: "ब्लॉग", path: "/blog" },
      ],
    },
    mr: {
      tagline: "प्रीमियम रिअल इस्टेटमध्ये तुमचा विश्वसनीय भागीदार",
      quickLinks: "द्रुत दुवे",
      newsletter: "वृत्तपत्र",
      emailPlaceholder: "तुमचा ईमेल",
      subscribe: "सबस्क्राइब करा",
      copyright: "सर्व हक्क राखीव.",
      links: [
        { label: "होम", path: "/home-page" },
        { label: "मालमत्ता", path: "/property-listings" },
        { label: "आमच्याबद्दल", path: "/about" },
        { label: "ब्लॉग", path: "/blog" },
      ],
    },
  };

  const t = content?.[currentLanguage] || content?.en;

  const handleNewsletterSubmit = (e) => {
    e?.preventDefault();
    if (email?.trim()) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  const socialLinks = [
    { icon: Facebook, url: "#" },
    { icon: Twitter, url: "#" },
    { icon: Instagram, url: "#" },
    { icon: Linkedin, url: "#" },
    { icon: Youtube, url: "#" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gray-950 border-t border-gray-900 ${className}`}>
      {/* Main Footer - Compact */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 pr-4">
            <div className="flex items-center space-x-2 mb-4">
              <Logo className="w-8 h-8 drop-shadow-md text-white" />
              <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 whitespace-nowrap tracking-tight">
                Makaan4U
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light">{t?.tagline}</p>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3 tracking-wide">{t?.newsletter}</h4>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex space-x-2"
              >
                <Input
                  type="email"
                  placeholder={t?.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  className="flex-1 bg-gray-900 border-gray-800 text-white placeholder-gray-500 text-sm h-10 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none shadow-md h-10 px-4 rounded-md text-sm font-bold text-white transition-all duration-300"
                >
                  <ArrowRight size={16} className="mr-1 hidden sm:block" />
                  {t?.subscribe}
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-9 h-9 bg-gray-900 border border-gray-800 hover:border-blue-500/50 hover:bg-blue-900/20 rounded-md flex items-center justify-center transition-all duration-300 group"
                  >
                    <social.icon size={16} className="text-gray-500 group-hover:text-blue-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">{t?.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              {t?.links?.map((link, index) => (
                <li key={index}>
                  <button onClick={() => navigate(link.path)} className="text-gray-400 hover:text-blue-400 transition-colors font-light text-left w-full sm:w-auto">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Compact */}
      <div className="border-t border-gray-900 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            <div className="text-gray-500 text-sm font-light">
              © {currentYear} Makaan4U. {t?.copyright}
            </div>

            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-gray-500 font-light">
              <div className="flex items-center space-x-1.5 hover:text-blue-400 transition-colors cursor-pointer">
                <Phone size={14} />
                <span>+91 8237742040</span>
              </div>
              <div className="flex items-center space-x-1.5 hover:text-blue-400 transition-colors cursor-pointer">
                <Mail size={14} />
                <span>info@makaan4u.com</span>
              </div>
              <div className="flex items-center space-x-1.5 hover:text-blue-400 transition-colors cursor-pointer">
                <MapPin size={14} />
                <span>Mumbai, IN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;