"use client";

import React, { useState, useRef, useEffect } from "react";
import SearchDNI from "@/components/certificate/SearchDNI"; // Importar el componente SearchDNI
import SearchCode from "@/components/certificate/SearchCode"; // Importar el componente SearchDNI
import SearchName from "@/components/certificate/SearchName"; // Importar el componente SearchDNI

// Componente para el video en cámara lenta
const SlowVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // Reduce la velocidad del video al 50%
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
      src="/image/fond-cert.mp4"
      autoPlay
      loop
      muted
      playsInline
    ></video>
  );
};

// Componente principal
const TestingPage: React.FC = () => {
  const [searchType, setSearchType] = useState("document"); // Estado para controlar el tipo de búsqueda
  const [inputValue, setInputValue] = useState(""); // Estado para almacenar el valor ingresado
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para manejar errores

  // Funciones para manejar la búsqueda
  const onSearchDNI = (dni: string) => {
    console.log(`Buscando por DNI: ${dni}`);
    // Simulación de error
    if (!dni || dni.length < 8) {
      setErrorMessage("El DNI que ingresaste no se encuentra en nuestra base de datos.");
    } else {
      setErrorMessage(null);
    }
  };

  const onSearchCode = (code: string) => {
    console.log(`Buscando por Código: ${code}`);
    if (!code) {
      setErrorMessage("El código que ingresaste no es válido.");
    } else {
      setErrorMessage(null);
    }
  };

  const onSearchName = (name: string) => {
    console.log(`Buscando por Nombre: ${name}`);
    if (!name) {
      setErrorMessage("El nombre ingresado no se encuentra en nuestra base de datos.");
    } else {
      setErrorMessage(null);
    }
  };

  // Renderiza dinámicamente el input según el tipo de búsqueda seleccionado
  const renderSearchComponent = () => {
  switch (searchType) {
    case "document":
      return (
        <SearchDNI
          onSearchDNI={(data) => {
            console.log("Data recibida desde SearchDNI:", data);
            // Aquí puedes manejar los datos enviados por SearchDNI
          }}
        />
      );
    case "code":
      return (
        <SearchCode
        onSearchCode={(data) => {
            console.log("Data recibida desde SearchDNI:", data);
            // Aquí puedes manejar los datos enviados por SearchDNI
          }}
        />
      );
    case "name":
      return (
        <SearchName
        onSearchName={(data) => {
            console.log("Data recibida desde SearchDNI:", data);
            // Aquí puedes manejar los datos enviados por SearchDNI
          }}
        />
      );
    default:
      return null;
  }
};


  // Lógica para manejar la acción del botón de búsqueda
  const handleSearch = () => {
    if (searchType === "document") {
      onSearchDNI(inputValue);
    } else if (searchType === "code") {
      onSearchCode(inputValue);
    } else if (searchType === "name") {
      onSearchName(inputValue);
    }
  };

  return (
    <section className="relative min-h-screen w-full">
      {/* Video de fondo */}
      <SlowVideo />

      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Mensaje de error */}
      {errorMessage && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-md text-center">
          <h3 className="font-bold text-lg">DNI incorrecto</h3>
          <p>{errorMessage}</p>
          <button
            onClick={() => setErrorMessage(null)}
            className="absolute top-2 right-2 text-white font-bold"
          >
            ✖
          </button>
        </div>
      )}

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Título */}
        <div className="text-center mb-8 mt-96">
          <h2 className="text-3xl font-bold text-white mb-4 md:text-4xl">
            VERIFICAR CERTIFICADO
          </h2>
          <p className="text-white text-lg">
            Verifica la validez de tu certificado introduciendo tu DNI,
          </p>
          <p className="text-white text-lg">
            nombre completo o código de certificado. Nos esforzamos en proteger
            la privacidad
          </p>
          <p className="text-white text-lg">
            y el manejo confidencial de tus datos personales.
          </p>
        </div>

        {/* Contenedor del buscador */}
        <div className="flex flex-col sm:flex-row items-center gap-2 max-w-3xl w-full bg-transparent shadow-lg rounded-lg p-4">
          <select
            className="form-select bg-white rounded-lg p-3 text-gray-700 w-full sm:w-auto"
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="document">Buscar por DNI</option>
            <option value="code">Buscar por Código</option>
            <option value="name">Buscar por Nombre</option>
          </select>

          <div className="flex flex-col sm:flex-row gap-2 w-full">
            {renderSearchComponent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestingPage;
