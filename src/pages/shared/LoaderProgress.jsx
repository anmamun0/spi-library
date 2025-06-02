import React, { useEffect, useState } from "react";

const LoaderProgress = () => {
  const [isActive, setIsActive] = useState(localStorage.getItem("loader") === "true");

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("loader") === "true";
      setIsActive(stored);
    }, 500); // checks every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-200">
      {isActive && (
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="relative h-[6px] overflow-hidden rounded-xl mx-2">
            <div className="absolute h-full w-1/2 bg-green-500 animate-borderFlow"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoaderProgress;
