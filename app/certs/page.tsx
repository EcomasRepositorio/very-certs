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
  const { validatedCount, incrementCount } = useCounterStore();

  const handleSearch = (data: any) => {
    console.log("Search data:", data);

    // Incrementa el contador en 1 al realizar una búsqueda
    incrementCount(1);
  };

  return (
    <section className="bg-fixed">
      <div
        style={{
          backgroundAttachment: "fixed",
          backgroundImage: "url(/certificate/image/test_bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="py-8 mx-auto max-w-screen-xl lg:py-10">
          <div style={{ position: "relative", width: "100%" }}>
            <div className="bg-black/40 border border-white/55 rounded-lg p-4 sm:p-6 md:p-8 lg:p-12 mb-12 mt-7 mx-2">
              <div className="flex flex-col items-center justify-center mx-auto px-4 py-8 max-w-screen-xl gap-6 md:flex-row md:gap-12">
                {/* Left Section */}

                <div className=" md:mr-12 flex-1">
                  <div className="flex flex-col">
                    <h1 className=" text-2xl font-extrabold text-center text-white lg:text-4xl">
                      VERIFICAR CERTIFICADO
                    </h1>
                    <p className="text-white font-poppins text-center md:text-xl mb-8"></p>

                    <Tabs
                      aria-label="Options"
                      color="primary"
                      classNames={{
                        tabList:
                          "w-full flex flex-col md:flex-row bg-transparent rounded-md border border-gray-300/40",
                        cursor:
                          "bg-customDark rounded-md border border-white/70 text-gray-100",
                        tab: "py-2 px-4 rounded-t-lg text-gray-100",
                        tabContent:
                          "group-data-[selected=true]:text-gray-100 text-g-100",
                      }}
                    >
                      <Tab
                        key="dni"
                        title="Buscar por DNI"
                        className="font-poppins"
                      >
                        <Card>
                          <CardBody className="bg-transparent dark:bg-blackblue2">
                            <SearchDNI onSearchDNI={handleSearch} />
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab
                        key="name"
                        title="Buscar por Código"
                        className="font-poppins"
                      >
                        <Card>
                          <CardBody className="bg-transparent dark:bg-blackblue2">
                            <SearchCode onSearchCode={handleSearch} />
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab
                        key="code"
                        title="Buscar por nombres"
                        className="font-poppins"
                      >
                        <Card>
                          <CardBody className="bg-transparent dark:bg-blackblue2">
                            <SearchName onSearchName={handleSearch} />
                          </CardBody>
                        </Card>
                      </Tab>
                    </Tabs>
                  </div>
                </div>

                {/* Right Section */}
                <div className="grid grid-cols-1 gap-6 md:mt-0 md:w-1/2">
                  <div className="text-white text-center font-poppins bg-[#021221]/70 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">
                      ¿Cómo verificar un certificado?
                    </h3>
                    <p className="text-sm">
                      Puedes verificar la validez de tu certificado
                      introduciendo tu Documento de Indentidad, nombre completo
                      o código de certificado. Nos esforzamos en proteger la
                      privacidad y el manejo confidencial de tus datos
                      personales.
                    </p>
                  </div>
                  <div className="text-center text-white bg-[#021221]/70 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">
                      Certificados Validados
                    </h3>
                    <p className="text-4xl font-extrabold mt-2 text-[#00dbb8]">
                      {validatedCount.toLocaleString("en-US")}
                    </p>
                    <p className="text-sm mt-2">¡Y contando!</p>
                  </div>
                  <div className="text-white text-center font-poppins bg-[#021221]/70 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">Soporte Técnico</h3>
                    <p className="text-sm">
                      ¿Tienes problemas para verificar?{" "}
                      <a
                        href="https://wa.me/51994946573?text=Hola,%20tengo%20problemas%20para%20verificar%20mi%20certificado.%20¿Pueden%20ayudarme?"
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
