import React from "react";

interface SpinnerProps {
  fullScreen?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ fullScreen = false }) => {
  const baseClasses = "flex items-center justify-center";
  const fullScreenClasses = fullScreen
    ? "fixed inset-0 bg-black bg-opacity-50 z-50"
    : "";

  return (
    <div className={`${baseClasses} ${fullScreenClasses}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
    </div>
  );
};

export default Spinner;
