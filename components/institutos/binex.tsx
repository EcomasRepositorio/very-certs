"use client";

import React, { useEffect, useState } from "react";

const InnovationSection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Habilita la renderización solo en el cliente
    setIsClient(true);
  }, []);

  const items = [
    {
      title: "GIUSEPPE OUR PATENTED AI",
      description:
        "Giuseppe is at the heart of everything we do and our key to discovering new formulas and beyond, with dazzling speed and detail.",
      videoSrc: "/videos/1.mp4",
    },
    {
      title: "SCIENCE AND R&D",
      description:
        "Our engine is guided by the finest minds in technology and applied sciences, ensuring every innovation is as smart as it is surprising.",
      videoSrc: "/videos/2.mp4",
    },
    {
      title: "OUR TEAM OF EXPERTS",
      description:
        "Talented, creative product specialists from all different areas come together to bring ideas to life, making Giuseppe even smarter by giving continuous feedback and superior real-world experiences.",
      videoSrc: "/videos/3.mp4",
    },
  ];

  return (
    <div className="bg-black text-white py-20 px-4">
      {/* Título principal */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
        THE INNOVATION ENGINE DRIVING IT ALL FORWARD. ONLY FROM NOTCO.
      </h2>

      {/* Contenedor de los items */}
      <div className="space-y-12 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-2 items-center gap-6 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Columna de texto */}
            <div className="text-left space-y-4 px-4">
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>

            {/* Columna de video */}
            {isClient && (
              <div className="relative group h-[300px] w-full overflow-hidden rounded-lg">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={item.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
                {/* Overlay (opcional) */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InnovationSection;
