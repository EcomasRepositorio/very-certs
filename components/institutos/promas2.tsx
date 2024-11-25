import React, { useState } from "react";

const PromasSection = () => {
  const cards = [
    {
      title: "Impulsa tu Futuro con PROMÁS",
      description:
        "Accede a cursos y diplomados diseñados para potenciar tus habilidades profesionales en ingeniería, medio ambiente, y más. Aprende desde cualquier lugar con clases en vivo y contenidos de alta calidad.",
      overlayTitle: "Educación de Clase Mundial",
      overlayDescription:
        "Explora nuevas oportunidades con programas educativos estratégicos y actualizados según las últimas tendencias del mercado laboral.",
      features: ["Calidad garantizada", "Formación especializada"],
      link: "https://www.promas.edu.pe/",
    },
    {
      title: "RENUEVA TU CARRERA PROFESIONAL",
      description:
        "Actualiza tus conocimientos y mantente a la vanguardia en tu campo. Nuestros programas están diseñados para abordar los desafíos más relevantes del sector profesional.",
      overlayTitle: "Crecimiento Innovador",
      overlayDescription:
        "Descubre soluciones educativas que se adaptan a las necesidades de un mercado en constante cambio.",
      features: ["Programas flexibles", "Soporte integral"],
      link: "https://wa.me/51984040264?text=Hola, podria darme mas informacion sobres los diplomados disponibles",
    },
    {
      title: "DESARROLLO EN INGENIERÍA Y AMBIENTE",
      description:
        "Conoce los últimos avances en ingeniería civil, ambiental, riego y fertilización, entre otros, con cursos enfocados en prácticas modernas y sostenibles.",
      overlayTitle: "Especialízate Hoy",
      overlayDescription:
        "Conviértete en un experto con programas de formación diseñados por líderes de la industria.",
      features: ["Prácticas sostenibles", "Formación líder"],
      link: "https://wa.me/51984040264?text=Hola, podria darme mas informacion sobres los cursos disponibles",
    },
  ];

  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveCard(index);
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center relative">
      {/* Imagen para pantallas grandes */}
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center md:bg-contain bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/image/promasfon.png')",
        }}
      ></div>

      {/* Imagen para móviles */}
      <div
        className="absolute inset-0 block md:hidden bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/image/ecomasfond-mobile.png')",
        }}
      ></div>

      <div className="z-10 relative">
        <div className="flex flex-wrap justify-center gap-8 text-black">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative group w-80 bg-white rounded-lg h-96 shadow-lg overflow-hidden cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* White Card */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-transform duration-300 ${
                  activeCard === index ? "translate-y-full" : "translate-y-0"
                } bg-gradient-to-r from-primary via-secondary to-tertiary bg-200% animate-gradient-move`}
              >
                <h3 className="text-xl font-bold text-center">{card.title}</h3>
                <p className="text-center text-sm mt-2">{card.description}</p>
              </div>

              {/* Black Card */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-between bg-black text-white p-6 transition-transform duration-300 ${
                  activeCard === index ? "translate-y-0" : "-translate-y-full"
                }`}
              >
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-bold text-center">
                    {card.overlayTitle}
                  </h3>
                  <p className="text-center text-sm mt-4">
                    {card.overlayDescription}
                  </p>
                </div>

                <div className="border-t border-gray-600 mt-6 pt-4 w-full flex items-center justify-between">
                  {/* Características a la izquierda */}
                  <div>
                    {card.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="text-sm mt-2">
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Botón a la derecha */}
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition text-center"
                  >
                    Más Info
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromasSection;
