"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroImage from "./hero-image";
import { styles } from "../../components/constants/styles";
import { config } from "../../components/constants/config";
import './StylesHome.css';

const PrincipalHome = () => {
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    <>
      <span className="font-light">Transforme su </span>
      <span className="font-poppins tracking-wide">gestión</span>
      <span className="font-light"> de certificados con las </span>
      <span className="font-poppins tracking-wide">herramientas</span>
      <span className="font-light"> de VeryCerts, líderes en eficiencia.</span>
    </>,
    <>
      <span className="font-light">Verifique la </span>
      <span className="font-poppins tracking-wide">autenticidad</span>
      <span className="font-light"> de los certificados en </span>
      <span className="font-poppins tracking-wide">tiempo real</span>
      <span className="font-light">
        {" "}
        con soluciones de confianza como VeryCerts.
      </span>
    </>,
    <>
      <span className="font-poppins tracking-wide">Asegure</span>
      <span className="font-light"> la integridad y validez de sus </span>
      <span className="font-poppins tracking-wide">certificaciones</span>
      <span className="font-light"> con tecnología </span>
      <span className="font-poppins tracking-wide">avanzada</span>
      <span className="font-light"> y simplificada.</span>
    </>,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-12">
      {/* Texto principal */}
      <motion.div
        className="flex-1 text-center md:text-left space-y-4 mt-10 md:mt-20 lg:-mt-40"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          {/* Título fijo */}
          <h1 className="text-gray-800 font-poppins dark:text-white text-4xl md:text-4xl lg:text-6xl font-bold leading-tight tracking-wide">
            Somos{" "}
            <span className="gradient-text font-poppins font-extrabold tracking-widest">
              VeryCerts
            </span>
          </h1>
          {/* <p className="text-gray-600 font-poppins dark:text-gray-300 text-lg mt-2">
            Comprometidos con la seguridad de tus datos.
          </p> */}

          {/* Subtítulo animado */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentText}
              className="text-gray-800 dark:text-white text-xl  md:text-2xl lg:text-3xl font-medium font-poppins leading-relaxed tracking-wide mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              {texts[currentText]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Vista PC */}
      <div className="hidden lg:block">
        <motion.div
          className="flex-1 mt-40 lg:mt-0 flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ transform: "scale(1.2)" }}
        >
          <HeroImage />
        </motion.div>
      </div>
      {/* Vista Movil */}
      <div className="block lg:hidden -mt-4">
        <motion.div
          className="flex-1 mb-5  lg:mt-0 flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ transform: "scale(1.2)" }}
        >
          <HeroImage />
        </motion.div>
      </div>

      <div className="absolute w-64 h-64 bg-[#1AFFD5]/50 dark:bg-[#fff]/25 rounded-full blur-3xl opacity-30 -z-10 top-20 left-4 sm:top-32 md:top-36 lg:mt-48 lg:ml-6"></div>
      {/* Elemento decorativo 2 */}
      <div className="absolute w-72 h-72 bg-[#1AFFD5] dark:bg-[#fff]/40 rounded-full blur-3xl opacity-30 -z-40 bottom-10 right-6"></div>
    </section>
  );
};

export default PrincipalHome;
