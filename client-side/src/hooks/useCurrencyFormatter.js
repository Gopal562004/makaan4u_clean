import { usePreferences } from "../contexts/PreferencesContext";

export const useCurrencyFormatter = () => {
  const { currency } = usePreferences();

  const formatPrice = (price) => {
    if (!price || price === 0) return "Price on request";

    // Prices in the DB are assumed to be in INR as the base.
    // E.g., 10000000 = 1 Crore INR.
    let convertedPrice = Number(price);

    // Apply exchange rates relative to INR
    if (currency === "USD") {
      convertedPrice = convertedPrice * 0.012;
      return `$${new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
      }).format(convertedPrice)}`;
    } else if (currency === "EUR") {
      convertedPrice = convertedPrice * 0.011;
      return `€${new Intl.NumberFormat("en-EU", {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
      }).format(convertedPrice)}`;
    } else {
      // Default INR formatting (Crores / Lakhs)
      if (convertedPrice >= 10000000) {
        const crorePrice = convertedPrice / 10000000;
        return `₹${
          crorePrice % 1 === 0 ? crorePrice.toFixed(0) : crorePrice.toFixed(2)
        } Cr`;
      }
      if (convertedPrice >= 100000) {
        const lakhPrice = convertedPrice / 100000;
        return `₹${
          lakhPrice % 1 === 0 ? lakhPrice.toFixed(0) : lakhPrice.toFixed(2)
        } L`;
      }
      return `₹${convertedPrice.toLocaleString("en-IN")}`;
    }
  };

  return { formatPrice };
};
