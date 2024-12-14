import React, { useState, FormEvent } from "react";
import { URL, getURL } from "@/components/utils/format/tokenConfig";
import axios from "axios";
import { SearchCodeProps, StudentCode } from "../../interface/interface";
import Modal from "../share/ModalCerti";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";

const SearchName: React.FC<SearchCodeProps> = ({ onSearchCode }) => {
  const [queryValue, setQueryValue] = useState<string>(""); // Input del usuario
  const [searchType, setSearchType] = useState<string | null>(null); // Tipo de búsqueda
  const [loading, setLoading] = useState<boolean>(false); // Indicador de carga
  const [studentData, setStudentData] = useState<StudentCode | null>(null); // Datos del estudiante
  const [modalOpen, setModalOpen] = useState<boolean>(false); // Modal de error
  const [open, setOpen] = useState<boolean>(false); // Modal de resultados

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.value);
  };

  const openErrorModal = () => setModalOpen(true);
  const closeErrorModal = () => setModalOpen(false);

  const searchCode = async (event: FormEvent) => {
    event.preventDefault();

    if (!queryValue.trim()) return;

    setLoading(true);
    try {
      const value = queryValue.trim();

      // Variables para resultados de ambos backends
      let resultsLocal: StudentCode | null = null;
      let resultsRemote: StudentCode | null = null;

      // Consulta en el backend local
      try {
        const resLocal = await axios.get(
          `${URL()}/student/code/${value.trim()}/type/${searchType}`
        );
        resultsLocal = resLocal.data;
      } catch (error) {
        console.warn("Error en la base de datos local:", error);
      }

      // Consulta en el backend remoto
      try {
        const resRemote = await axios.get(
          `${getURL()}/student/code/${value.trim()}/type/${searchType}`
        );
        resultsRemote = resRemote.data;
      } catch (error) {
        console.warn("Error en la base de datos remoto:", error);
      }

      // Combinación de resultados
      const combinedData = resultsLocal || resultsRemote;

      // Validación: Sin resultados
      if (!combinedData) {
        throw new Error(
          "No se encontraron resultados en ninguna base de datos."
        );
      }

      // Guardar datos en el estado
      setStudentData(combinedData);
      onSearchCode(combinedData);
      setOpen(true);
    } catch (error) {
      console.error("Error general durante la búsqueda:", error);
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

    // Casos específicos para dividir el texto
    const indexCorporacion = cleanText.indexOf(
      "ECOMÁS Consultoría y Capacitación"
    );
    const indexFundenorp = cleanText.indexOf("FUNDENORP");
    const indexEscuela = cleanText.indexOf(
      "Escuela de Posgrado - Universidad Nacional de Piura"
    );

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

    // Caso general: Dividir en líneas
    const words = cleanText.split(" ");
    const firstLine = words.slice(0, 9).join(" ");
    const secondLine = words.slice(9, 15).join(" ");
    const thirdLine = words.slice(15).join(" ");
    return [firstLine, secondLine, thirdLine].filter((line) => line.length > 0);
  };

  return (
    <div className="w-full">
      {/* Formulario de búsqueda */}
      <form onSubmit={searchCode} className="flex items-center space-x-2 mt-4">
        <input
          type="search"
          placeholder="Ingrese su CÓDIGO "
          value={queryValue}
          onChange={onChange}
          className="w-full border rounded-lg p-2 bg-transparent text-black"
          required
        />
        <Button type="submit" className="bg-black text-white">
          Buscar
        </Button>
      </form>

      {/* Spinner de carga */}
      {loading && <Spinner color="primary" />}

      {/* Modal de datos encontrados */}
      {studentData && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="p-6 bg-transparent rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <Image
                src="/image/log-blank.png"
                alt="verycerts"
                width={300}
                height={300}
              />
            </div>
            {tableRows.map((row, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-center bg-slate-600 text-white p-2 rounded-lg">
                  <Image
                    src={row.imgSrc}
                    alt={row.label}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>{row.label}</span>
                </div>
                <p className="text-gray-300 mt-2 text-center">{row.value}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Modal de error */}
      <Modal open={modalOpen} onClose={closeErrorModal}>
        <div className="p-4 text-center">
          <h2 className="text-red-500 font-bold">Código incorrecto</h2>
          <p className="text-gray-400">
            No se encontraron resultados para el código ingresado.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default SearchName;
