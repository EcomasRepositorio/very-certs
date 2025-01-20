import React from "react";
import ScrollAnimation from "./scrollAnimation";

const NuestrosDiplomados = () => {
  return (
    <ScrollAnimation>
      <div className="flex flex-col md:flex-row items-center bg-transparent p-8 md:p-20 rounded-lg max-w-screen-xl mx-auto">
        {/* Contenedor de texto */}
        <div className="md:w-1/2 p-4 md:pr-8">
          <span className="bg-customBlue text-white py-1 px-4 rounded-full text-sm inline-block mb-4">
            NOSOTROS
          </span>
          <div className="text-3xl md:text-4xl font-extrabold text-gray-700 dark:text-white leading-tight mb-4">
            ¿ Cómo Funciona ?
          </div>
          <p className="text-gray-700 dark:text-gray-300 font-poppins mb-6 leading-relaxed">
            Verycerts conecta a instituciones y verificadores en un sistema
            seguro y eficiente, simplificando la emisión y verificación de
            certificados educativos.
          </p>
          <p className="text-gray-600 text-lg font-poppins font-bold dark:text-white mb-6">
            Para Instituciones Educativas
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-poppins">Registro y Configuración</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-poppins">Emisión</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-poppins">Gestión y Almacenamiento</span>
            </li>
          </ul>
          <p className="text-gray-600 font-poppins font-bold dark:text-white mb-6">
            Para Verificadores{" "}
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-poppins">Acceso al Portal</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-poppins">Verificación en Tiempo Real</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 text-xl mr-2">✔</span>
              <span className="font-poppins">Informes</span>
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
