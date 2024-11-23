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
      image: "/image/ecomas2.webp",
      link: "https://ecomas.pe/", // Agregar enlace aquí si disponible
    },
    {
      title:
        "RIZO proporciona cursos y diplomados especializados en ingeniería y más, con educación flexible a tu medida y precios accesibles. ¡Capacítate con expertos y avanza en tu carrera!",
      date: "February 15, 2024",
      category: "RIZO",
      image: "/image/rizo2.webp",
      link: "https://rizo.edu.pe/",
    },
    {
      title:
        "CIMADE ofrece cursos y diplomados en manejo ambiental y seguridad, diseñados para tu crecimiento profesional. Con precios accesibles y flexibilidad educativa, ¡capacítate en CIMADE y avanza en tu carrera!",
      date: "February 15, 2024",
      category: "CIMADE",
      image: "/image/cimade.webp",
      link: "https://cimade.edu.pe/",
    },
    {
      title:
        "PROMAS ofrece una amplia gama de diplomados y cursos en ingeniería, gestión ambiental y más, diseñados para adaptarse a tus necesidades profesionales. Con métodos de enseñanza flexibles y costos competitivos, PROMAS te prepara con expertos del sector para que logres tus objetivos de carrera. ¡Capacítate en PROMAS y toma el control de tu desarrollo profesional!",
      date: "February 15, 2024",
      category: "PROMAS",
      image: "/image/promas.webp",
      link: "https://www.promas.edu.pe/",
    },
    {
      title:
        "BINEX ofrece cursos y diplomados en ingeniería, arqueología vial y más, adaptados a las necesidades del mercado actual. Con opciones de estudio en línea, BINEX permite a los profesionales capacitarse desde cualquier lugar, promoviendo una educación flexible y accesible. ¡Avanza en tu carrera con BINEX!",
      date: "February 15, 2024",
      category: "binex",
      image: "/image/binex.webp",
      link: "https://binex.edu.pe/",
    },
    {
      title:
        "Explora y certifícate con SAYAN, tu aliado en el camino hacia el éxito profesional. Ofrecemos una amplia variedad de cursos y diplomados en áreas críticas como manejo de residuos sólidos, calidad ambiental y gestión de proyectos. Con SAYAN, alcanza nuevos límites en tu carrera a través de un aprendizaje innovador y práctico, disponible completamente en línea. ¡Únete a más de 7,000 estudiantes que han transformado su futuro profesional con nosotros!",
      date: "February 15, 2024",
      category: "SAYAN",
      image: "/image/sayan.webp",
      link: "https://sayan.edu.pe/",
    },

    {
      title:
        "¡Transforma tu futuro con SEVEDA! Descubre cursos y diplomados que abren puertas a nuevas oportunidades en un mundo que evoluciona rápidamente. ¡Inscríbete hoy y construye un mundo mejor!",
      date: "February 15, 2024",
      category: "SEVEDA",
      image: "/image/seveda.webp",
      link: "https://seveda.edu.pe/",
    },
    {
      title:
        "¡Impulsa tu futuro con INALTA! Descubre cursos y diplomados que abren caminos hacia oportunidades ilimitadas en campos críticos como ingeniería, gestión ambiental y más. ¡Únete a INALTA y lidera la transformación del mañana!",
      date: "February 15, 2024",
      category: "INALTA",
      image: "/image/inalta.jpg",
      link: "https://inalta.edu.pe/",
    },
  ];

  return (
    <section id="/cursos">
      {/* Header */}
      <div className="relative pt-20 pb-10 bg-[url('/image/inst-fond.jpg')] bg-cover bg-center bg-no-repeat  dark:bg-black dark:opacity-70 ">
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
      <div className="p-10 bg-[#e0f9f6] dark:bg-fondDark ">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-[#009FB2] dark:bg-[#1e2a47] rounded-lg shadow-md overflow-hidden flex flex-col"
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
                {post.link ? (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4"
                  >
                    <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition md:ml-[120px] ls:ml-2" >
                      Ver página
                    </button>
                  </a>
                ) : (
                  <button
                    disabled
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg cursor-not-allowed mt-4"
                  >
                    No disponible
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Graduate;
