import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import Modal from "../share/ModalSearch";
import { LucideClock, LucideCalendarDays, ShieldCheck } from "lucide-react";
import Image from "next/image";
import ModalGraduate from "@/components/certificate/modals/ModalGraduate";
import ModalCourse from "@/components/certificate/modals/ModalCourse";

const SearchCode: React.FC = () => {
  const [queryValue, setQueryValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<any>(null); // Puede ser Course o Graduate
  const [modalOpen, setModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [isCourse, setIsCourse] = useState<boolean | null>(null); // Identifica si es Course o Graduate

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.value.trim());
  };

  const searchCode = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(
        `https://backclassroom.ecomas.pe/api/v1/search/students?search=${queryValue}`
      );

      if (res.data) {
        if (res.data.studentCourse) {
          setStudentData(res.data.studentCourse[0]);
          setIsCourse(true); // Es un curso
        } else if (res.data.studentGraduate) {
          setStudentData(res.data.studentGraduate[0]);
          setIsCourse(false); // Es un diplomado
        }
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setModalOpen(false);
  const closeErrorModal = () => setErrorModalOpen(false);

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
            className="ml-2 bg-customBlue text-white border border-white/50 rounded-lg"
          >
            Buscar
          </Button>
        </div>
      </form>

      {loading && <Spinner color="primary" />}

      {/* Modal para Course o Graduate */}
      {modalOpen && studentData && (
        <Modal open={modalOpen} onClose={closeModal}>
          {isCourse ? (
            <div>
             <ModalCourse courseData={studentData} />
            </div>
          ) : (
            <div>
             <ModalGraduate participantData={studentData} />
            </div>
          )}
        </Modal>
      )}

      {/* Modal de error */}
      <Modal open={errorModalOpen} onClose={closeErrorModal}>
        <div className="p-4 text-center">
          <h2 className="text-md font-bold text-red-500 mb-4">Código incorrecto</h2>
          <p className="text-sm text-gray-600">
            El código ingresado no se encuentra en nuestra base de datos.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default SearchCode;
