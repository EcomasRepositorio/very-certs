import React, { useState, FormEvent } from "react";
import { URL } from "@/components/utils/format/tokenConfig";
import axios from "axios";
import { SearchCodeProps, StudentCode } from "../../interface/interface";
import Modal from "../share/ModalCerti";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";

const SearchName: React.FC<SearchCodeProps> = ({ onSearchCode }) => {
  const [isActive, setIsActive] = useState(false);
  const [queryValue, setQueryValue] = useState<string>("");
  const [searchType, setSearchType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<StudentCode>();
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [closeTable, setCloseTable] = useState(false);

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, "onChange ejecutado");
    setQueryValue(event.target.value);
    setSearchType(event.target.value);
  };

  const openErrorModal = () => {
    setModalOpen(true);
  };
  const closeErrorModal = () => {
    setModalOpen(false);
  };

  const searchCode = async (event: FormEvent) => {
    event.preventDefault();

    if (queryValue.trim()) {
      setLoading(true);
    }
    try {
      const value = queryValue.trim();
      const apiUrl = `${URL()}/student/code/${value}/type/${searchType}`;
      console.log(apiUrl);
      const res = await axios.get(
        `${URL()}/student/code/${value.trim()}/type/${searchType}`
      );
      console.log(res);
      setStudentData(res.data);
      onSearchCode(res.data);
      if (queryValue.trim() !== "") {
        setOpen(true);
      }
    } catch (error) {
      console.error("Error: Codigo invalido", error);
      openErrorModal();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };
  const tableRows = [
    {
      imgSrc: "/icons/organizadopor.svg",
      label: "Organizado por:",
      value: studentData?.institute,
    },
    {
      imgSrc: "/icons/otorgado.svg",
      label: "Otorgado a:",
      value: studentData?.name,
    },
    {
      imgSrc: "/icons/nom_evento.svg",
      label: "Nombre del evento:",
      value: studentData?.activityAcademy,
    },
    {
      imgSrc: "/icons/creditos_horas.svg",
      label: "Creditos/Horas:",
      value: studentData?.hour,
    },
    {
      imgSrc: "/icons/fecha_emision.svg",
      label: "Fecha de emisión:",
      value: studentData?.date,
    },
  ];

  const splitText = (text: string): string[] => {
    const cleanText = text.trim();

    // Identificar posiciones clave en el texto
    const indexCorporacion = cleanText.indexOf(
      "ECOMÁS Consultoría y Capacitación"
    );
    const indexFundenorp = cleanText.indexOf("FUNDENORP");
    const indexEscuela = cleanText.indexOf(
      "Escuela de Posgrado - Universidad Nacional de Piura"
    );
    const indexUniversidadPiura = cleanText.indexOf(
      "Universidad Nacional de Piura"
    );
    const indexColegioIngenierosHuancavelica = cleanText.indexOf(
      "Colegio de ingenieros del Perú CD-Huancavelica"
    );
    const indexColegioIngenierosCallao = cleanText.indexOf(
      "Colegio de ingenieros del Perú CD-Callao"
    );
    const indexColegioIngenierosPuno = cleanText.indexOf(
      "Colegio de ingenieros del Perú CD-Puno"
    );
    const indexColegioIngenierosIca = cleanText.indexOf(
      "Colegio de ingenieros del Perú CD-Ica"
    );

    // Caso 1: 3 líneas - "ECOMÁS Consultoría y Capacitación Escuela de Posgrado - Universidad Nacional de Piura FUNDENORP"
    if (
      indexCorporacion !== -1 &&
      indexEscuela !== -1 &&
      indexFundenorp !== -1
    ) {
      const corporacion = cleanText
        .substring(indexCorporacion, indexEscuela)
        .trim();
      const escuela = cleanText.substring(indexEscuela, indexFundenorp).trim();
      const fundenorp = cleanText.substring(indexFundenorp).trim();
      return [corporacion, escuela, fundenorp];
    }

    // Caso 2: 3 líneas - "ECOMÁS Consultoría y Capacitación Universidad Nacional de Piura FUNDENORP"
    if (
      indexCorporacion !== -1 &&
      indexUniversidadPiura !== -1 &&
      indexFundenorp !== -1
    ) {
      const corporacion = cleanText
        .substring(indexCorporacion, indexUniversidadPiura)
        .trim();
      const universidad = cleanText
        .substring(indexUniversidadPiura, indexFundenorp)
        .trim();
      const fundenorp = cleanText.substring(indexFundenorp).trim();
      return [corporacion, universidad, fundenorp];
    }

    // Caso 3: 2 líneas - "ECOMÁS Consultoría y Capacitación Colegio de ingenieros del Perú CD-Huancavelica"
    if (indexCorporacion !== -1 && indexColegioIngenierosHuancavelica !== -1) {
      const corporacion = cleanText
        .substring(indexCorporacion, indexColegioIngenierosHuancavelica)
        .trim();
      const colegioIngenierosHuancavelica = cleanText
        .substring(indexColegioIngenierosHuancavelica)
        .trim();
      return [corporacion, colegioIngenierosHuancavelica];
    }

    // Caso 4: 2 líneas - "ECOMÁS Consultoría y Capacitación Colegio de ingenieros del Perú CD-Callao"
    if (indexCorporacion !== -1 && indexColegioIngenierosCallao !== -1) {
      const corporacion = cleanText
        .substring(indexCorporacion, indexColegioIngenierosCallao)
        .trim();
      const colegioIngenierosCallao = cleanText
        .substring(indexColegioIngenierosCallao)
        .trim();
      return [corporacion, colegioIngenierosCallao];
    }

    // Caso 5: 2 líneas - "ECOMÁS Consultoría y Capacitación Colegio de ingenieros del Perú CD-Puno"
    if (indexCorporacion !== -1 && indexColegioIngenierosPuno !== -1) {
      const corporacion = cleanText
        .substring(indexCorporacion, indexColegioIngenierosPuno)
        .trim();
      const colegioIngenierosPuno = cleanText
        .substring(indexColegioIngenierosPuno)
        .trim();
      return [corporacion, colegioIngenierosPuno];
    }

    // Caso 6: 2 líneas - "ECOMÁS Consultoría y Capacitación Colegio de ingenieros del Perú CD-Ica"
    if (indexCorporacion !== -1 && indexColegioIngenierosIca !== -1) {
      const corporacion = cleanText
        .substring(indexCorporacion, indexColegioIngenierosIca)
        .trim();
      const colegioIngenierosIca = cleanText
        .substring(indexColegioIngenierosIca)
        .trim();
      return [corporacion, colegioIngenierosIca];
    }

    // Caso general: Divide el texto en líneas basadas en cantidad de palabras, máximo 3 líneas
    const words = cleanText.split(" ");
    const firstLine = words.slice(0, 9).join(" ");
    const secondLine = words.slice(9, 15).join(" ");
    const thirdLine = words.slice(15).join(" ");
    return [firstLine, secondLine, thirdLine].filter((line) => line.length > 0);
  };

  return (
    <div className="">
      <form onSubmit={searchCode} className="w-full ">
        <div className="flex items-center space-x-2 w-full transition-all duration-300 mt-2 ">
          <div
            className={`flex-1 transition-all duration-300 ${
              closeTable ? "w-[600px]" : "w-[400px]"
            }`}
          >
            <input
              type="search"
              id="default-search"
              className="w-full font-normal text-sm text-gray-900 border-1 border-gray-300 rounded-lg bg-white focus:border-primaryblue p-3 transition-all duration-300"
              placeholder={`Ingrese su CODIGO${
                searchType === "name" ? "nombre" : ""
              }`}
              required
              onClick={toggleIsActive}
              onChange={onChange}
              value={queryValue}
            />
          </div>
          <div className="ml-2 mb-2">
            <Button
              type="submit"
              className="bg-primaryblue dark:bg-transparent text-white border border-white/50 rounded-lg"
            >
              Buscar
            </Button>
          </div>
        </div>
      </form>

      {loading && <Spinner color="primary" />}
      {studentData && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="flex justify-center items-center mb-4 gap-2">
            <Image
              src={"/"}
              alt="ecomas"
              className="md:w-20 w-16  object-contain mt-2"
              width={200}
              height={200}
              priority={true}
            />
            <Image
              src={"/certificate/LOGO-VERTICAL-COLOR.png"}
              alt="ecomas"
              className="block dark:hidden md:w-20  w-16 h-[125px] md:mt-[13px] mt-[11px] object-contain"
              width={200}
              height={200}
              priority={true}
            />
            <Image
              src={"/image/EcomasVert_dark.png"}
              alt="ecomas"
              className="hidden dark:block md:w-20  w-16 h-[125px] md:mt-[13px] mt-[11px] object-contain"
              width={200}
              height={200}
              priority={true}
            />{" "}
            <Image
              src={"/certificate/CAL.png"}
              alt="ecomas"
              className="md:w-20  w-16 object-contain mt-2"
              width={200}
              height={200}
              priority={true}
            />
            <Image
              src={"/image/colegio_dark.png"}
              alt="ecomas"
              className="block dark:hidden md:w-20  w-16 object-contain mt-2"
              width={200}
              height={200}
              priority={true}
            />
            <Image
              src={"/image/colegio_dark.png"}
              alt="ecomas"
              className="hidden dark:block md:w-20  w-16 object-contain mt-2"
              width={200}
              height={200}
              priority={true}
            />
          </div>
          <div className=" max-w-md text-center  rounded-md mx-auto">
            {tableRows.map((row, index) => (
              <div key={index} className="mb-4">
                <div className="inline-flex items-center text-white  text-sm p-1 md:w-80 w-72 rounded-lg bg-slate-600 font-semibold">
                  {row.imgSrc && (
                    <Image
                      src={row.imgSrc}
                      alt={row.label}
                      className="flex lg:w-5 lg:h-5 w-5 h-5 object-contain ml-1"
                      width={800}
                      height={800}
                    />
                  )}
                  <div className="flex-1 text-center">{row.label}</div>
                </div>

                <div className="text-gray-300 mt-3 mb-5 text-sm font-semibold">
                  {row.value === studentData?.institute &&
                    row.value &&
                    splitText(row.value).map((line, index) => (
                      <p key={index} className="mb-1">
                        {line}
                      </p>
                    ))}
                  {row.value !== studentData?.institute && row.value}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
      <Modal open={modalOpen} onClose={closeErrorModal}>
        <div className="p-2 rounded-lg">
          <h2 className="text-md font-bold text-red-500 mb-4">
            Código incorrecto
          </h2>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-100">
            El código que ingresaste no se encuentra en nuestra base de datos.
          </h3>
        </div>
      </Modal>
    </div>
  );
};

export default SearchName;
