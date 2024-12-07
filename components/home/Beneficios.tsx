import React from "react";

const SecurityFeatureWithImage = () => {
  return (
    <section id='servicios'>
    <section className="flex flex-col md:flex-row items-center bg-transparent text-white dark:text-white p-10 md:p-20">
      {/* Contenedor de la imagen */}
      <div className="flex-shrink-0 w-full md:w-1/2 mb-8 md:mb-0 md:mr-8">
        <div className="lg:ml-20 md:ml-10  sm:md-5 xl:ml-0 2xl:ml-40 md:w-[350px] md:h-[350px]   lg:w-[400px] lg:h-[400px] xl:w-[600px] xl:h-[600px]  2xl:w-[600px] 2xl:h-[600px]   bg-transparent rounded-lg overflow-hidden flex items-center justify-center relative">
          {/* Imagen con tamaño limitado */}
          <img
            src="image/about1.png"
            alt="Security Icon"
            className="max-w-[90%] max-h-[90%] object-contain "
          />
        </div>
      </div>

      {/* Contenedor del contenido */}
      <div className="text-left md:w-1/2 max-w-lg">
        <span className="bg-[#009FB2] dark:bg-[#1B2A48] text-white py-1 px-4 rounded-full text-sm inline-block mb-4">
          SERVICIOS
        </span>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-gray-700 dark:text-white">
          Beneficios de Verificar con Vericerts
        </h1>
        <div className="space-y-4 text rounded-lg">
          <FeatureItem
            title="Confianza"
            description="Vericerts trabaja con instituciones educativas acreditadas, lo que asegura la autenticidad de cada documento emitido."
          />
          <FeatureItem
            title="Simplicidad"
            description="La verificación es rápida y accesible desde cualquier dispositivo con conexión a internet."
          />
          <FeatureItem
            title="Seguridad"
            description="Todos los datos están protegidos mediante encriptación, asegurando que la información sea confiable y no pueda ser manipulada."
          />
        </div>
      </div>
    </section>
    </section>
  );
};

// Aplicar hover directamente aquí
const FeatureItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex items-start bg-[#009FB2] dark:bg-[#1B2A48] p-4 rounded-lg hover:bg-[#3c424d] transition-colors duration-300">
    <span className="text-green-400 text-xl mr-3">✔</span>
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  </div>
);

export default SecurityFeatureWithImage;
