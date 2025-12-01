import { useEffect } from "react";

export const usePerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // LCP Monitoring
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        if (window.gtag && lastEntry) {
          window.gtag("event", "core_vital", {
            event_category: "Web Vitals",
            event_label: "LCP",
            value: Math.round(lastEntry.startTime),
          });
        }
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // CLS Monitoring
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }

        if (window.gtag && clsValue > 0) {
          window.gtag("event", "core_vital", {
            event_category: "Web Vitals",
            event_label: "CLS",
            value: Math.round(clsValue * 1000),
          });
        }
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });

      return () => {
        lcpObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);
};
