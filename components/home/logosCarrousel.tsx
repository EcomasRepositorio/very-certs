import React, { useState } from "react";
import Image from "next/image";
import ScrollAnimation from "./scrollAnimation";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const cursosDestacados = [
  { id: 1, title: "ecomas", imageUrl: "/logosCa/ecomas-color.png" },
  { id: 2, title: "binex", imageUrl: "/logosCa/binex-color.png" },
  { id: 4, title: "rizo", imageUrl: "/logosCa/rizo-color.png" },
  { id: 5, title: "sayan", imageUrl: "/logosCa/sayan-color.png" },
  { id: 6, title: "cimade", imageUrl: "/logosCa/cimade-color.png" },
  { id: 7, title: "promas", imageUrl: "/logosCa/promas-color.png" },
  { id: 8, title: "inalta", imageUrl: "/logosCa/inalta-color.png" },
  { id: 9, title: "seveda", imageUrl: "/logosCa/seveda-color.png" },
];

const SwiperCursosDestacados = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 667 });

  const itemWidth = isMobile ? 120 : 200; // Tamaño de cada imagen
  const visibleWidth = isMobile ? 320 : 800; // Ancho del contenedor según la pantalla

  const duplicatedCursos = [...cursosDestacados, ...cursosDestacados];
  const totalWidth = itemWidth * duplicatedCursos.length;

  const containerVariants = {
    animate: {
      x: [0, -totalWidth / 2], // Desplazamiento continuo
      transition: {
        x: {
          repeat: Infinity, // Repetir indefinidamente
          repeatType: "loop", // Ciclo continuo
          duration: 20, // Duración total de un ciclo completo
          ease: "linear", // Movimiento lineal
        },
      },
    },
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cursosDestacados.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + cursosDestacados.length) % cursosDestacados.length
    );
  };

  return (
    <ScrollAnimation>
      <div className="rounded-lg p-8 md:p-5 flex flex-col items-center">
        <h2 className="text-primaryblue dark:text-white text-4xl font-extrabold mb-1"></h2>
      </div>
      {/* Contenedor principal */}
      <div
        className="relative overflow-hidden py-5 mx-auto"
        style={{ width: visibleWidth }}
      >
        <motion.div
          className="flex justify-center items-center"
          initial="animate" 
          animate="animate"
          variants={containerVariants}
          style={{
            transform: `translateX(calc(50% - ${itemWidth / 2}px))`,
            width: totalWidth,
          }}
        >
          {duplicatedCursos.map((curso, index) => (
            <motion.div
              key={index}
              className={`mr-2 rounded-2xl relative bg-transparent backdrop-blur-md transition-all ring-1  shadow hover:shadow-lg w-[${itemWidth}px] flex flex-col justify-center items-center`}
            >
              <div className="object-cover">
                <Image
                  src={curso.imageUrl}
                  alt="Imagen curso"
                  width={itemWidth}
                  height={itemWidth}
                  className="object-cover rounded-lg"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Botones de navegación solo en móvil */}
        {isMobile && (
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
            <button
              onClick={handlePrev}
              className="bg-transparent p-2 rounded-full shadow text-gray-800"
            >
              &#8592;
            </button>
            <button
              onClick={handleNext}
              className="bg-transparenta p-2 rounded-full shadow text-gray-800"
            >
              &#8594;
            </button>
          </div>
        )}
      </div>
    </ScrollAnimation>
  );
};

export default SwiperCursosDestacados;