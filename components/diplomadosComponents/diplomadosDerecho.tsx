"use client";
import Curso from "./diplomadosAccordion";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

interface CursoData {
  id: string;
  area: string;
  titulo: string;
  imagen: string;
  fechaInicio: string;
  modalidad: string;
  duracion: string;
  horas: string;
  descripcion: string;
  modulos: string[];
}
const DiploDerecho = () => {
  const searchParams = useSearchParams();
  const cursoParam = searchParams.get("curso"); // Obtener el valor de 'curso' del URL

  // Crear un ref para cada curso
  const cursosRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  // Array de objetos que contienen los datos de cada curso
  const cursosData: CursoData[] = [
    {
      id: "perito-forense",
      area: "",
      titulo: "Perito Forense y Criminalistico",
      imagen: "/diplo/12.webp",
      fechaInicio: "01/09/2024",
      modalidad: "Virtual",
      duracion: "4 meses",
      horas: "420 horas correspondientes a 26 créditos.",
      descripcion:
        "Bachilleres y estudiantes universitarios y técnicos de los últimos ciclos de Psicología, medicina, tecnología médica, abogados; efectivos de las Fuerzas Armadas y la Policía Nacional del Perú; así como profesionales que ejercen la labor pericial, ya sea oficialmente o de manera particular.",
      modulos: [
        "Psicopatología de la violencia y perfiles criminales",
        "Criminalística y ciencias forenses en el proceso penal",
        "Medicina forense y autopsia médico legal",
        "Escena del crimen, cadena de custodia, metodología para indicios y evidencia ",
        "Grafotecnia",
        "Documentoscopia",
        "Dactiloscopia forense",
        "Balística forense",
        "Técnicas de laboratorio forense",
      ],
    },
    // Puedes agregar más cursos aquí si es necesario
  ];

  // Hook de efecto para hacer scroll al diplomado basado en el cursoParam
  useEffect(() => {
    if (cursoParam && cursosRefs.current[cursoParam]) {
      const targetElement = cursosRefs.current[cursoParam];
      if (targetElement) {
        const yOffset = -206; // Este valor crea el espacio de 96px en la parte superior
        const y = targetElement.getBoundingClientRect().top + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [cursoParam]);

  return (
    <div>
      {cursosData.map((curso, index) => (
        <div
          id={curso.id}
          key={index}
          ref={(el) => {
            if (el) {
              cursosRefs.current[curso.id] = el;
            }
          }}
        >
          <Curso curso={curso} />
        </div>
      ))}
    </div>
  );
};

export default DiploDerecho;

/* 
import React, { useState } from "react";
import Image from "next/image";
import ScrollAnimation from "./scrollAnimation";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

// Aquí deberías colocar las imágenes nuevas subidas
const cursosDestacados = [
  {
    id: 1,
    imageUrl: "/image/curso-claidad.webp", 
    
  },
  
  {
    id: 2,
    imageUrl: "/image/control_calidad.png", 
  },
  {
    id: 4,
    imageUrl: "/image/fertirriego.png", 
  },
  {
    id: 5,
    imageUrl: "/image/curso-claidad.webp", 
  },
  {
    id: 6,
    imageUrl: "/image/monitoreo.png", 
  },
  {
    id: 7,
    imageUrl: "/image/curso-claidad.webp", 
  },
  {
    id: 8,
    imageUrl: "/image/control_calidad.png", 
  },
];

const SwiperCursosDestacados = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 667 });

  const duplicatedCursos = [...cursosDestacados, ...cursosDestacados];
  const itemWidth = 450;
  const totalWidth = itemWidth * duplicatedCursos.length;

  const containerVariants = {
    animate: {
      x: [-totalWidth / 2, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 28,
          ease: "linear",
        },
      },
    },
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cursosDestacados.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cursosDestacados.length) % cursosDestacados.length);
  };

  return (
    <ScrollAnimation>
      <div className="rounded-lg p-8 md:p-5 flex flex-col items-center">
        <h2 className="text-primaryblue dark:text-white text-4xl font-extrabold mb-1">
          Nuestros Cursos Destacados
        </h2>
      </div>
      <div className="relative overflow-hidden py-5">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute left-0 top-0 w-1/5 h-full bg-gradient-to-r from-white to-transparent via-transparent dark:from-blackblue dark:to-transparent dark:via-transparent hidden md:block"></div>
          <div className="absolute right-0 top-0 w-1/5 h-full bg-gradient-to-l from-white to-transparent via-transparent dark:from-blackblue dark:to-transparent dark:via-transparent hidden md:block"></div>
        </div>

        <motion.div
          className="flex justify-center ml-3 md:justify-normal"
          animate={isMobile ? false : "animate"}
          variants={isMobile ? {} : containerVariants}
        >
          {isMobile
            ? cursosDestacados.map((curso, index) => (
                index === currentIndex && (
                  <motion.div
                    key={index}
                    className="px-10 dark:bg-blackblue2 dark:ring-0 py-4 mr-3 rounded-2xl relative p-2 bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[450px] max-w-lg flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5"
                  >
                    <div className="object-cover">
                      <div className="p-2 rounded-lg">
                        <Image
                          src={curso.imageUrl}
                          alt="Imagen curso"
                          width={600} 
                          height={700} 
                          className="object-cover rounded-lg w-full"
                        />
                      </div>
                     
                    </div>
                  </motion.div>
                )
              ))
            : duplicatedCursos.map((curso, index) => (
                <motion.div
                  key={index}
                  className="dark:bg-blackblue2 dark:ring-0  mr-4 rounded-2xl relative bg-gray-50/60 backdrop-blur-md transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg w-[350px] max-w-lg flex flex-col justify-between snap-start snap-always shrink-0 first-of-type:scroll-m-10 scroll-m-5"
                >
                  <div className="object-cover">
                    <div className=" rounded-lg">
                      <Image
                        src={curso.imageUrl}
                        alt="Imagen curso"
                        width={600} 
                        height={700} 
                        className="object-cover rounded-lg w-full"
                      />
                    </div>
                    
                  </div>
                </motion.div>
              ))}
        </motion.div>

        {isMobile && (
          <div className="flex justify-center">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-40 text-gray-800 dark:text-blue-50 px-4 py-10"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-40 text-gray-800 dark:text-blue-50 px-4 py-10"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </ScrollAnimation>
  );
};

export default SwiperCursosDestacados;

*/