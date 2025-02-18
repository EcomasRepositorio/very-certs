import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import Modal from "../share/ModalTest";
import Modalerror from "@/components/share/ModalErrorLens";
import useCounterStore from "@/store/counterStore";
import DynamicModal from "./modalCode/DynamicModal";

const SearchCode: React.FC = () => {
  const [queryValue, setQueryValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<any>(null);
  const [dataType, setDataType] = useState<
    "course" | "graduate" | "module" | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.value.trim());
  };

  const searchCode = async (event: FormEvent) => {
    event.preventDefault();

    if (!/^\d+$/.test(queryValue) || queryValue.length <= 8) {
      setErrorModalOpen(true);
      return;
    }

    setLoading(true);
    setStudentData(null);

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/search/students?search=${queryValue}`
      );

      if (res.data) {
        let student = null;
        let type: "course" | "graduate" | "module" | null = null;

        if (res.data.studentCourse?.length > 0) {
          student = res.data.studentCourse[0];
          type = "course";
        } else if (res.data.studentGraduate?.length > 0) {
          student = res.data.studentGraduate[0];
          type = "graduate";
        } else if (res.data.studentModule?.length > 0) {
          student = res.data.studentModule[0];
          type = "module";
        }

        if (student && type) {
          setStudentData(student);
          setDataType(type);
          setModalOpen(true);
        } else {
          setErrorModalOpen(true);
        }

        if (res.data.counter) {
          useCounterStore.getState().setCount(res.data.counter);
        }
      }
    } catch (error) {
      console.error("Error al buscar datos:", error);
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setModalOpen(false);
  const closeErrorModal = () => setErrorModalOpen(false);

  const renderModalContent = () => {
    if (studentData && dataType) {
      return (
        <DynamicModal
          open={modalOpen}
          onClose={closeModal}
          data={studentData}
          dataType={dataType}
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

      {renderModalContent()}

      {errorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              No se encontraron resultados
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Intente Nuevamente.
            </p>
            <Button
              onClick={closeErrorModal}
              className="bg-customBlue dark:bg-customBlue text-white px-4 py-2 rounded-lg mt-4"
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCode;
