import React from "react";
import ScrollAnimation from "./scrollAnimation";
import {
  Settings,
  FileText,
  Database,
  Globe,
  CheckCircle,
  BarChart2,
} from "lucide-react"; // Importamos íconos necesarios

const NuestrosDiplomados = () => {
  return (
    <ScrollAnimation>
      <div className="flex flex-col md:flex-row items-center bg-transparent p-6 sm:p-8 md:p-20 rounded-lg max-w-screen-xl mx-auto space-y-8 md:space-y-0">
        {/* Contenedor de texto */}
        <div className="md:w-1/2 p-4 md:pr-8 text-center md:text-left">
          <span className="bg-customBlue text-white py-1 px-4 rounded-full text-sm inline-block mb-4">
            NOSOTROS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-700 dark:text-white leading-tight mb-6">
            ¿Cómo Funciona?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 font-poppins mb-6 leading-relaxed">
            Verycerts conecta a instituciones y verificadores en un sistema
            seguro y eficiente, simplificando la emisión y verificación de
            certificados educativos.
          </p>
          <h3 className="text-gray-600 text-lg font-poppins font-bold dark:text-white mb-4">
            Para Instituciones Educativas
          </h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <Settings className="text-customBlue text-xl mr-2" />
              <span className="font-poppins">Registro y Configuración</span>
            </li>
            <li className="flex items-center">
              <FileText className="text-customBlue  text-xl mr-2" />
              <span className="font-poppins">Emisión</span>
            </li>
            <li className="flex items-center">
              <Database className="text-customBlue text-xl mr-2" />
              <span className="font-poppins">Gestión y Almacenamiento</span>
            </li>
          </ul>
          <h3 className="text-gray-600 font-poppins font-bold dark:text-white mb-4">
            Para Verificadores
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Globe className="text-customBlue  text-xl mr-2" />
              <span className="font-poppins">Acceso al Portal</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-customBlue  text-xl mr-2" />
              <span className="font-poppins">Verificación en Tiempo Real</span>
            </li>
            <li className="flex items-center">
              <BarChart2 className="text-customBlue text-xl mr-2" />
              <span className="font-poppins">Informes</span>
            </li>
          </ul>
        </div>

        {/* Contenedor de video */}
        <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0 relative">
          <div className="relative lg:w-[500px] lg:max-w-md rounded-none overflow-hidden  md:lg:w-[300px]">
            <img
              src="/certificate/image/test.webp" // Reemplaza esta ruta con la imagen que desees
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
