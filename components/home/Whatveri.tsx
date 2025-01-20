import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaChartLine, FaUserTie, FaHeadset } from "react-icons/fa";

const fadeIn = (
  direction = "up",
  type = "spring",
  delay = 0,
  duration = 0.75
) => ({
  initial: {
    opacity: 0,
    y: direction === "up" ? 20 : 0,
    x: direction === "right" ? 50 : 0,
  },
  animate: { opacity: 1, y: 0, x: 0, transition: { type, delay, duration } },
});

// Agrega un icono específico a cada contador
const stats = [
  { end: 100, label: "Servicios de calidad", suffix: "%", icon: FaChartLine },
  { end: 100, label: "Personal calificado", suffix: "%", icon: FaUserTie },
  { end: 24, label: "Soporte técnico", suffix: "H", icon: FaHeadset },
];

const CyberSecuritySection = () => {
  const [key, setKey] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      setKey((prevKey) => prevKey + 1);
    }
  }, [inView]);

  return (
    <section id="nosotros" className="py-10 px-4 sm:px-6 lg:px-20">
      <div className="flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto gap-12">
        {/* Contenedor de imagen */}
        <div className="lg:w-1/2 flex justify-center">
          <motion.div
            className="relative w-full max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/image/inter-sinfond.png"
              alt="Ilustración de Cyber Security"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        {/* Contenedor de texto */}
        <div className="lg:w-1/2">
          <span className="bg-customBlue text-white py-1 px-4 rounded-full text-sm inline-block mb-4">
            NOSOTROS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 dark:text-white mb-4">
            ¿Qué es VERYCERTS?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 font-poppins mb-6 leading-relaxed">
            Verycerts es una plataforma digital que permite la verificación y
            autenticación segura de certificados educativos. Facilita a las
            instituciones registrar certificados y a empleadores o entidades
            comprobar su autenticidad de forma rápida y confiable.
          </p>

          {/* Contadores con iconos personalizados */}
          <div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon; // Accede al icono dinámicamente
              return (
                <motion.div
                  key={`counter-${index}-${key}`}
                  whileHover={{
                    scale: 1.1, // Escala el elemento al 110%
                    rotate: 5, // Rota ligeramente el elemento
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Añade una sombra
                  }}
                  variants={fadeIn("up", "spring", index * 0.5, 0.75)}
                  className="bg-green-pink-gradient shadow-card rounded-[20px] p-[1px]"
                >
                  <div
                    className=" bg-gray-100 dark:bg-customDark flex flex-col items-center justify-evenly p-6 rounded-[20px] min-h-[200px]"
                    aria-label={stat.label}
                  >
                    {/* Icono personalizado */}
                    <div className="flex items-center justify-center w-16 h-16 bg-customBlue dark:bg-blue-900 rounded-full text-white dark:text-gray-100">
                      <Icon size={32} />
                    </div>

                    {/* Contador */}
                    <div className="text-center">
                      <span className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                        <CountUp
                          start={0}
                          end={stat.end}
                          duration={3}
                          separator="."
                          key={`countup-${index}`}
                        />
                        {stat.suffix}
                      </span>
                      <p className="mt-2 text-xs font-poppins text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberSecuritySection;