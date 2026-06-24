// import React from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Routes from "./Routes";

// function App() {
//   return (
//     <>
//       <Routes />
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import Routes from "./Routes";
import { PreferencesProvider } from "./contexts/PreferencesContext";

// IMPORT YOUR 4 PERFORMANCE FILES
import { usePerformanceMonitor } from "./hooks/usePerformanceMonitor";
import { checkPerformanceBudget } from "./utils/performanceBudget";
import { trackSEOEvents } from "./utils/analytics";

function App() {
  // ✔ 1. Track Core Web Vitals (LCP, CLS)
  usePerformanceMonitor();

  useEffect(() => {
    // ✔ 2. Check performance budget (page size, load time)
    const result = checkPerformanceBudget();
    console.log("Performance Budget:", result);

    // ✔ 3. Track first page view
    if (window.gtag) {
      window.gtag("config", "G-BKYZF93DS4", {
        page_path: window.location.pathname,
      });
    }
  }, []);

  return (
    <PreferencesProvider>
      <Routes />
      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="!bg-white !text-gray-900 !rounded-sm !border !border-gray-200 !shadow-md !font-medium !text-sm !mb-2"
        bodyClassName="!m-0 !p-3 flex items-center"
        closeButton={true}
      />
    </PreferencesProvider>
  );
}

export default App;
