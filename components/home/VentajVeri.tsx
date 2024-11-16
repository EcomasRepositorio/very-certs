import React from "react";
import Image from "next/image";
import { BsCheckCircle } from "react-icons/bs";
import { FaTools } from "react-icons/fa";
import Link from "next/link";

const ExpertiseSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center bg-transparent p-10 md:p-20 max-w-screen-xl mx-auto gap-10">
      {/* Contenedor de las imágenes */}
      <div className="md:w-1/2 flex flex-col items-center gap-4 relative">
        {/* Imagen principal (siempre visible) */}
        <div className="relative z-10">
          <Image
            src="/image/estambient.jpg"
            alt="Mechanic working on car"
            width={400}
            height={300}
            className="rounded-lg shadow-lg lg:ml-40 md:ml-44"
          />
        </div>

        {/* Imagen secundaria detrás (solo visible en pantallas md o mayores) */}
        <div className="hidden md:block absolute top-10 left-10 z-1">
          <Image
            src="/image/goteo.jpg"
            alt="Secondary mechanic image"
            width={350}
            height={250}
            className="rounded-lg shadow-md opacity-80 lg:mt-40 lg:ml-5 md:mt-40 md:ml-10"
          />
        </div>

        {/* Otra imagen detrás (solo visible en pantallas md o mayores) */}
        <div className="hidden md:block absolute top-60 left-12 -z-10">
          <Image
            src="/image/fondcian.jpg"
            alt="Secondary mechanic image"
            width={350}
            height={250}
            className="rounded-lg shadow-md opacity-50 mt-[40px] ml-[35px]"
          />
        </div>

        {/* Imagen adicional detrás (solo visible en pantallas md o mayores) */}
        <div className="hidden md:block relative bottom-80 left-16 z-1">
          <Image
            src="/image/fondcian.jpg"
            alt="Mechanic working on car"
            width={400}
            height={300}
            className="rounded-lg shadow-lg opacity-50"
          />
        </div>

        {/* Elemento hexagonal */}
        <div
          className="hidden lg:flex absolute text-white p-4 flex-col items-center justify-center mt-28 ml-[900px] z-10"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            width: "120px",
            height: "120px",
            backgroundColor: "black",
            top: "150px", // Ajusta esta posición para mover el hexágono verticalmente
            left: "20px", // Ajusta esta posición para mover el hexágono horizontalmente
          }}
        >
          {/* Icono de herramientas */}
          <FaTools className="w-6 h-6 mb-1" />{" "}
          <span className="text-xl font-bold">2+</span>{" "}
          <span className="text-xs text-center">Años de experiencia</span>{" "}
        </div>
      </div>

      {/* Contenedor de texto e información */}
      <div className="md:w-1/2 text-gray-700 dark:text-gray-200 -z-2">
        <span className="text-blue-600 uppercase font-semibold dark:text-blue-600"> NOSOTROS</span>

        <h2 className="text-4xl font-extrabold my-4 dark:text-white">
          Ventajas de Usar Vericerts
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Vericerts ofrece una solución confiable y moderna para la verificación
          de documentos, proporcionando múltiples beneficios tanto para
          instituciones como para usuarios finales. Con Vericerts, las
          organizaciones pueden asegurar la autenticidad de sus certificados,
          optimizar procesos y reducir el riesgo de fraude, mientras que los
          usuarios finales disfrutan de una verificación rápida y accesible
          desde cualquier lugar.
        </p>
        <ul className="space-y-4">
          <li className="flex items-center">
            <BsCheckCircle className="text-blue-500 w-6 h-6 mr-2 dark:text-blue-300" />
            <span className="dark:text-gray-100">Confianza y Credibilidad</span>
          </li>
          <li className="flex items-center">
            <BsCheckCircle className="text-blue-500 w-6 h-6 mr-2 dark:text-blue-300" />
            <span className="dark:text-gray-100">Verificación Rápida y Sencilla</span>
          </li>
          <li className="flex items-center">
            <BsCheckCircle className="text-blue-500 w-6 h-6 mr-2 dark:text-blue-300" />
            <span className="dark:text-gray-100">Ahorro de Tiempo y Recursos</span>
          </li>
          <li className="flex items-center">
            <BsCheckCircle className="text-blue-500 w-6 h-6 mr-2 dark:text-blue-300" />
            <span className="dark:text-gray-100">Accesibilidad Global</span>
          </li>
          <li className="flex items-center">
            <BsCheckCircle className="text-blue-500 w-6 h-6 mr-2 dark:text-blue-300" />
            <span className="dark:text-gray-100">Control Total para Instituciones</span>
          </li>
          <li className="flex items-center">
            <BsCheckCircle className="text-blue-500 w-6 h-6 mr-2 dark:text-blue-300" />
            <span className="dark:text-gray-100">Sostenibilidad</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ExpertiseSection;
