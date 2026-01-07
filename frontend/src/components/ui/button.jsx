import React from "react";

export function Button({ className = "", variant = "default", children, ...props }) {
  
  // 1. Base styles always applied
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";

  // 2. Styles based on the 'variant' prop
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
  };

  // 3. Combine everything
  const finalClass = `${base} ${variants[variant] || variants.default} ${className}`;

  return (
    <button className={finalClass} {...props}>
      {children}
    </button>
  );
}