import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// const stats = [
//   { percentage: "100%", label: "Servicios de calidad" },
//   { percentage: "100%", label: "Personal calificado" },
//   { percentage: "24H", label: "Soporte técnico" },
// ];

const stats = [
  { end: 100, label: "Servicios de calidad", suffix: "%" },
  { end: 100, label: "Personal calificado", suffix: "%" },
  { end: 24, label: "Soporte técnico", suffix: "H" },
];

const CyberSecuritySection = () => {
  const [key, setKey] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      setKey((prevKey) => prevKey + 1); // Reinicia el contador si es necesario
    }
  }, [inView]);

  return (
    <section id="nosotros">
      <section className="flex flex-col md:flex-row items-center bg-transparent text-gray-700 dark:text-white p-10 md:p-20 max-w-screen-xl mx-auto">
        {/* Contenedor de imagen (Carrusel) */}
        <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0 relative">
          <motion.div
            className="relative w-full max-w-md border-none rounded-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/image/inter-sinfond.png"
              alt="Cyber Security Illustration"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
        {/* Contenedor de texto */}
        <div className="md:w-1/2 p-4 md:pr-8">
          <span className="bg-customBlue text-white py-1 px-4 rounded-full text-sm inline-block mb-4">
            NOSOTROS
          </span>
          <div className="text-4xl font-extrabold tracking-wide text-gray-700 dark:text-white leading-tight mb-4">
            ¿Qué es VERYCERTS?
          </div>

          <div className= "text-center lg:text-left text-gray-700 dark:text-gray-300 font-poppins mb-6">
            Verycerts es una plataforma digital que permite la verificación y
            autenticación segura de certificados educativos. Facilita a las
            instituciones registrar certificados y a empleadores o entidades
            comprobar su autenticidad de forma rápida y confiable.
          </div>
          <div
            ref={ref}
            className="flex justify-center space-x-16 py-8 bg-transparent"
          >
            {stats.map((stat, index) => (
              <div
                key={`counter-${index}-${key}`}
                className="text-center text-white"
              >
                {inView && (
                  <>
                    <div className=" text-4xl text-gray-700 dark:text-gray-300 font-extrabold">
                      <CountUp
                        start={0}
                        end={stat.end}
                        duration={3}
                        separator="."
                        key={key} // Forzar re-render cuando cambia la key
                      />
                      <span className="ml-1">{stat.suffix}</span>
                    </div>
                    <p className=" text-gray-700 text-sm dark:text-gray-300 font-poppins">
                      {stat.label}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
          <div>
            <Link
              href="https://api.whatsapp.com/send?phone= &text=Hola vengo en por mas informacio sobre VERICERTs"
              passHref
              legacyBehavior
            >
              <a
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full font-semibold shadow-md transition duration-300 inline-block text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pruebe nuestros servicios
              </a>
            </Link>

            <Link
              href="https://api.whatsapp.com/send?phone= &text=Hola vengo en por mas informacio sobre VERICERTs"
              passHref
              legacyBehavior
            >
              <a
                className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-full font-semibold shadow-md transition duration-300 inline-block text-center ml-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contáctanos
              </a>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CyberSecuritySection;
