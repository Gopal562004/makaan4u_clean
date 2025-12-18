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
    <>
      <Routes />
      <ToastContainer />
      <Analytics />
    </>
  );
}

export default App;
