import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { percentage: "100%", label: "Servicios de calidad" },
  { percentage: "100%", label: "Personal calificado" },
  { percentage: "24H", label: "Soporte técnico" },
];

const CyberSecuritySection = () => {
  return (
    <section id='nosotros'>

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
        <span className="bg-[#009FB2] text-white py-1 px-4 rounded-full text-sm inline-block mb-4">
          NOSOTROS
        </span>
        <h1 className="text-4xl font-extrabold text-gray-700 dark:text-white leading-tight mb-4">
          ¿Qué es VERICERTS?
        </h1>
        <p className="text-gray-400 mb-6">
          Vericerts es una plataforma digital de verificación y autenticación de
          certificados educativos. Ofrece una solución segura y confiable para
          instituciones que emiten certificados y para quienes necesitan
          verificar su autenticidad. A través de Vericerts, las instituciones
          pueden registrar sus certificados, y empleadores o entidades pueden
          verificar su validez de forma rápida y sencilla.
        </p>
        <div className="flex space-x-8 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h2 className="text-4xl font-bold">{stat.percentage}</h2>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
        <div>
        <Link href="https://api.whatsapp.com/send?phone= &text=Hola vengo en por mas informacio sobre VERICERTs" passHref legacyBehavior>
        <a
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full font-semibold shadow-md transition duration-300 inline-block text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pruebe nuestros servicios
            </a>
          </Link>

          <Link href="https://api.whatsapp.com/send?phone= &text=Hola vengo en por mas informacio sobre VERICERTs" passHref legacyBehavior>
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
