// // import React, { useState } from "react";
// // import Icon from "../../../components/AppIcon";
// // import Button from "../../../components/ui/Button";

// // const PropertyActions = ({
// //   property,
// //   onScheduleViewing,
// //   onWhatsAppContact,
// // }) => {
// //   const [isWishlisted, setIsWishlisted] = useState(false);
// //   const [isSharing, setIsSharing] = useState(false);

// //   const handleWishlist = () => {
// //     setIsWishlisted(!isWishlisted);
// //     // Here you would typically make an API call to add/remove from wishlist
// //   };

// //   const handleShare = async () => {
// //     setIsSharing(true);

// //     if (navigator.share) {
// //       try {
// //         await navigator.share({
// //           title: property?.title,
// //           text: `Check out this amazing property: ${property?.title}`,
// //           url: window.location?.href,
// //         });
// //       } catch (error) {
// //         console.log("Error sharing:", error);
// //       }
// //     } else {
// //       // Fallback: copy to clipboard
// //       try {
// //         await navigator.clipboard?.writeText(window.location?.href);
// //         alert("Property link copied to clipboard!");
// //       } catch (error) {
// //         console.log("Error copying to clipboard:", error);
// //       }
// //     }

// //     setIsSharing(false);
// //   };

// //   const handleDownloadBrochure = () => {
// //     // Simulate brochure download
// //     const link = document.createElement("a");
// //     link.href = "#"; // In real app, this would be the brochure URL
// //     link.download = `${property?.title?.replace(/\s+/g, "_")}_Brochure.pdf`;
// //     document.body?.appendChild(link);
// //     link?.click();
// //     document.body?.removeChild(link);
// //     alert("Brochure download started!");
// //   };

// //   const handleCalculateEMI = () => {
// //     // Navigate to EMI calculator or open modal
// //     alert("EMI Calculator feature coming soon!");
// //   };

// //   return (
// //     <div className="space-y-4">
// //       {/* Primary Actions */}
// //       <div className="grid grid-cols-2 gap-3">
// //         <Button
// //           variant="default"
// //           fullWidth
// //           iconName="Calendar"
// //           iconPosition="left"
// //           onClick={onScheduleViewing}
// //         >
// //           Schedule Viewing
// //         </Button>

// //         <Button
// //           variant="outline"
// //           fullWidth
// //           iconName="MessageCircle"
// //           iconPosition="left"
// //           onClick={onWhatsAppContact}
// //         >
// //           WhatsApp
// //         </Button>
// //       </div>
// //       {/* Secondary Actions */}
// //       <div className="grid grid-cols-4 gap-2">
// //         <Button
// //           variant="ghost"
// //           size="icon"
// //           onClick={handleWishlist}
// //           className={isWishlisted ? "text-error" : ""}
// //         >
// //           <Icon
// //             name="Heart"
// //             size={20}
// //             className={isWishlisted ? "fill-current" : ""}
// //           />
// //         </Button>

// //         <Button
// //           variant="ghost"
// //           size="icon"
// //           onClick={handleShare}
// //           loading={isSharing}
// //         >
// //           <Icon name="Share2" size={20} />
// //         </Button>

// //         <Button variant="ghost" size="icon" onClick={handleDownloadBrochure}>
// //           <Icon name="Download" size={20} />
// //         </Button>

// //         <Button variant="ghost" size="icon" onClick={handleCalculateEMI}>
// //           <Icon name="Calculator" size={20} />
// //         </Button>
// //       </div>
// //       {/* Action Labels */}
// //       <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground text-center">
// //         <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
// //         <span>Share</span>
// //         <span>Brochure</span>
// //         <span>EMI Calculator</span>
// //       </div>
// //       {/* Property Status Alert */}
// //       {property?.status !== "available" && (
// //         <div
// //           className={`p-3 rounded-lg border ${
// //             property?.status === "sold"
// //               ? "bg-error/10 border-error/20 text-error"
// //               : "bg-warning/10 border-warning/20 text-warning"
// //           }`}
// //         >
// //           <div className="flex items-center space-x-2">
// //             <Icon
// //               name={property?.status === "sold" ? "AlertCircle" : "Clock"}
// //               size={16}
// //             />
// //             <span className="text-sm font-medium">
// //               {property?.status === "sold"
// //                 ? "This property has been sold"
// //                 : "This property is under contract"}
// //             </span>
// //           </div>
// //         </div>
// //       )}
// //       {/* Contact Disclaimer */}
// //       <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded-lg">
// //         <p>
// //           By contacting the agent, you agree to our terms of service and privacy
// //           policy.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PropertyActions;
// import React, { useState } from "react";
// import Icon from "../../../components/AppIcon";
// import Button from "../../../components/ui/Button";

// const PropertyActions = ({
//   property,
//   onScheduleViewing,
//   onWhatsAppContact,
// }) => {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isSharing, setIsSharing] = useState(false);

//   const handleWishlist = () => {
//     setIsWishlisted(!isWishlisted);
//     // Here you would typically make an API call to add/remove from wishlist
//   };

//   const handleShare = async () => {
//     setIsSharing(true);

//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: property?.title,
//           text: `Check out this amazing property: ${property?.title}`,
//           url: window.location?.href,
//         });
//       } catch (error) {
//         console.log("Error sharing:", error);
//       }
//     } else {
//       // Fallback: copy to clipboard
//       try {
//         await navigator.clipboard?.writeText(window.location?.href);
//         alert("Property link copied to clipboard!");
//       } catch (error) {
//         console.log("Error copying to clipboard:", error);
//       }
//     }

//     setIsSharing(false);
//   };

//   const handleDownloadBrochure = () => {
//     // Simulate brochure download
//     const link = document.createElement("a");
//     link.href = "#"; // In real app, this would be the brochure URL
//     link.download = `${property?.title?.replace(/\s+/g, "_")}_Brochure.pdf`;
//     document.body?.appendChild(link);
//     link?.click();
//     document.body?.removeChild(link);
//     alert("Brochure download started!");
//   };

//   const handleCalculateEMI = () => {
//     // Navigate to EMI calculator or open modal
//     alert("EMI Calculator feature coming soon!");
//   };

//   return (
//     <div className="space-y-6 p-6 bg-card border border-border rounded-lg">
//       {/* Primary Action Buttons */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold text-foreground text-center">
//           Interested in this property?
//         </h3>

//         <div className="grid grid-cols-1 gap-3">
//           <Button
//             variant="default"
//             size="lg"
//             fullWidth
//             iconName="Calendar"
//             iconPosition="left"
//             onClick={onScheduleViewing}
//             className="h-12 text-base font-medium"
//           >
//             Schedule Viewing
//           </Button>

//           <Button
//             variant="outline"
//             size="lg"
//             fullWidth
//             iconName="MessageCircle"
//             iconPosition="left"
//             onClick={onWhatsAppContact}
//             className="h-12 text-base font-medium border-2"
//           >
//             Contact on WhatsApp
//           </Button>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-border"></div>

//       {/* Quick Actions */}
//       <div className="space-y-3">
//         <h4 className="text-sm font-medium text-foreground text-center">
//           Quick Actions
//         </h4>

//         <div className="grid grid-cols-4 gap-3">
//           <button
//             onClick={handleWishlist}
//             className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all duration-200 ${
//               isWishlisted
//                 ? "bg-error/10 text-error border border-error/20"
//                 : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             <Icon
//               name="Heart"
//               size={20}
//               className={isWishlisted ? "fill-current" : ""}
//             />
//             <span className="text-xs font-medium">
//               {isWishlisted ? "Saved" : "Save"}
//             </span>
//           </button>

//           <button
//             onClick={handleShare}
//             disabled={isSharing}
//             className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 disabled:opacity-50"
//           >
//             {isSharing ? (
//               <div className="w-5 h-5 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
//             ) : (
//               <Icon name="Share2" size={20} />
//             )}
//             <span className="text-xs font-medium">Share</span>
//           </button>

//           <button
//             onClick={handleDownloadBrochure}
//             className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
//           >
//             <Icon name="Download" size={20} />
//             <span className="text-xs font-medium">PDF</span>
//           </button>

//           <button
//             onClick={handleCalculateEMI}
//             className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
//           >
//             <Icon name="Calculator" size={20} />
//             <span className="text-xs font-medium">EMI</span>
//           </button>
//         </div>
//       </div>

//       {/* Property Status Alert */}
//       {property?.status !== "available" && (
//         <div
//           className={`p-4 rounded-lg border-2 ${
//             property?.status === "sold"
//               ? "bg-error/5 border-error/20 text-error"
//               : "bg-warning/5 border-warning/20 text-warning"
//           }`}
//         >
//           <div className="flex items-center space-x-3">
//             <Icon
//               name={property?.status === "sold" ? "AlertCircle" : "Clock"}
//               size={20}
//               className="flex-shrink-0"
//             />
//             <div>
//               <p className="font-semibold text-sm">
//                 {property?.status === "sold"
//                   ? "Property Sold"
//                   : "Under Contract"}
//               </p>
//               <p className="text-xs opacity-80 mt-1">
//                 {property?.status === "sold"
//                   ? "This property has been sold. Check similar properties."
//                   : "This property is currently under contract."}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Contact Disclaimer */}
//       <div className="text-center space-y-2">
//         <div className="text-xs text-muted-foreground leading-relaxed">
//           <p>By contacting the agent, you agree to our</p>
//           <p>
//             <button className="text-primary hover:underline font-medium">
//               Terms of Service
//             </button>{" "}
//             and{" "}
//             <button className="text-primary hover:underline font-medium">
//               Privacy Policy
//             </button>
//           </p>
//         </div>

//         {/* Trust Indicators */}
//         <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
//           <div className="flex items-center space-x-1">
//             <Icon name="Shield" size={14} className="text-success" />
//             <span>Verified Agent</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Icon name="Clock" size={14} className="text-primary" />
//             <span>Quick Response</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyActions;
import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PropertyActions = ({
  property,
  onScheduleViewing,
  onWhatsAppContact,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const quickActions = [
    {
      icon: "Heart",
      label: "Save",
      action: () => setIsWishlisted(!isWishlisted),
      active: isWishlisted,
      activeClass: "text-error",
    },
    {
      icon: "Share2",
      label: "Share",
      action: () => handleShare(),
      loading: isSharing,
    },
    {
      icon: "Download",
      label: "PDF",
      action: () => alert("Brochure download started!"),
    },
    {
      icon: "Calculator",
      label: "EMI",
      action: () => alert("EMI Calculator coming soon!"),
    },
  ];

  const handleShare = async () => {
    setIsSharing(true);
    if (navigator.share) {
      await navigator.share({
        title: property?.title,
        text: `Check out: ${property?.title}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
    setIsSharing(false);
  };

  return (
    <div className="space-y-4 p-4 bg-card border border-border rounded-lg">
      {/* Primary Actions */}
      {/* <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="Calendar"
          onClick={onScheduleViewing}
        >
          Schedule Viewing
        </Button>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          iconName="MessageCircle"
          onClick={onWhatsAppContact}
        >
          WhatsApp
        </Button>
      </div> */}

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            disabled={action.loading}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              action.active
                ? "bg-error/10 text-error"
                : "bg-muted/50 hover:bg-muted"
            } ${action.activeClass || ""}`}
          >
            {action.loading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Icon
                name={action.icon}
                size={18}
                className={action.active ? "fill-current" : ""}
              />
            )}
            <span className="text-xs font-medium mt-1">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Status Alert */}
      {property?.status !== "available" && (
        <div
          className={`p-3 rounded-lg text-sm text-center ${
            property.status === "sold"
              ? "bg-error/10 text-error"
              : "bg-warning/10 text-warning"
          }`}
        >
          <Icon
            name={property.status === "sold" ? "AlertCircle" : "Clock"}
            size={16}
            className="inline mr-2"
          />
          {property.status === "sold" ? "Property Sold" : "Under Contract"}
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-muted-foreground text-center">
        By contacting, you agree to our terms and privacy policy.
      </div>
    </div>
  );
};

export default PropertyActions;