import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import Modal from "../share/ModalTest"; // Modal reutilizable
import Modalerror from "../share/ModalErrorLens"; // Modal reutilizable
import useCounterStore from "@/store/counterStore";
import DynamicModal from "./modals/DynamicModal";

const SearchCode: React.FC = () => {
  const [queryValue, setQueryValue] = useState<string>(""); // Valor del input
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [studentData, setStudentData] = useState<any>(null); // Datos del estudiante
  const [isCourse, setIsCourse] = useState<boolean | null>(null); // Indica si es curso o diplomado
  const [modalOpen, setModalOpen] = useState(false); // Controla si el modal está abierto
  const [errorModalOpen, setErrorModalOpen] = useState(false); // Modal de error

  // Maneja el cambio en el input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.value.trim());
  };

  // Función para buscar el código
  const searchCode = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setStudentData(null); // Reinicia los datos anteriores

    try {
      const res = await axios.get(
        `https://backclassroom.ecomas.pe/api/v1/search/students?search=${queryValue}`
      );

      if (res.data) {
        if (res.data.studentCourse) {
          setStudentData(res.data.studentCourse[0]);
          setIsCourse(true); // Es un curso
          setModalOpen(true); // Abre el modal principal
        } else if (res.data.studentGraduate) {
          setStudentData(res.data.studentGraduate[0]);
          setIsCourse(false); // Es un diplomado
          setModalOpen(true); // Abre el modal principal
        } else {
          setErrorModalOpen(true); // Si no hay datos, muestra el modal de error
        }

        // Actualiza el contador en el store
        if (res.data.counter) {
          useCounterStore.getState().setCount(res.data.counter);
        }
      }
    } catch (error) {
      console.error("Error al buscar datos:", error);
      setErrorModalOpen(true); // Muestra el modal de error si ocurre un fallo
    } finally {
      setLoading(false);
    }
  };

  // Cerrar el modal principal
  const closeModal = () => setModalOpen(false);
  // Cerrar el modal de error
  const closeErrorModal = () => setErrorModalOpen(false);

  // Renderiza el contenido del modal dinámicamente
  const renderModalContent = () => {
    if (studentData) {
      return (
        <DynamicModal
          open={modalOpen}
          onClose={closeModal}
          data={studentData}
          isCourse={isCourse ?? false} // Esto decide si es curso o diplomado
        />
      );
    }
    return null;
  };
  
  return (
    <div>
      <form onSubmit={searchCode} className="w-full">
        <div className="flex items-center justify-center">
          <input
            type="search"
            placeholder="Ingrese su código"
            required
            value={queryValue}
            onChange={handleInputChange}
            className="font-normal text-sm text-gray-900 border-1 border-gray-300 rounded-lg bg-white focus:border-primaryblue m-0 flex-1"
          />
          <Button
            type="submit"
            className="ml-2 bg-customBlue dark:bg-customDark text-white border border-white/50 rounded-lg"
          >
            Buscar
          </Button>
        </div>
      </form>

      {loading && <Spinner color="primary" />}

      {/* Modal principal con contenido dinámico */}
      {renderModalContent()}

      {/* Modal de error */}
      <Modalerror open={errorModalOpen} onClose={closeErrorModal}>
        <div className="p-4 text-center">
          <h2 className="text-md font-bold text-red-500 mb-4">
            Código incorrecto
          </h2>
          <p className="text-sm text-gray-600">
            El código ingresado no se encuentra en nuestra base de datos.
          </p>
        </div>
      </Modalerror>
    </div>
  );
};

export default SearchCode;
