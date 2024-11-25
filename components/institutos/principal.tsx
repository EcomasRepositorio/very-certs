"use client";

import React from "react";

const HeaderVideo = () => {
  return (
    <div className="relative">
      <video autoPlay loop muted className="w-full h-[500px] object-cover">
        <source src="/videos/fondvid.mp4" type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-5xl font-extrabold text-white text-center">
          NUESTRAS EMPRESAS AFILIADAS
        </h1>
      </div>
    </div>
  );
};

export default HeaderVideo;
