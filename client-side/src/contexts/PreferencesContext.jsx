import React, { createContext, useContext, useState, useEffect } from "react";

const PreferencesContext = createContext();

export const usePreferences = () => useContext(PreferencesContext);

export const PreferencesProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("makaan_currency") || "INR";
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("makaan_language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("makaan_currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("makaan_language", language);
  }, [language]);

  const value = {
    currency,
    setCurrency,
    language,
    setLanguage,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};
