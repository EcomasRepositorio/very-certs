import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";


const slides = [
  {
    id: 1,
    title: "ecomas",
    lightImage: "/logosCa/ecomas-color.png",
    darkImage: "/logosCa/ecomas-dark.png",
  },
  {
    id: 2,
    title: "binex",
    lightImage: "/logosCa/binex-color.png",
    darkImage: "/logosCa/binex-dark.png",
  },
  {
    id: 3,
    title: "rizo",
    lightImage: "/logosCa/rizo-color.png",
    darkImage: "/logosCa/rizo-dark.png",
  },
  {
    id: 5,
    title: "sayan",
    lightImage: "/logosCa/sayan-color.png",
    darkImage: "/logosCa/sayan-dark.png",
  },
  {
    id: 6,
    title: "cimade",
    lightImage: "/logosCa/cimade-color.png",
    darkImage: "/logosCa/dark-cimade.png",
  },
  {
    id: 7,
    title: "promas",
    lightImage: "/logosCa/promas-color.png",
    darkImage: "/logosCa/promas-dark.png",
  },
  {
    id: 8,
    title: "inalta",
    lightImage: "/logosCa/inalta-color.png",
    darkImage: "/logosCa/inalta-dark.png",
  },
  {
    id: 9,
    title: "seveda",
    lightImage: "/logosCa/seveda-color.png",
    darkImage: "/logosCa/seveda-dark.png",
  },
];



const ImageCarrousel = () => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const duplicatedSlides = [...slides, ...slides];
  const itemWidth = 100;
  const totalWidth = itemWidth * duplicatedSlides.length;

  const containerVariants = {
    animate: {
      x: [0, -totalWidth / 4],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 6,
          ease: "linear",
        },
      },
    },
  };

  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 2 } },
      }}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden pb-12 mx-auto w-full sm:w-1/2 mt-20"
    >
      {/* Gradiente aplicado al carrusel */}
      <div className="absolute inset-0 z-10 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-[#e0f9f6] dark:before:from-fondDark dark:after:from-fondDark before:to-transparent before:filter before:blur-3 after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-[#e0f9f6] after:to-transparent after:filter after:blur-3"></div>

      <motion.div
        className="flex"
        variants={containerVariants}
        animate="animate"
      >
        {duplicatedSlides.map((slide, index) => (
          <div
            key={index}
            className="bg-transparent max-h-40 flex items-center justify-center mr-16"
          >
            <div className="w-32 h-32 flex items-center justify-center border-0.5 border-gray-300 rounded-md bg-transparent shadow-md">
              <Image
                alt={slide.title}
                src={resolvedTheme === "dark" ? slide.darkImage : slide.lightImage}
                width={128}
                height={128}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ImageCarrousel;