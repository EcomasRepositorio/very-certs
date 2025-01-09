"use client";

import React, { Suspense, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

const SearchCode = dynamic(
  () => import("@/components/certificate/SearchCode"),
  {
    suspense: true,
  }
);
const SearchDNI = dynamic(() => import("@/components/certificate/SearchDNI"), {
  suspense: true,
});
const SearchName = dynamic(
  () => import("@/components/certificate/SearchName"),
  { suspense: true }
);
const SearchQR = dynamic(() => import("@/components/certificate/SearchQR"), {
  suspense: true,
});
const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1; // Reproduce el video a la mitad de la velocidad normal
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
      src="/image/fond2.mp4" // Cambia esta ruta a tu video
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

const TestingPage: React.FC = () => {
  const handleSearch = (data: any) => {
    console.log(data);
  };

  return (
    <section className="relative min-h-screen w-full">
      {/* Video de fondo */}
      <VideoBackground />

      {/* Superposición transparente */}
      <div className="absolute inset-0 bg-[#009FB2] opacity-30"></div>

      {/* Contenido principal */}
      <div className="relative py-12 mx-auto max-w-screen-lg px-4 w-full">
        <div className="bg-transparent rounded-lg shadow-lg p-8 md:p-12 mb-12 w-full mt-56">
          {/* Título */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-100 mb-6 md:text-4xl">
              VERIFICAR CERTIFICADO
            </h2>
            <p className="text-gray-100 text-lg mb-8">
              Verifica la validez de tu certificado introduciendo tu DNI, nombre
              completo o código de certificado. Nos esforzamos en proteger la
              privacidad y el manejo confidencial de tus datos personales.
            </p>

            {/* Pestañas */}
            <Tabs
              aria-label="Opciones de búsqueda"
              color="secondary"
              classNames={{
                tabList:
                  "w-full flex flex-col md:flex-row bg-transparent border border-gray-300/40",
                cursor: "bg-transparent text-gray-100",
                tab: "py-2 px-4 rounded-t-lg text-gray-100",
                tabContent:
                  "group-data-[selected=true]:text-gray-100 text-g-100  ",
              }}
            >
              <Tab key="dni" title="Buscar por DNI">
                <Suspense fallback={<div className="loader">Cargando...</div>}>
                  <Card>
                    <CardBody className=" bg-white w-full">
                      <SearchDNI onSearchDNI={handleSearch} />
                    </CardBody>
                  </Card>
                </Suspense>
              </Tab>
              <Tab key="code" title="Buscar por Código">
                <Suspense fallback={<div className="loader">Cargando...</div>}>
                  <Card>
                    <CardBody className="bg-white w-full">
                      <SearchCode onSearchCode={handleSearch} />
                    </CardBody>
                  </Card>
                </Suspense>
              </Tab>
              <Tab key="name" title="Buscar por Nombres">
                <Suspense fallback={<div className="loader">Cargando...</div>}>
                  <Card>
                    <CardBody className="bg-white  w-full">
                      <SearchName onSearchName={handleSearch} />
                    </CardBody>
                  </Card>
                </Suspense>
              </Tab>
              <Tab key="qr" title="Buscar por QR">
                <Suspense fallback={<div className="loader">Cargando...</div>}>
                  <Card>
                    <CardBody className="bg-white w-full">
                      <SearchQR />
                    </CardBody>
                  </Card>
                </Suspense>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestingPage;
