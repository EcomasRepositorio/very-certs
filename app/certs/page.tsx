"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import useCounterStore from "@/store/counterStore";
import "./Style.css";

const SearchCode = dynamic(() => import("@/components/certificate/SearchCode"));
const SearchDNI = dynamic(() => import("@/components/certificate/SearchDNI"));
const SearchName = dynamic(() => import("@/components/certificate/SearchName"));

interface Props {}

const TestingPage: React.FC<Props> = () => {
  const { validatedCount } = useCounterStore();

  const handleSearch = (data: any) => {
    console.log("Search data:", data);

    // Actualiza el valor de validatedCount usando el store
    if (data && data.count) {
      useCounterStore.getState().setCount(data.count);
    }
  };

  return (
    <section className=" bg-fixed  " style={{}}>
      <div className="relative">
        {/* Imagen para modo Light */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed dark:hidden"
          style={{
            backgroundImage: "url(/certificate/image/blue_bg_5.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Imagen para modo Dark */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed hidden dark:block"
          style={{
            backgroundImage: "url(/certificate/image/test_bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="py-8 mx-auto max-w-screen-xl lg:py-10">
          <div style={{ position: "relative", width: "100%" }}>
            <div className="bg-transparent backdrop-blur-sm border border-white/30 rounded-lg p-4 sm:p-6 md:p-8 lg:p-12 mx-2">
              <div className="flex flex-col items-center justify-center mx-auto px-4 py-8 max-w-screen-xl gap-6 md:flex-row md:gap-12">
                {/* Left Section */}

                <div className="w-full md:mr-12 flex-1">
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-extrabold text-center text-white lg:text-4xl">
                      VERIFICAR CERTIFICADO
                    </h1>
                    <p className="text-white font-poppins text-center md:text-lg mb-6 lg:mb-8"></p>

                    <Tabs
                      aria-label="Options"
                      color="primary"
                      classNames={{
                        tabList:
                          "w-full flex flex-col md:flex-row bg-transparent rounded-md border border-gray-300/40",
                        cursor:
                          "bg-customBlue dark:bg-[#240c60] rounded-md border border-white/70 text-gray-100",
                        tab: "py-2 px-4 rounded-t-lg text-gray-100",
                        tabContent:
                          "group-data-[selected=true]:text-gray-100 text-g-100",
                      }}
                    >
                      <Tab
                        key="dni"
                        title="Buscar por D.Identidad"
                        className="font-poppins"
                      >
                        <div>
                          <div className="bg-transparent dark:bg-transparent">
                            <SearchDNI onSearchDNI={handleSearch} />
                          </div>
                        </div>
                      </Tab>
                      <Tab
                        key="name"
                        title="Buscar por Código"
                        className="font-poppins"
                      >
                        <div>
                          <div className="bg-transparent dark:bg-transparent">
                            <SearchCode  />
                          </div>
                        </div>
                      </Tab>
                      <Tab
                        key="code"
                        title="Buscar por nombres"
                        className="font-poppins"
                      >
                        <div>
                          <div className="bg-transparent dark:bg-transparent">
                            <SearchName onSearchName={handleSearch} />
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>

                {/* Right Section */}
                <div className="grid grid-cols-1 gap-6 md:mt-0 md:w-1/2">
                  <div className="text-white text-center font-poppins bg-[#1a4671]/70 dark:bg-[#021221]/70 p-4 rounded-lg">
                    <h3 className="text-lg md:text-xl font-semibold">
                      ¿Cómo verificar un certificado?
                    </h3>
                    <p className="text-sm md:text-base">
                      Puedes verificar la validez de tu certificado
                      introduciendo tu Documento de Identidad, nombre completo o
                      código de certificado. Nos esforzamos en proteger la
                      privacidad y el manejo confidencial de tus datos
                      personales.
                    </p>
                  </div>
                  <div className="text-center text-white bg-[#1a4671]/70 dark:bg-[#021221]/70 p-4 rounded-lg">
                    <h3 className="text-lg md:text-xl font-semibold">
                      Certificados Validados
                    </h3>
                    <p className="text-3xl md:text-4xl font-extrabold mt-2 text-[#00dbb8]">
                      {validatedCount.toLocaleString("en-US")}
                    </p>
                    <p className="text-sm md:text-base mt-2">¡Y contando!</p>
                  </div>
                  <div className="text-white text-center font-poppins bg-[#1a4671]/70 dark:bg-[#021221]/70 p-4 rounded-lg">
                    <h3 className="text-lg md:text-xl font-semibold">
                      Soporte Técnico
                    </h3>
                    <p className="text-sm md:text-base">
                      ¿Tienes problemas para verificar?{" "}
                      <a
                        href="https://wa.me/51994946573?text=Hola,%20tengo%20problemas%20para%20verificar%20mi%20certificado.%20%C2%BFPueden%20ayudarme?"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00dbb8] underline hover:text-[#00dbb8]/80"
                      >
                        Contáctanos aquí
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestingPage;
