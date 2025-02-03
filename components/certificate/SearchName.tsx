import React, { useState, FormEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { URL } from "@/components/utils/format/tokenConfig";
import axios from "axios";
import { SearchNameProps, Student } from "@/interface/interface";
import Modal from "../share/Modal";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import useCounterStore from "@/store/counterStore";

interface StudentCode extends Student {
  hour: string;
  institute: string;
}

const SearchName: React.FC<SearchNameProps> = ({ onSearchName }) => {
  const { incrementCount } = useCounterStore();
  const [isActive, setIsActive] = useState(false);
  const [queryValue, setQueryValue] = useState<string>("");
  const [searchType, setSearchType] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<Student[]>();
  const [closeTable, setCloseTable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isNameIncomplete, setIsNameIncomplete] = useState(false);
  const [selectedStudentData, setSelectedStudentData] =
    useState<StudentCode | null>(null);
  const [openModals, setOpenModals] = useState<boolean[]>(
    Array(selectedStudentData ? 1 : 0).fill(false)
  );

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
    setQueryValue(event.target.value); // Eliminar espacios innecesarios
    setCloseTable(false);
    setSearchType(queryValue);
  };

  const openErrorModal = () => {
    setModalOpen(true);
  };
  const closeErrorModal = () => {
    setModalOpen(false);
  };

  const searchName = async (event: FormEvent) => {
    event.preventDefault();

    if (queryValue.trim()) {
      setLoading(true);
    }

    try {
      const value = queryValue.trim(); // Limpiar el input de espacios
      if (value.split(" ").length <= 2) {
        setIsNameIncomplete(true);
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `${URL()}/student/name/${value}/type/${searchType}`
      );

      console.log("respuesta del servidor:", res.data);

      if (!res.data || !Array.isArray(res.data.students)) {
        console.error("Error: La respuesta no contiene el array 'students'");
        setIsNameIncomplete(true);
        setLoading(false);
        return;
      }

      const filteredData = res.data.students.filter((student: Student) => {
        const normalizedInput = value.replace(/\s+/g, " ").toLowerCase(); // Normalizar entrada
        const normalizedName = student.name.replace(/\s+/g, " ").toLowerCase(); // Normalizar nombre del estudiante
        return normalizedName === normalizedInput; // Comparación exacta
      });

      console.log(filteredData);
      if (filteredData.length > 0) {
        setStudentData(filteredData);
        onSearchName(filteredData);
        setCloseTable(true);

        // Aumentar el contador
        console.log("Incrementando el contador...");
        incrementCount(1); // Verifica que esta línea se ejecute
      } else {
        setIsNameIncomplete(true);
      }
    } catch (error) {
      console.error("Error: Nombre inválido", error);
      openErrorModal();
    } finally {
      setLoading(false);
    }
  };
  // Función para dividir el texto según palabras clave o cantidad de palabras
  const splitText = (text: string): string[] => {
    // Elimina espacios innecesarios
    const cleanText = text.trim();

    // Identificamos las posiciones de las palabras clave dentro del texto
    const indexCorporacion = cleanText.indexOf("BINEX Educación Continúa");
    const indexFundenorp = cleanText.indexOf("FUNDENORP");
    const indexEscuela = cleanText.indexOf("Escuela de Posgrado");
    const indexUniversidad = cleanText.indexOf("Universidad Nacional de Piura");

    // Si contiene "Escuela de Posgrado"
    if (
      indexCorporacion !== -1 &&
      indexFundenorp !== -1 &&
      indexEscuela !== -1
    ) {
      const corporacion = cleanText
        .substring(indexCorporacion, indexEscuela)
        .trim(); // Desde "Corporación SAYAN" hasta "Escuela de Posgrado"
      const escuela = cleanText.substring(indexEscuela, indexFundenorp).trim(); // Desde "Escuela de Posgrado" hasta "FUNDENORP"
      const fundenorp = cleanText.substring(indexFundenorp).trim(); // Desde "FUNDENORP" hasta el final

      return [corporacion, escuela, fundenorp];
    }

    // Si contiene "Universidad Nacional de Piura" (y no "Escuela de Posgrado")
    if (
      indexCorporacion !== -1 &&
      indexFundenorp !== -1 &&
      indexUniversidad !== -1
    ) {
      const corporacion = cleanText
        .substring(indexCorporacion, indexUniversidad)
        .trim(); // Desde "Corporación SAYAN" hasta "Universidad Nacional de Piura"
      const universidad = cleanText
        .substring(indexUniversidad, indexFundenorp)
        .trim(); // Desde "Universidad Nacional de Piura" hasta "FUNDENORP"
      const fundenorp = cleanText.substring(indexFundenorp).trim(); // Desde "FUNDENORP" hasta el final

      return [corporacion, universidad, fundenorp];
    }

    // Si no encuentra las palabras clave, devuelve el texto dividido en palabras
    const words = cleanText.split(" ");
    const firstLine = words.slice(0, 9).join(" "); // Primeras 9 palabras
    const secondLine = words.slice(9, 10).join(" "); // Palabra 10
    const thirdLine = words.slice(10).join(" "); // Resto de las palabras
    return [firstLine, secondLine, thirdLine].filter((line) => line.length > 0);
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

      
      <form onSubmit={searchName} className="w-full ">
        <div className="flex items-center ">
          <div className=" flex-1">
            <input
              type="search"
              id="default-search"
              className=" font-normal text-sm text-gray-900 border-1 border-gray-300 rounded-lg bg-white  focus:border-primaryblue  m-0"
              placeholder={`Ingrese sus nombres y apellidos ${
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
              className="bg-customBlue dark:bg-customDark text-white border border-white/50 rounded-lg"
            >
              Buscar
            </Button>
          </div>
        </div>
      </form>
      {loading && <Spinner />}
      {isNameIncomplete && (
        <Modal
          open={isNameIncomplete}
          onClose={() => setIsNameIncomplete(false)}
        >
          <div className=" p-2 rounded-lg">
            <h2 className="text-md font-bold text-red-500 mb-4">
              Nombres y apellidos incorrectos.
            </h2>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-100">
              Los nombres y apellidos que ingresaste no se encuentran en nuestra
              base de datos.
            </h3>
          </div>
        </Modal>
      )}
      {closeTable && studentData && (
        <div className="relative overflow-x-auto shadow-xl rounded-xl mt-8">
          <Table className="border border-transparent bg-gray-50 dark:bg-gray-700/30 ">
            <TableHeader>
              <TableRow className="border border-transparent rounded-xl bg-gray-300 dark:bg-customDark">
                <TableHead className="text-center text-gray-800 dark:text-gray-200 ">
                  #
                </TableHead>
                <TableHead className="text-center text-gray-800 dark:text-gray-200">
                  Nombre
                </TableHead>
                <TableHead className="text-center text-gray-800 dark:text-gray-200">
                  Acción
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentData?.map((student, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="text-center text-gray-700 dark:text-gray-100">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center text-gray-700 dark:text-gray-100">
                    {student.name}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      className="bg-customBlue text-primary-foreground hover:bg-primary/90 dark:bg-customDark dark:text-gray-100 dark:hover:bg-customDark/70"
                      onClick={() =>
                        openStudentModal(student as StudentCode, index)
                      }
                    >
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedStudentData && (
        <Modal
          open={openModals.findIndex(Boolean) !== -1}
          onClose={() => closeStudentModal(openModals.findIndex(Boolean))}
        >
          <div className="flex justify-center mb-4 gap-2">
            <Image
              src={"/img/logo/unp-piura.png"}
              alt="binex"
              className="md:w-20 w-16  object-contain mt-2"
              width={400}
              height={400}
              priority={true}
            />
            <Image
              src={"/img/logo/logo.png"}
              alt="binex"
              className="md:w-20 w-16  object-contain mt-2"
              width={400}
              height={400}
              priority={true}
            />
            <Image
              src={"/img/logo/funde.png"}
              alt="binex"
              className="md:w-20 w-16  object-contain mt-2"
              width={400}
              height={400}
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
        <div className="border-2 p-2 rounded-lg">
          <h2 className="text-md font-bold text-red-600 mb-4">
            Nombre incorrecto
          </h2>
          <h3 className="text-sm font-semibold text-white">
            El nombre que ingresaste no se encuentra en nuestra base de datos.
          </h3>
        </div>
      </Modal>
    </div>
  );
};

export default SearchName;
