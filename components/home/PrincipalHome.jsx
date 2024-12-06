"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroImage from "./hero-image";

const PrincipalHome = () => {
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    <>
      Transforme su{" "}
      <span className="text-[#009FB2] font-semibold tracking-wide">gestión</span>{" "}
      de certificados con las{" "}
      <span className="text-[#009FB2] font-semibold tracking-wide">
        herramientas
      </span>{" "}
      de VeryCerts, líderes en eficiencia.
    </>,
    <>
      Verifique la{" "}
      <span className="text-[#009FB2] font-semibold tracking-wide">
        autenticidad
      </span>{" "}
      de los certificados en{" "}
      <span className="text-[#009FB2] font-semibold tracking-wide">
        tiempo real
      </span>{" "}
      con soluciones de confianza como VeryCerts.
    </>,
    <>
      <span className="text-[#009FB2] font-semibold tracking-wide">
        Asegure
      </span>{" "}
      la integridad y validez de sus{" "}
      <span className="text-[#009FB2] font-semibold tracking-wide">
        certificaciones
      </span>{" "}
      con tecnología{" "}
      <span className="text-[#009FB2] font-semibold tracking-wide">
        avanzada
      </span>{" "}
      y simplificada.
    </>,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between bg-transparent min-h-screen px-6 lg:px-20 py-10 sm:ml-0 lg:ml-40">
      {/* Texto principal */}
      <motion.div
        className="flex-1 text-center md:text-left space-y-4 sm:mr-0 md:mr-0 lg:mr-0 xl:mr-96 2xl:mr-0 mt-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentText}
            className="text-gray-800 dark:text-white text-xl md:text-2xl lg:text-5xl font-medium leading-relaxed tracking-wide max-w-md md:max-w-lg lg:max-w-x1 z-10"
            style={{ fontFamily: "'omnes', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            {texts[currentText]}
          </motion.h1>
        </AnimatePresence>
        <p
          className="text-gray-600 dark:text-white text-lg md:text-xl max-w-xl mx-auto md:mx-0 tracking-wide"
          style={{ fontFamily: "'omnes', sans-serif" }}
        >
          Confiabilidad y seguridad en la gestión de certificados para el mundo
          digital. "Construya un entorno de confianza con VeryCerts, la
          plataforma líder en verificación de certificados. Verifique y valide
          cada certificado de manera eficiente y segura".
        </p>
      </motion.div>

      {/* Imagen hero */}
      <motion.div
        className="flex-1 mt-6 sm:mt-[-20px] md:mt-0 lg:mt-10  sm:mr-0 md:mr-52 lg:mr-0 flex justify-center lg:justify-start lg:-ml-96 -z-10 "
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{ transform: "scale(1.5)" }} 
      >
        <HeroImage />
      </motion.div>

      {/* Gradientes decorativos */}
      <div className="absolute w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-50 -z-10 top-20 left-10"></div>
      <div className="absolute w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-30 -z-10 bottom-20 right-10"></div>
    </section>
  );
};

export default PrincipalHome;
