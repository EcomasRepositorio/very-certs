import React, { useState, FormEvent } from "react";
import { URL, getURL } from "@/components/utils/format/tokenConfig";
import axios from "axios";
import { SearchDNIProps, Student } from "@/interface/interface";
import Modal from "../share/ModalCerti";
import "./Styles.css";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";

interface StudentCode extends Student {
  hour: string;
  institute: string;
}
const splitText = (text: string): string[] => {
  const cleanText = text.trim();

  const indexCorporacion = cleanText.indexOf(
    "ECOMÁS Consultoría y Capacitación"
  );
  const indexFundenorp = cleanText.indexOf("FUNDENORP");
  const indexEscuela = cleanText.indexOf(
    "Escuela de Posgrado - Universidad Nacional de Piura"
  );

  if (indexCorporacion !== -1 && indexEscuela !== -1 && indexFundenorp !== -1) {
    const corporacion = cleanText
      .substring(indexCorporacion, indexEscuela)
      .trim();
    const escuela = cleanText.substring(indexEscuela, indexFundenorp).trim();
    const fundenorp = cleanText.substring(indexFundenorp).trim();
    return [corporacion, escuela, fundenorp];
  }

  const words = cleanText.split(" ");
  const firstLine = words.slice(0, 9).join(" ");
  const secondLine = words.slice(9, 15).join(" ");
  const thirdLine = words.slice(15).join(" ");
  return [firstLine, secondLine, thirdLine].filter((line) => line.length > 0);
};
const SearchName: React.FC<SearchDNIProps> = ({ onSearchDNI }) => {
  const [isActive, setIsActive] = useState(false);
  const [queryValue, setQueryValue] = useState<string>(""); // Input value
  const [searchType, setSearchType] = useState<string | null>(null); // Search type
  const [loading, setLoading] = useState(false); // Loading indicator
  const [studentData, setStudentData] = useState<Student[]>([]); // Combined results
  const [closeTable, setCloseTable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openModals, setOpenModals] = useState<boolean[]>([]);
  const [selectedStudentData, setSelectedStudentData] =
    useState<StudentCode | null>(null);

  const openStudentModal = (selectedStudent: StudentCode, index: number) => {
    setSelectedStudentData(selectedStudent);
    const updatedOpenModals = [...openModals];
    updatedOpenModals[index] = true;
    setOpenModals(updatedOpenModals);
  };

  const closeStudentModal = (index: number) => {
    const updatedOpenModals = [...openModals];
    updatedOpenModals[index] = false;
    setOpenModals(updatedOpenModals);
  };

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.value);
    setCloseTable(false);
  };

  const openErrorModal = () => setModalOpen(true);
  const closeErrorModal = () => setModalOpen(false);

  // Adjusted function for searching in both APIs
  const searchDNI = async (event: FormEvent) => {
    event.preventDefault();
    if (queryValue.trim()) setLoading(true);
    try {
      const value = queryValue.trim();

      let resultsLocal: Student[] = [];
      let resultsRemote: Student[] = [];

      // Consultar en la primera base de datos (localhost)
      try {
        const resLocal = await axios.get(
          `${URL()}/student/dni/${value.trim()}/type/${searchType}`
        );
        resultsLocal = resLocal.data;
      } catch (error) {
        if (error instanceof Error) {
          console.warn("Error en la base de datos local:", error.message);
        } else {
          console.warn("Error desconocido en la base de datos local:", error);
        }
      }

      // Consultar en la segunda base de datos (API remota)
      try {
        const resRemote = await axios.get(
          `${getURL()}/student/dni/${value.trim()}/type/${searchType}`
        );
        resultsRemote = resRemote.data;
      } catch (error) {
        if (error instanceof Error) {
            console.warn("Error en la base de datos local:", error.message);
        } else {
            console.warn("Error desconocido en la base de datos local:", error);
        }
    }

      // Combinar resultados de ambas bases de datos
      const combinedData = [...resultsLocal, ...resultsRemote];

      // Verificar si hay datos encontrados
      if (combinedData.length === 0) {
        throw new Error(
          "No se encontraron resultados en ninguna base de datos."
        );
      }

      // Guardar los datos en el estado
      setStudentData(combinedData);
      onSearchDNI(combinedData);
      setCloseTable(true);
    } catch (error) {
      console.error("Error general durante la búsqueda:", error);
      openErrorModal();
    } finally {
      setLoading(false);
    }
  };

  const tableRows = [
    {
      imgSrc: "/icons/organizadopor.svg",
      label: "Organizado por:",
      value: selectedStudentData?.institute,
    },
    {
      imgSrc: "/icons/otorgado.svg",
      label: "Otorgado a:",
      value: selectedStudentData?.name,
    },
    {
      imgSrc: "/icons/nom_evento.svg",
      label: "Nombre del evento:",
      value: selectedStudentData?.activityAcademy,
    },
    {
      imgSrc: "/icons/creditos_horas.svg",
      label: "Creditos/Horas:",
      value: selectedStudentData?.hour,
    },
    {
      imgSrc: "/icons/fecha_emision.svg",
      label: "Fecha de emisión:",
      value: selectedStudentData?.date,
    },
  ];

  return (
    <div className="">
      <form onSubmit={searchDNI} className="w-full ">
        <div className="flex items-center ">
          <div className=" flex-1">
            <input
              type="search"
              id="default-search"
              className=" font-normal text-sm text-gray-900 border-1 border-gray-300 rounded-lg bg-white  focus:border-primaryblue  m-0"
              placeholder={`Ingrese su DNI${
                searchType === "name" ? "nombre" : ""
              }`}
              required
              onClick={toggleIsActive}
              onChange={onChange}
              value={queryValue}
            />
          </div>
          <div className=" ml-2 h-full">
            <Button
              type="submit"
              className="bg-black  text-white border border-white/50 rounded-lg"
            >
              Buscar
            </Button>
          </div>
        </div>
      </form>

      {loading && <Spinner />}
      {closeTable && studentData && (
        <div className="relative overflow-x-auto shadow-xl rounded-xl mt-8">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 font-semibold">
            <thead className="text-xm text-center text-gray-600 uppercase bg-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Actividad académica
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {studentData?.map((student, index) => (
                <tr
                  key={index}
                  className="bg-white border-b text-center hover:bg-gray-100"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap w-12"
                  >
                    <span style={{ whiteSpace: "nowrap", display: "block" }}>
                      {index + 1}
                    </span>
                  </th>
                  <td className="px-6 py-4">
                    <span style={{ whiteSpace: "nowrap", display: "block" }}>
                      {student.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 truncate max-w-lg">
                    <span title={student.activityAcademy}>
                      {student.activityAcademy}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span style={{ whiteSpace: "nowrap", display: "block" }}>
                      {student.date}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() =>
                        openStudentModal(student as StudentCode, index)
                      }
                      className="font-medium text-primaryblue dark:text-primaryblue hover:underline"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedStudentData && (
        <Modal
          open={openModals.findIndex(Boolean) !== -1}
          onClose={() => closeStudentModal(openModals.findIndex(Boolean))}
        >
          <div className="flex justify-center items-center mb-4 gap-2">
            <Image
              src={"/image/log-blank.png"}
              alt="verycerts"
              className="md:w-60   w-20  object-contain mt-2"
              width={300}
              height={300}
              priority={true}
            />
          </div>
          <div className="max-w-md text-center mx-auto">
            {tableRows.map((row, index) => (
              <div key={index} className="mb-4">
                <div className="inline-flex items-center text-white text-sm p-1 w-72 rounded-lg bg-slate-600 font-semibold">
                  {row.imgSrc && (
                    <Image
                      src={row.imgSrc}
                      alt={row.label}
                      className="w-5 h-5 object-contain ml-1"
                      width={200}
                      height={200}
                    />
                  )}
                  <div className="flex-1 text-center">{row.label}</div>
                </div>
                <div className="text-gray-300 mt-3 mb-5 text-sm font-semibold">
                  {row.label === "Organizado por:" && row.value
                    ? splitText(row.value).map((line, index) => (
                        <p key={index}>{line}</p>
                      ))
                    : row.value}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      <Modal open={modalOpen} onClose={closeErrorModal}>
        <div className="p-2 rounded-lg">
          <h2 className="text-md font-bold text-red-500 mb-4">
            Error en la búsqueda
          </h2>
          <h3 className="text-sm font-semibold text-gray-100">
            No se encontraron resultados para el DNI o código ingresado.
          </h3>
        </div>
      </Modal>
    </div>
  );
};

export default SearchName;
