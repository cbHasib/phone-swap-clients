import React from "react";

const Badge = () => {
  return (
    <div>
      <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
        1.2k
      </span>

      <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
        New
      </span>
    </div>
  );
};

export default Badge;
