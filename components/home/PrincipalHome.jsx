"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroImage from "./hero-image";

const PrincipalHome = () => {
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    <>
      Transforme su <span className="text-[#009FB2]">gestión</span> de certificados
      con las <span className="text-[#009FB2]">herramientas</span> de VeryCerts.
    </>,
    <>
      Verifique la <span className="text-[#009FB2]">autenticidad</span> de los certificados
      en <span className="text-[#009FB2]">tiempo real</span> con
     VeryCerts.
    </>,
    <>
     <span className="text-[#009FB2]"> Asegure</span> la integridad y validez de sus{" "}
      <span className="text-[#009FB2]">certificaciones</span> con tecnología{" "}
      <span className="text-[#009FB2]">avanzada</span>.
    </>,
  ];

  // Cambiar el texto cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen px-6 lg:px-20 py-10">
      {/* Texto principal */}
      <motion.div
        className="flex-1 text-center md:text-left space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-gray-800 dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {texts[currentText]}
        </h1>
        <h2 className="text-cyan-600 dark:text-cyan-400 text-4xl md:text-5xl lg:text-6xl font-extrabold">
          VeryCerts
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-xl mx-auto md:mx-0">
          Confiabilidad y seguridad en la gestión de certificados para el mundo
          digital. "Construya un entorno de confianza con VeryCerts, la plataforma
          líder en verificación de certificados. Verifique y valide cada certificado
          de manera eficiente y segura".
        </p>
      </motion.div>

      {/* Imagen hero */}
      <motion.div
        className="flex-1 mt-10 md:mt-0 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroImage />
      </motion.div>

      {/* Gradientes decorativos */}
      <div className="absolute w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-50 -z-10 top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-30 -z-10 bottom-20 right-10"></div>
    </section>
  );
};

export default PrincipalHome;
