// import React from "react";
// import Icon from "../../../components/AppIcon";
// import Image from "../../../components/AppImage";
// import Button from "../../../components/ui/Button";

// const AgentCard = ({ agent, onScheduleViewing, onWhatsAppContact }) => {
//   const handleCall = () => {
//     window.open(`tel:${agent?.phone}`, "_self");
//   };

//   const handleEmail = () => {
//     window.open(`mailto:${agent?.email}`, "_self");
//   };

//   return (
//     <div className="bg-card border border-border rounded-lg p-6">
//       <div className="text-center mb-6">
//         <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
//           <Image
//             src={agent?.avatar}
//             alt={agent?.avatarAlt}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <h3 className="text-xl font-semibold text-foreground mb-1">
//           {agent?.name}
//         </h3>
//         <p className="text-muted-foreground mb-2">{agent?.designation}</p>
//         <div className="flex items-center justify-center space-x-1 mb-2">
//           {[...Array(5)]?.map((_, i) => (
//             <Icon
//               key={i}
//               name="Star"
//               size={16}
//               className={
//                 i < Math.floor(agent?.rating)
//                   ? "text-warning fill-current"
//                   : "text-muted-foreground"
//               }
//             />
//           ))}
//           <span className="text-sm text-muted-foreground ml-2">
//             {agent?.rating} ({agent?.reviewCount} reviews)
//           </span>
//         </div>
//       </div>
//       {/* Agent Stats */}
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="text-center">
//           <p className="text-2xl font-bold text-primary">
//             {agent?.propertiesSold}
//           </p>
//           <p className="text-sm text-muted-foreground">Properties Sold</p>
//         </div>
//         <div className="text-center">
//           <p className="text-2xl font-bold text-primary">{agent?.experience}</p>
//           <p className="text-sm text-muted-foreground">Years Experience</p>
//         </div>
//       </div>
//       {/* Contact Information */}
//       <div className="space-y-3 mb-6">
//         <div className="flex items-center space-x-3">
//           <Icon name="Phone" size={16} className="text-muted-foreground" />
//           <span className="text-sm text-foreground">{agent?.phone}</span>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Icon name="Mail" size={16} className="text-muted-foreground" />
//           <span className="text-sm text-foreground">{agent?.email}</span>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Icon name="MapPin" size={16} className="text-muted-foreground" />
//           <span className="text-sm text-foreground">{agent?.location}</span>
//         </div>
//       </div>
//       {/* Action Buttons */}
//       <div className="space-y-3">
//         <Button
//           variant="default"
//           fullWidth
//           iconName="Calendar"
//           iconPosition="left"
//           onClick={onScheduleViewing}
//         >
//           Schedule Viewing
//         </Button>

//         <div className="grid grid-cols-2 gap-2">
//           <Button
//             variant="outline"
//             iconName="MessageCircle"
//             iconPosition="left"
//             onClick={onWhatsAppContact}
//           >
//             WhatsApp
//           </Button>
//           <Button
//             variant="outline"
//             iconName="Phone"
//             iconPosition="left"
//             onClick={handleCall}
//           >
//             Call
//           </Button>
//         </div>

//         <Button
//           variant="ghost"
//           fullWidth
//           iconName="Mail"
//           iconPosition="left"
//           onClick={handleEmail}
//         >
//           Send Email
//         </Button>
//       </div>
//       {/* Languages Spoken */}
//       {agent?.languages && agent?.languages?.length > 0 && (
//         <div className="mt-6 pt-6 border-t border-border">
//           <h4 className="text-sm font-medium text-foreground mb-2">
//             Languages Spoken
//           </h4>
//           <div className="flex flex-wrap gap-2">
//             {agent?.languages?.map((language, index) => (
//               <span
//                 key={index}
//                 className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
//               >
//                 {language}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AgentCard;

import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const AgentCard = ({ agent, onScheduleViewing, onWhatsAppContact }) => {
  const handleCall = () => {
    if (agent?.phone) {
      window.open(`tel:${agent.phone}`, "_self");
    }
  };

  const handleEmail = () => {
    if (agent?.email) {
      window.open(`mailto:${agent.email}`, "_self");
    }
  };

  // Calculate response rate color
  const getResponseRateColor = (rate) => {
    if (rate >= 90) return "text-success";
    if (rate >= 75) return "text-warning";
    return "text-error";
  };

  // Format experience
  const formatExperience = (exp) => {
    if (!exp) return "0 years";
    return `${exp} ${exp === 1 ? "year" : "years"}`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      {/* Header with Agent Info */}
      <div className="flex items-start space-x-4 mb-5">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
          <Image
            src={agent?.avatar || "/images/avatar-placeholder.jpg"}
            alt={agent?.name || "Agent"}
            className="w-full h-full object-cover"
            fallback="/images/avatar-placeholder.jpg"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {agent?.name || "Agent Name"}
            </h3>
            {agent?.verified && (
              <Icon
                name="Verified"
                size={16}
                className="text-blue-500 flex-shrink-0 ml-1"
              />
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            {agent?.designation || "Real Estate Agent"}
          </p>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={
                  i < Math.floor(agent?.rating || 0)
                    ? "text-warning fill-current"
                    : "text-muted-foreground/40"
                }
              />
            ))}
            <span className="text-sm font-medium text-foreground ml-1">
              {agent?.rating || "0.0"}
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              ({agent?.reviewCount || 0} reviews)
            </span>
          </div>

          {/* Company Info */}
          {agent?.company && (
            <div className="flex items-center space-x-1 mt-1">
              <Icon
                name="Building2"
                size={12}
                className="text-muted-foreground"
              />
              <span className="text-xs text-muted-foreground">
                {agent.company}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Agent Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <p className="text-lg font-bold text-primary mb-1">
            {agent?.propertiesSold || 0}
          </p>
          <p className="text-xs text-muted-foreground">Sold</p>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <p className="text-lg font-bold text-primary mb-1">
            {agent?.experience || 0}
          </p>
          <p className="text-xs text-muted-foreground">Years Exp</p>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <p className="text-lg font-bold text-primary mb-1">
            {agent?.activeListings || 0}
          </p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
          <span className="text-xs text-muted-foreground">Response Rate</span>
          <span
            className={`text-xs font-semibold ${getResponseRateColor(
              agent?.responseRate || 0
            )}`}
          >
            {agent?.responseRate || 0}%
          </span>
        </div>
        <div className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
          <span className="text-xs text-muted-foreground">Response Time</span>
          <span className="text-xs font-semibold text-foreground">
            {agent?.responseTime || "N/A"}
          </span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-2 mb-5">
        <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded-lg">
          <Icon name="Phone" size={14} className="text-primary flex-shrink-0" />
          <span className="text-sm text-foreground truncate">
            {agent?.phone || "Not provided"}
          </span>
        </div>
        <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded-lg">
          <Icon name="Mail" size={14} className="text-primary flex-shrink-0" />
          <span className="text-sm text-foreground truncate">
            {agent?.email || "Not provided"}
          </span>
        </div>
        {agent?.location && (
          <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded-lg">
            <Icon
              name="MapPin"
              size={14}
              className="text-primary flex-shrink-0"
            />
            <span className="text-sm text-foreground truncate">
              {agent.location}
            </span>
          </div>
        )}
      </div>

      {/* Specializations */}
      {agent?.specializations && agent.specializations.length > 0 && (
        <div className="mb-5">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Specializations
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {agent.specializations.slice(0, 3).map((spec, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
              >
                {spec}
              </span>
            ))}
            {agent.specializations.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{agent.specializations.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <Button
          variant="default"
          fullWidth
          size="sm"
          iconName="Calendar"
          iconPosition="left"
          onClick={onScheduleViewing}
        >
          Schedule Viewing
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={onWhatsAppContact}
            disabled={!agent?.phone}
          >
            WhatsApp
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Phone"
            iconPosition="left"
            onClick={handleCall}
            disabled={!agent?.phone}
          >
            Call Now
          </Button>
        </div>

        <Button
          variant="ghost"
          fullWidth
          size="sm"
          iconName="Mail"
          iconPosition="left"
          onClick={handleEmail}
          disabled={!agent?.email}
        >
          Send Email
        </Button>
      </div>

      {/* Additional Info */}
      <div className="mt-5 pt-4 border-t border-border space-y-3">
        {/* Languages Spoken */}
        {agent?.languages && agent.languages.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-foreground mb-1.5">
              Languages
            </h4>
            <div className="flex flex-wrap gap-1">
              {agent.languages.map((language, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Member Since */}
        {agent?.memberSince && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Member since</span>
            <span className="text-foreground font-medium">
              {new Date(agent.memberSince).getFullYear()}
            </span>
          </div>
        )}

        {/* License Number */}
        {agent?.licenseNumber && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">License</span>
            <span className="text-foreground font-mono font-medium">
              {agent.licenseNumber}
            </span>
          </div>
        )}
      </div>

      {/* Availability Status */}
      {agent?.availability && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  agent.availability === "online"
                    ? "bg-success"
                    : agent.availability === "busy"
                    ? "bg-warning"
                    : "bg-muted-foreground"
                }`}
              />
              <span className="text-xs font-medium text-foreground capitalize">
                {agent.availability}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {agent.availability === "online"
                ? "Available now"
                : agent.availability === "busy"
                ? "Responds later"
                : "Offline"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentCard;