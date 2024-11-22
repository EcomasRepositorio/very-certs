"use client";

import React, { useState } from "react";

const Graduate = () => {
  const [activeSections, setActiveSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setActiveSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s !== section)
        : [...prevSections, section]
    );
  };

  const blogPosts = [
    {
      title:
        "Descubre ECOMÁS, tu destino para diplomados y cursos especializados que impulsan tu desarrollo profesional. Explora más de 70 diplomados y únete a nuestra comunidad de aprendizaje práctico y avanzado. ¡Empieza hoy!",
      date: "February 15, 2024",
      category: "ECOMAS",
      image: "/image/ecomas.webp",
    },
    {
      title:
        "RIZO proporciona cursos y diplomados especializados en ingeniería y más, con educación flexible a tu medida y precios accesibles. ¡Capacítate con expertos y avanza en tu carrera!",
      date: "February 15, 2024",
      category: "RIZO",
      image: "/image/rizo.webp",
    },
    {
      title:
        "CIMADE ofrece diplomados y certificaciones para profesionales en áreas como manejo ambiental y seguridad alimentaria. Su página web clara y organizada facilita el acceso a cursos y contactos, posicionando a CIMADE como un socio esencial en el desarrollo profesional.",
      date: "February 15, 2024",
      category: "CIMADE",
      image: "/image/cimade.webp",
    },
    {
      title:
        "A significant shift in mindset is required to support other type of side project.",
      date: "February 15, 2024",
      category: "Security",
      image: "/image/4.jpg",
    },
    {
      title:
        "Population change anything what your need for your next generation.",
      date: "February 15, 2024",
      category: "Security",
      image: "/image/5.jpg",
    },
    {
      title:
        "How to improve your business so that you can stay in your local business.",
      date: "February 15, 2024",
      category: "Security",
      image: "/image/6.jpg",
    },
  ];

  return (
    <section id="/cursos">
      {/* Header */}
      <div className="relative pt-20 pb-10 bg-[url('/image/inst-fond.jpg')] bg-cover bg-center bg-no-repeat bg-black opacity-50">
        <div className="relative mx-auto inset-0 flex flex-col justify-center items-center text-center text-gray-800 px-4 mt-40">
          <h1 className="font-extrabold text-4xl lg:text-6xl mt-10 text-black">
            INSTITUCIONES AFILIADAS
          </h1>
          <p className="mt-2 text-lg md:text-2xl text-black mb-20">
            Conoce nuestras instituciones afiliadas y aliadas estratégicas.
          </p>
        </div>
      </div>

      {/* Blog Section */}
      <div className="p-10 bg-[#16213e]">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-[#1e2a47] rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {/* Fixed height for images */}
              <div className="h-80">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Text Content */}
              <div className="flex flex-col justify-between flex-grow p-6">
                <div>
                  <p className="text-sm text-blue-400">{post.category}</p>
                  <p className="text-sm text-gray-400">{post.date}</p>
                  <h2 className="text-lg font-bold text-white mt-2">
                    {post.title}
                  </h2>
                </div>
                <a
                  href="#"
                  className="text-blue-500 mt-4 inline-block hover:underline"
                >
                  View Details &gt;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Graduate;
