import React from "react";

const Logo = ({ className = "w-8 h-8" }) => (
  <svg 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M20 4L4 18V36C4 37.1046 4.89543 38 6 38H14V26H26V38H34C35.1046 38 36 37.1046 36 36V18L20 4Z" 
      fill="url(#paint0_linear)"
    />
    <path 
      d="M20 12L12 19V32H16V22H24V32H28V19L20 12Z" 
      fill="white"
    />
    <defs>
      <linearGradient id="paint0_linear" x1="4" y1="4" x2="36" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#4F46E5" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
