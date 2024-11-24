"use client";

import React from "react";
import promas from "@/components/institutos/promas";

const Graduate = () => {
  return (
    <section id="/cursos">
      {/* Header con video */}
      <div className="relative">
        <video autoPlay loop muted className="w-full h-[500px] object-cover ">
          <source src="/videos/fondvid.mp4" type="video/mp4" />
          Tu navegador no soporta videos.
        </video>
        <div className=" absolute inset-0 flex items-center justify-center  ">
          <h1 className="text-5xl font-extrabold text-white text-center ">
            NUESTRAS EMPRESAS AFILIADAS
          </h1>
        </div>
      </div>
      
{/*       { id: "GraduateIngVial", title: "CURSOS EN INGENIERIA VIAL", content: <promas /> },
 */}
      {/* Bloque negro con fondo degradado */}
      <div className="bg-black text-white py-[500px] flex items-center justify-center relative">
        {/* Imagen para pantallas grandes */}
        <div
          className="absolute inset-0 hidden md:block bg-cover bg-center md:bg-contain bg-no-repeat"
          style={{
            backgroundImage: "url('/image/ecomasfond.png')",
          }}
        ></div>

        {/* Imagen para móviles */}
        <div
          className="absolute inset-0 block md:hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/image/ecomasfond-mobile.png')",
          }}
        ></div>

        {/* Botón */}
        <a
          href="https://ecomas.pe"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white md:sinimg   lg:top-40 lg:left-[-100px]  xl:top-60 xl:left-[-170px] - px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition 
        relative z-10 text-center"
        >
          Ir a la página
        </a>
      </div>



      {/*  */}
      {/* Sección de ayuda */}
      <div className="bg-white bg-[url('/image/promasfon.png')] py-64">
        <h2 className="text-3xl font-bold text-center mb-12">PROMAS </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-2xl font-bold mb-4">END-TO-END INNOVATION</h3>
            <p>
              Comprehensive solutions for all your development needs, from idea
              to execution.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-2xl font-bold mb-4">PRODUCT RENOVATION</h3>
            <p>
              Reinventing your existing products for better sustainability and
              impact.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-2xl font-bold mb-4">FLAVOR AND TEXTURE</h3>
            <p>
              Advanced flavor and texture development using cutting-edge AI
              technology.
            </p>
          </div>
        </div>
      </div>

      {/* Sección de innovación */}
      <div className="bg-black text-white py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          THE INNOVATION ENGINE DRIVING IT ALL FORWARD. ONLY FROM NOTCO.
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <img
              src="/images/ai-engine.png"
              alt="AI Engine"
              className="w-full h-auto mb-4"
            />
            <h3 className="text-xl font-bold">GIUSEPPE</h3>
            <p>
              Our patented AI platform that accelerates product development and
              brings bold ideas to life.
            </p>
          </div>
          <div className="text-center">
            <img
              src="/images/rd-team.png"
              alt="R&D Team"
              className="w-full h-auto mb-4"
            />
            <h3 className="text-xl font-bold">SCIENCE AND R&D</h3>
            <p>
              Industry experts working to ensure every product is the best it
              can be.
            </p>
          </div>
          <div className="text-center">
            <img
              src="/images/solutions.png"
              alt="Solutions"
              className="w-full h-auto mb-4"
            />
            <h3 className="text-xl font-bold">REAL-WORLD SOLUTIONS</h3>
            <p>
              Turning challenges into opportunities for sustainable innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonios */}
      <div className="bg-white py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          SEE HOW WE HAVE HELPED OTHERS.
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <img
              src="/images/product-1.jpg"
              alt="Product 1"
              className="w-full h-auto mb-4 rounded-lg"
            />
            <h3 className="text-xl font-bold">HOTCAKES</h3>
            <p>Delicious hotcakes without compromising on taste.</p>
          </div>
          <div className="text-center">
            <img
              src="/images/product-2.jpg"
              alt="Product 2"
              className="w-full h-auto mb-4 rounded-lg"
            />
            <h3 className="text-xl font-bold">NOT MILK BARISTA</h3>
            <p>Perfect for coffee, crafted for sustainability.</p>
          </div>
          <div className="text-center">
            <img
              src="/images/product-3.jpg"
              alt="Product 3"
              className="w-full h-auto mb-4 rounded-lg"
            />
            <h3 className="text-xl font-bold">MYNOTCOOP</h3>
            <p>
              A platform for collaboration and idea-sharing among the best minds
              in the industry.
            </p>
          </div>
        </div>
      </div>

      {/* Footer con formulario */}
      <div className="bg-black text-white py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          JOIN OUR NEWSLETTER
        </h2>
        <form className="max-w-lg mx-auto">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Message"
              className="p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Graduate;
