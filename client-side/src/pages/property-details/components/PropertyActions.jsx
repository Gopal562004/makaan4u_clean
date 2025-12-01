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

//   const quickActions = [
//     {
//       icon: "Heart",
//       label: "Save",
//       action: () => setIsWishlisted(!isWishlisted),
//       active: isWishlisted,
//       activeClass: "text-error",
//     },
//     {
//       icon: "Share2",
//       label: "Share",
//       action: () => handleShare(),
//       loading: isSharing,
//     },
//     {
//       icon: "Download",
//       label: "PDF",
//       action: () => alert("Brochure download started!"),
//     },
//     {
//       icon: "Calculator",
//       label: "EMI",
//       action: () => alert("EMI Calculator coming soon!"),
//     },
//   ];

//   const handleShare = async () => {
//     setIsSharing(true);
//     if (navigator.share) {
//       await navigator.share({
//         title: property?.title,
//         text: `Check out: ${property?.title}`,
//         url: window.location.href,
//       });
//     } else {
//       await navigator.clipboard.writeText(window.location.href);
//       alert("Link copied!");
//     }
//     setIsSharing(false);
//   };

//   return (
//     <div className="space-y-4 p-4 bg-card border border-border rounded-lg">
//       {/* Primary Actions */}
//       {/* <div className="space-y-3">
//         <Button
//           variant="default"
//           size="lg"
//           fullWidth
//           iconName="Calendar"
//           onClick={onScheduleViewing}
//         >
//           Schedule Viewing
//         </Button>
//         <Button
//           variant="outline"
//           size="lg"
//           fullWidth
//           iconName="MessageCircle"
//           onClick={onWhatsAppContact}
//         >
//           WhatsApp
//         </Button>
//       </div> */}

//       {/* Quick Actions */}
//       <div className="grid grid-cols-4 gap-2">
//         {quickActions.map((action, index) => (
//           <button
//             key={index}
//             onClick={action.action}
//             disabled={action.loading}
//             className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
//               action.active
//                 ? "bg-error/10 text-error"
//                 : "bg-muted/50 hover:bg-muted"
//             } ${action.activeClass || ""}`}
//           >
//             {action.loading ? (
//               <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
//             ) : (
//               <Icon
//                 name={action.icon}
//                 size={18}
//                 className={action.active ? "fill-current" : ""}
//               />
//             )}
//             <span className="text-xs font-medium mt-1">{action.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Status Alert */}
//       {property?.status !== "available" && (
//         <div
//           className={`p-3 rounded-lg text-sm text-center ${
//             property.status === "sold"
//               ? "bg-error/10 text-error"
//               : "bg-warning/10 text-warning"
//           }`}
//         >
//           <Icon
//             name={property.status === "sold" ? "AlertCircle" : "Clock"}
//             size={16}
//             className="inline mr-2"
//           />
//           {property.status === "sold" ? "Property Sold" : "Under Contract"}
//         </div>
//       )}

//       {/* Footer */}
//       <div className="text-xs text-muted-foreground text-center">
//         By contacting, you agree to our terms and privacy policy.
//       </div>
//     </div>
//   );
// };

// export default PropertyActions;
import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { wishlistService } from "../../../lib/mongo/services/wishlistService";

const PropertyActions = ({
  property,
  onScheduleViewing,
  onWhatsAppContact,
  // 🔥 RECEIVE WISHLIST PROPS FROM PARENT
  isWishlisted,
  onWishlistToggle,
  wishlistLoading,
}) => {
  const [isSharing, setIsSharing] = useState(false);

  const quickActions = [
    {
      icon: "Heart",
      label: isWishlisted ? "Saved" : "Save",
      action: onWishlistToggle,
      active: isWishlisted,
      loading: wishlistLoading,
      activeClass: "text-red-600",
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
    try {
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
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-card border border-border rounded-lg">
      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            disabled={action.loading}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors border ${
              action.active
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-muted/50 border-border hover:bg-muted"
            } ${action.activeClass || ""} ${
              action.loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-yellow-50 border-yellow-200 text-yellow-700"
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