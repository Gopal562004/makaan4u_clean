// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Home,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Youtube,
//   Phone,
//   Mail,
//   MapPin,
//   ArrowRight,
// } from "lucide-react";
// import Button from "../../../components/ui/Button";
// import Input from "../../../components/ui/Input";

// const Footer = () => {
//   const navigate = useNavigate();
//   const [currentLanguage, setCurrentLanguage] = useState("en");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("language") || "en";
//     setCurrentLanguage(savedLanguage);
//   }, []);

//   const content = {
//     en: {
//       tagline: "Your trusted partner in premium real estate",
//       quickLinks: "Quick Links",
//       services: "Services",
//       support: "Support",
//       newsletter: "Newsletter",
//       emailPlaceholder: "Your email",
//       subscribe: "Subscribe",
//       copyright: "All rights reserved.",
//       links: {
//         home: "Home",
//         properties: "Properties",
//         aboutUs: "About Us",
//         contactUs: "Contact Us",
//         careers: "Careers",
//         blog: "Blog",
//       },
//       servicesList: {
//         buying: "Buying",
//         selling: "Selling",
//         renting: "Renting",
//         investment: "Investment",
//         valuation: "Valuation",
//         legal: "Legal",
//       },
//       supportList: {
//         help: "Help Center",
//         faq: "FAQ",
//         privacy: "Privacy",
//         terms: "Terms",
//         feedback: "Feedback",
//         complaints: "Complaints",
//       },
//     },
//     hi: {
//       tagline: "प्रीमियम रियल एस्टेट में आपका विश्वसनीय साझीदार",
//       quickLinks: "त्वरित लिंक",
//       services: "सेवाएं",
//       support: "सहायता",
//       newsletter: "न्यूज़लेटर",
//       emailPlaceholder: "आपका ईमेल",
//       subscribe: "सब्सक्राइब करें",
//       copyright: "सभी अधिकार सुरक्षित।",
//       links: {
//         home: "होम",
//         properties: "संपत्तियां",
//         aboutUs: "हमारे बारे में",
//         contactUs: "संपर्क करें",
//         careers: "करियर",
//         blog: "ब्लॉग",
//       },
//       servicesList: {
//         buying: "खरीदना",
//         selling: "बेचना",
//         renting: "किराया",
//         investment: "निवेश",
//         valuation: "मूल्यांकन",
//         legal: "कानूनी",
//       },
//       supportList: {
//         help: "सहायता केंद्र",
//         faq: "FAQ",
//         privacy: "गोपनीयता",
//         terms: "शर्तें",
//         feedback: "फीडबैक",
//         complaints: "शिकायतें",
//       },
//     },
//     mr: {
//       tagline: "प्रीमियम रिअल इस्टेटमध्ये तुमचा विश्वसनीय भागीदार",
//       quickLinks: "द्रुत दुवे",
//       services: "सेवा",
//       support: "समर्थन",
//       newsletter: "वृत्तपत्र",
//       emailPlaceholder: "तुमचा ईमेल",
//       subscribe: "सबस्क्राइब करा",
//       copyright: "सर्व हक्क राखीव.",
//       links: {
//         home: "होम",
//         properties: "मालमत्ता",
//         aboutUs: "आमच्याबद्दल",
//         contactUs: "संपर्क साधा",
//         careers: "करिअर",
//         blog: "ब्लॉग",
//       },
//       servicesList: {
//         buying: "खरेदी",
//         selling: "विक्री",
//         renting: "भाडे",
//         investment: "गुंतवणूक",
//         valuation: "मूल्यांकन",
//         legal: "कायदेशीर",
//       },
//       supportList: {
//         help: "मदत केंद्र",
//         faq: "FAQ",
//         privacy: "गोपनीयता",
//         terms: "अटी",
//         feedback: "फीडबॅक",
//         complaints: "तक्रारी",
//       },
//     },
//   };

//   const t = content?.[currentLanguage] || content?.en;

//   const handleNewsletterSubmit = (e) => {
//     e?.preventDefault();
//     if (email?.trim()) {
//       alert("Thank you for subscribing!");
//       setEmail("");
//     }
//   };

//   const socialLinks = [
//     { icon: Facebook, url: "#" },
//     { icon: Twitter, url: "#" },
//     { icon: Instagram, url: "#" },
//     { icon: Linkedin, url: "#" },
//     { icon: Youtube, url: "#" },
//   ];

//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-slate-900 text-white">
//       {/* Main Footer - Compact */}
//       <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//           {/* Company Info */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center space-x-2 mb-3">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <Home size={16} color="white" />
//               </div>
//               <span className="text-lg font-bold">RealConnect</span>
//             </div>
//             <p className="text-slate-300 text-xs mb-4">{t?.tagline}</p>

//             {/* Newsletter */}
//             <div className="mb-4">
//               <h4 className="text-sm font-semibold mb-2">{t?.newsletter}</h4>
//               <form
//                 onSubmit={handleNewsletterSubmit}
//                 className="flex space-x-2"
//               >
//                 <Input
//                   type="email"
//                   placeholder={t?.emailPlaceholder}
//                   value={email}
//                   onChange={(e) => setEmail(e?.target?.value)}
//                   className="flex-1 bg-slate-800 border-slate-600 text-white text-xs h-8"
//                 />
//                 <Button
//                   type="submit"
//                   size="sm"
//                   className="bg-blue-600 hover:bg-blue-700 h-8 px-3 text-xs"
//                 >
//                   <ArrowRight size={12} />
//                 </Button>
//               </form>
//             </div>

//             {/* Social Links */}
//             <div>
//               <div className="flex space-x-2">
//                 {socialLinks.map((social, index) => (
//                   <a
//                     key={index}
//                     href={social.url}
//                     className="w-7 h-7 bg-slate-800 hover:bg-slate-700 rounded flex items-center justify-center transition-colors"
//                   >
//                     <social.icon size={14} className="text-slate-300" />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-sm font-semibold mb-3">{t?.quickLinks}</h4>
//             <ul className="space-y-1 text-xs">
//               {Object.values(t?.links || {}).map((link, index) => (
//                 <li key={index}>
//                   <button className="text-slate-300 hover:text-white transition-colors">
//                     {link}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Services */}
//           <div>
//             <h4 className="text-sm font-semibold mb-3">{t?.services}</h4>
//             <ul className="space-y-1 text-xs">
//               {Object.values(t?.servicesList || {}).map((service, index) => (
//                 <li key={index}>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white transition-colors"
//                   >
//                     {service}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h4 className="text-sm font-semibold mb-3">{t?.support}</h4>
//             <ul className="space-y-1 text-xs">
//               {Object.values(t?.supportList || {}).map((support, index) => (
//                 <li key={index}>
//                   <a
//                     href="#"
//                     className="text-slate-300 hover:text-white transition-colors"
//                   >
//                     {support}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar - Compact */}
//       <div className="border-t border-slate-700">
//         <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
//           <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
//             <div className="text-slate-400 text-xs">
//               © {currentYear} RealConnect. {t?.copyright}
//             </div>

//             <div className="flex items-center space-x-4 text-xs text-slate-400">
//               <div className="flex items-center space-x-1">
//                 <Phone size={12} />
//                 <span>+91 98765 43210</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Mail size={12} />
//                 <span>info@realconnect.com</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <MapPin size={12} />
//                 <span>Mumbai</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

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
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const Footer = () => {
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
      services: "Services",
      support: "Support",
      newsletter: "Newsletter",
      emailPlaceholder: "Your email",
      subscribe: "Subscribe",
      copyright: "All rights reserved.",
      links: {
        home: "Home",
        properties: "Properties",
        aboutUs: "About Us",
        contactUs: "Contact Us",
        careers: "Careers",
        blog: "Blog",
      },
      servicesList: {
        buying: "Buying",
        selling: "Selling",
        renting: "Renting",
        investment: "Investment",
        valuation: "Valuation",
        legal: "Legal",
      },
      supportList: {
        help: "Help Center",
        faq: "FAQ",
        privacy: "Privacy",
        terms: "Terms",
        feedback: "Feedback",
        complaints: "Complaints",
      },
    },
    hi: {
      tagline: "प्रीमियम रियल एस्टेट में आपका विश्वसनीय साझीदार",
      quickLinks: "त्वरित लिंक",
      services: "सेवाएं",
      support: "सहायता",
      newsletter: "न्यूज़लेटर",
      emailPlaceholder: "आपका ईमेल",
      subscribe: "सब्सक्राइब करें",
      copyright: "सभी अधिकार सुरक्षित।",
      links: {
        home: "होम",
        properties: "संपत्तियां",
        aboutUs: "हमारे बारे में",
        contactUs: "संपर्क करें",
        careers: "करियर",
        blog: "ब्लॉग",
      },
      servicesList: {
        buying: "खरीदना",
        selling: "बेचना",
        renting: "किराया",
        investment: "निवेश",
        valuation: "मूल्यांकन",
        legal: "कानूनी",
      },
      supportList: {
        help: "सहायता केंद्र",
        faq: "FAQ",
        privacy: "गोपनीयता",
        terms: "शर्तें",
        feedback: "फीडबैक",
        complaints: "शिकायतें",
      },
    },
    mr: {
      tagline: "प्रीमियम रिअल इस्टेटमध्ये तुमचा विश्वसनीय भागीदार",
      quickLinks: "द्रुत दुवे",
      services: "सेवा",
      support: "समर्थन",
      newsletter: "वृत्तपत्र",
      emailPlaceholder: "तुमचा ईमेल",
      subscribe: "सबस्क्राइब करा",
      copyright: "सर्व हक्क राखीव.",
      links: {
        home: "होम",
        properties: "मालमत्ता",
        aboutUs: "आमच्याबद्दल",
        contactUs: "संपर्क साधा",
        careers: "करिअर",
        blog: "ब्लॉग",
      },
      servicesList: {
        buying: "खरेदी",
        selling: "विक्री",
        renting: "भाडे",
        investment: "गुंतवणूक",
        valuation: "मूल्यांकन",
        legal: "कायदेशीर",
      },
      supportList: {
        help: "मदत केंद्र",
        faq: "FAQ",
        privacy: "गोपनीयता",
        terms: "अटी",
        feedback: "फीडबॅक",
        complaints: "तक्रारी",
      },
    },
  };

  const t = content?.[currentLanguage] || content?.en;

  const handleNewsletterSubmit = (e) => {
    e?.preventDefault();
    if (email?.trim()) {
      alert("Thank you for subscribing!");
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
    <footer className="bg-slate-900 text-white">
      {/* Main Footer - Compact */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Home size={16} color="white" />
              </div>
              <span className="text-lg font-bold">Makaan4U</span>
            </div>
            <p className="text-slate-300 text-xs mb-4">{t?.tagline}</p>

            {/* Newsletter */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">{t?.newsletter}</h4>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex space-x-2"
              >
                <Input
                  type="email"
                  placeholder={t?.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  className="flex-1 bg-slate-800 border-slate-600 text-white text-xs h-8"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 h-8 px-3 text-xs"
                >
                  <ArrowRight size={12} />
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <div className="flex space-x-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-7 h-7 bg-slate-800 hover:bg-slate-700 rounded flex items-center justify-center transition-colors"
                  >
                    <social.icon size={14} className="text-slate-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3">{t?.quickLinks}</h4>
            <ul className="space-y-1 text-xs">
              {Object.values(t?.links || {}).map((link, index) => (
                <li key={index}>
                  <button className="text-slate-300 hover:text-white transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-3">{t?.services}</h4>
            <ul className="space-y-1 text-xs">
              {Object.values(t?.servicesList || {}).map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold mb-3">{t?.support}</h4>
            <ul className="space-y-1 text-xs">
              {Object.values(t?.supportList || {}).map((support, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {support}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Compact */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="text-slate-400 text-xs">
              © {currentYear} Makaan4U. {t?.copyright}
            </div>

            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <div className="flex items-center space-x-1">
                <Phone size={12} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail size={12} />
                <span>info@makaan4u.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin size={12} />
                <span>Mumbai</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;