import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const cursosDestacados = [
  {
    id: 1,
    imageUrl: "/image/seguridad2.webp",
    title: "Seguridad y Cumplimiento:",
    description:
      "Usamos encriptación avanzada para proteger los datos y cumplimos con normativas internacionales como el GDPR.",
  },
  {
    id: 2,
    imageUrl: "/image/soporte.webp",
    title: "Soporte y Atención al Cliente",
    description:
      "Ofrecemos soporte técnico por correo electrónico, chat en línea, y teléfono, además de consultoría personalizada para instituciones grandes",
  },
  {
    id: 3,
    imageUrl: "/image/planes.webp",
    title: "Planes de Suscripción",
    description:
      "Ofrecemos planes de suscripción variados, desde básicos hasta premium, diseñados para satisfacer las necesidades específicas de cada institución.",
  },
];

const SwiperCursosDestacados = () => {
  return (
    <section className="bg-transparent py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-blue-600 font-semibold uppercase">
          Seguridad y Soporte
        </p>
        <h2 className="text-4xl font-bold">
          Garantizando Seguridad y Flexibilidad en Nuestros Servicios
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
        {cursosDestacados.map((curso) => {
          // Construimos dinámicamente el mensaje para WhatsApp
          const whatsAppLink = `https://api.whatsapp.com/send?phone=&text=${encodeURIComponent(
            `Hola, vengo de la página de Ecomás y me gustaría obtener información sobre "${curso.title}".`
          )}`;

          return (
            <motion.div
              key={curso.id}
              className="bg-white dark:bg-[#1a0e4b] p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-2">{curso.title}</h3>
              <p className="text-gray-600 mb-4">{curso.description}</p>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold inline-flex items-center mt-2"
              >
                Más información
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </a>
              <div className="bg-transparent w-full h-auto flex items-center justify-center mb-4 mt-4 sm:w-[300px] sm:h-[200px]">
                <Image
                  src={curso.imageUrl}
                  alt={curso.title}
                  width={400}
                  height={300}
                  className="object-cover rounded-lg sm:w-full sm:h-full"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default SwiperCursosDestacados;
