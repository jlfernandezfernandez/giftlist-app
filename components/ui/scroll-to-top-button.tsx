import React, { useState, useEffect, useCallback } from "react";
import { ChevronUp } from "lucide-react";

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-200 active:bg-gray-300 lg:hidden z-50"
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
};
