import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const soporte = [
  {
    id: 1,
    imageUrl: "/image/solidos.jpg",
    title: "Auto Fixers",
    description: "A car repair is a service provided to fix any issues or damages with your vehicle.",
  },
  {
    id: 2,
    imageUrl: "/image/aspersor.jpg",
    title: "Mechanic Masters",
    description: "A car repair is a service provided to fix any issues or damages with your vehicle.",
  },
  {
    id: 3,
    imageUrl: "/image/goteo.jpg",
    title: "Drive-In Garage",
    description: "A car repair is a service provided to fix any issues or damages with your vehicle.",
  },
];

const segSuport = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-red-500 font-semibold uppercase">Latest Service</p>
        <h2 className="text-4xl font-bold">Professional Car Repair The Best Services</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
        {cursosDestacados.map((curso) => (
          <motion.div
            key={curso.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-red-500 w-16 h-16 flex items-center justify-center rounded-full mb-4">
              <Image
                src={curso.imageUrl}
                alt={curso.title}
                width={60}
                height={60}
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{curso.title}</h3>
            <p className="text-gray-600 mb-4">{curso.description}</p>
            <a
              href="#"
              className="text-red-500 font-semibold inline-flex items-center"
            >
              Read More
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default segSuport;
