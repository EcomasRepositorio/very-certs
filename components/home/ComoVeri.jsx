import React from "react";
import ScrollAnimation from "./scrollAnimation";

const NuestrosDiplomados = () => {
  return (
    <ScrollAnimation>
      <div className="flex flex-col md:flex-row items-center bg-transparent p-8 md:p-20 rounded-lg max-w-screen-xl mx-auto">
        {/* Contenedor de texto */}
        <div className="md:w-1/2 p-4 md:pr-8">
          <span className="text-blue-600 font-semibold uppercase text-sm tracking-wide mb-2 inline-block">
            NOSOTROS
          </span>
          <h1 className="text-4xl font-extrabold text-[#009FB2] leading-tight mb-4">
            Cómo Funciona Vericerts
          </h1>
          <p>
            Vericerts conecta a instituciones y verificadores en un sistema
            seguro y eficiente, simplificando la emisión y verificación de
            certificados educativos.
          </p> 
          <p className="text-gray-600 dark:text-white mb-6">
          Para Instituciones Educativas 
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-semibold">Registro y Configuración</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-semibold">Emisión</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-semibold">Gestión y Almacenamiento</span>
            </li>
          </ul>
          <p className="text-gray-600 dark:text-white mb-6">
          Para Verificadores          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-semibold">Acceso al Portal</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-semibold">Verificación en Tiempo Real</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-semibold">Informes</span>
            </li>
          </ul>
        </div>

        {/* Contenedor de imagen con botón de reproducción */}
        <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0 relative">
          <div className="relative lg:w-[500px] lg:max-w-md rounded-lg overflow-hidden shadow-lg md:lg:w-[300px]">
            <img
              src="/image/vericert1.webp" // Reemplaza esta ruta con la imagen que desees
              alt="Tech Solution Image "
              className="w-[500px] h-[500px] object-cover "
            />
           
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default NuestrosDiplomados;
