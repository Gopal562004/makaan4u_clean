export const trackSEOEvents = {
  propertyView: (property) => {
    if (window.gtag && property) {
      window.gtag("event", "property_view", {
        event_category: "Property",
        event_label: property.title,
        property_id: property.id,
        property_type: property.type,
        property_price: property.price,
        property_location: property.location,
      });
    }
  },

  contactAction: (property, actionType) => {
    if (window.gtag && property) {
      window.gtag("event", "contact_action", {
        event_category: "Conversion",
        event_label: actionType,
        property_id: property.id,
      });
    }
  },
};
