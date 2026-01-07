import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-lg border bg-white text-gray-950 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}