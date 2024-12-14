import React, { useState, FormEvent } from "react";
import axios from "axios";
import { SearchNameProps, Student } from "@/interface/interface";
import Modal from "../share/ModalCerti";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";

interface BackendConfig {
  url: string;
  active: boolean; // Indica si el backend está activado
}

interface StudentCode extends Student {
  hour: string;
  institute: string;
}

// Lista de backends configurables
const backends: BackendConfig[] = [
  { url: "https://backend.verycerts.com/api/v1", active: true },
  { url: "https://backend.ecomas.pe/api/v1", active: true },
  { url: "https://backend.extra.com/api/v1", active: false }, // Nuevo backend desactivado
];

const SearchName: React.FC<SearchNameProps> = ({ onSearchName }) => {
  const [queryValue, setQueryValue] = useState<string>(""); // Input value
  const [loading, setLoading] = useState(false); // Loading state
  const [studentData, setStudentData] = useState<Student[]>([]); // Combined results
  const [closeTable, setCloseTable] = useState(false); // Table visibility
  const [modalOpen, setModalOpen] = useState(false); // Error modal
  const [selectedStudentData, setSelectedStudentData] =
    useState<StudentCode | null>(null);
  const [openModals, setOpenModals] = useState<boolean[]>([]);

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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.value);
    setCloseTable(false);
  };

  const openErrorModal = () => setModalOpen(true);
  const closeErrorModal = () => setModalOpen(false);

  const searchName = async (event: FormEvent) => {
    event.preventDefault();

    if (!queryValue.trim()) return;

    setLoading(true);
    try {
      const value = queryValue.trim();

      // Array para combinar los resultados de todos los backends
      const combinedData: Student[] = [];

      // Iterar sobre los backends activos
      for (const backend of backends) {
        if (backend.active) {
          try {
            const res = await axios.get(
              `${backend.url}/student/name/${value}/type/name`
            );
            combinedData.push(...res.data); // Añadir los resultados de este backend
          } catch (error) {
            console.warn(`Error en el backend ${backend.url}:`, error);
          }
        }
      }

      // Validación: Sin resultados
      if (combinedData.length === 0) {
        throw new Error(
          "No se encontraron resultados en ninguna base de datos."
        );
      }

      // Guardar datos en el estado
      setStudentData(combinedData);
      onSearchName(combinedData);
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
    <div className="w-full">
      {/* Formulario de búsqueda */}
      <form onSubmit={searchName} className="flex items-center space-x-2 mt-4">
        <input
          type="search"
          placeholder="Ingrese el nombre completo"
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

      {/* Tabla de resultados */}
      {closeTable && studentData && (
        <div className="relative overflow-x-auto shadow-xl rounded-xl mt-8">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 font-semibold">
            <thead className="text-sm text-center text-gray-600 uppercase bg-gray-300">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Actividad académica</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr
                  key={index}
                  className="bg-white border-b text-center hover:bg-gray-100"
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4 truncate">
                    {student.activityAcademy}
                  </td>
                  <td className="px-6 py-4">{student.date}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() =>
                        openStudentModal(student as StudentCode, index)
                      }
                      className="font-medium text-primaryblue hover:underline"
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

      {/* Modal de detalles */}
      {selectedStudentData && (
        <Modal
          open={openModals.findIndex(Boolean) !== -1}
          onClose={() => closeStudentModal(openModals.findIndex(Boolean))}
        >
          <div className="p-4">
            <div className="flex justify-center mb-4">
              <Image
                src="/image/log-blank.png"
                alt="verycerts"
                width={200}
                height={200}
              />
            </div>
            {tableRows.map((row, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-center bg-slate-600 text-white p-2 rounded-lg  ">
                {row.imgSrc && (

                  <Image
                    src={row.imgSrc}
                    alt={row.label}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                )}

                  <span>{row.label}</span>
                </div>
                <p className="text-gray-100 mt-2 text-center">{row.value}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Modal de error */}
      <Modal open={modalOpen} onClose={closeErrorModal}>
        <div className="p-4 text-center">
          <h2 className="text-red-500 font-bold">Nombre incorrecto</h2>
          <p className="text-gray-400">
            No se encontraron resultados para el nombre ingresado.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default SearchName;
