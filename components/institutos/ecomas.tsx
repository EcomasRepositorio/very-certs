"use client";

import React from "react";

const EcomasBlock = () => {
  return (
    <div className="bg-black text-white py-[500px] flex items-center justify-center relative">
      {/* Imagen para pantallas grandes */}
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center md:bg-contain bg-no-repeat"
        style={{
          backgroundImage: "url('/image/ecomasfond.png')",
        }}
      ></div>

      {/* Imagen para móviles */}
      <div
        className="absolute inset-0 block md:hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/image/ecomasfond-mobile.png')",
        }}
      ></div>

      {/* Botón */}
      <a
          href="https://ecomas.pe"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white md:sinimg   lg:top-40 lg:left-[-100px]  xl:top-60 xl:left-[-170px] - px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition 
        relative z-10 text-center"
        >
          Ir a la página
        </a>
    </div>
  );
};

export default EcomasBlock;
