import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import Modal from "../share/ModalTest";
import Modalerror from "../share/ModalErrorLens";
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
    setLoading(true);
    setStudentData(null);

    try {
      const res = await axios.get(
        `https://backclassroom.ecomas.pe/api/v1/search/students?search=${queryValue}`
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
  console.log("Datos recibidos en SearchCode:", dataType);

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
