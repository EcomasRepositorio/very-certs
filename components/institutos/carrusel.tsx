import React, { useState, useEffect } from "react";

const TextCarousel = () => {
  const items = [
    "LOW IMPACT INNOVATION",
    "SHIFTING TRENDS",
    "DEVELOPMENT UNCERTAINTY",
    "SUSTAINABILITY TARGETS",
    "SUPPLIER DEPENDENCY",
    "LOW SENSORY APPEAL",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, [items.length]);

  const getVisibleItems = () => {
    const first = currentIndex;
    const second = (currentIndex + 1) % items.length;
    const third = (currentIndex + 2) % items.length;
    return [items[first], items[second], items[third]];
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="relative flex justify-center items-center space-x-8 py-10 bg-transparent">
      {visibleItems.map((item, index) => (
        <span
          key={index}
          className="text-white text-lg md:text-2xl font-bold uppercase animate-fadeInOut"
          style={{
            animationDelay: `${index * 1}s`,
          }}
        >
          {item}
        </span>
      ))}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default TextCarousel;
