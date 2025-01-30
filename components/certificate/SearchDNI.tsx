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
import { veryURL } from "@/components/utils/format/tokenConfig";
import axios from "axios";
import { SearchDNIProps } from "@/interface/interface";
import { CertificateDetailsPropsCourse } from "@/components/utils/format/typeSeacrh"; // Interfaz corregida
import Modalerror from "../share/ModalErrorLens";
import DynamicModalDni from "./modals/DynamicSearchDni";
import "./Styles.css";
import { Spinner } from "@nextui-org/react";
import useCounterStore from "@/store/counterStore";
import Image from "next/image";

const SearchName: React.FC<SearchDNIProps> = ({ onSearchDNI }) => {
  const [isActive, setIsActive] = useState(false);
  const [queryValue, setQueryValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<
    CertificateDetailsPropsCourse[] | null
  >(null);
  const [closeTable, setCloseTable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudentData, setSelectedStudentData] =
    useState<CertificateDetailsPropsCourse | null>(null);
 const [errorModalOpen, setErrorModalOpen] = useState(false); 
  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.value);
    setCloseTable(false);
  };

  const openErrorModal = () => setModalOpen(true);
  const closeErrorModal = () => setModalOpen(false);

  const searchDNI = async (event: FormEvent) => {
    event.preventDefault();
    if (!queryValue.trim()) return;

    setLoading(true);

    try {
      const value = queryValue.trim();
      const url = `${veryURL()}/search/students?search=${value}`;

      const res = await axios.get(url);

      if (
        res.data &&
        Array.isArray(res.data.studentCourse) &&
        res.data.studentCourse.length > 0
      ) {
        // Se asignan los datos correctamente
        setStudentData(res.data.studentCourse);
        onSearchDNI(res.data.studentCourse);
        setCloseTable(true);
      } else {
        console.warn("No se encontraron estudiantes.");
        openErrorModal();
        setStudentData(null);
        setCloseTable(false);
      }

      if (res.data.counter) {
        useCounterStore.getState().setCount(res.data.counter);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error en la solicitud:",
          error.response?.data || error.message
        );
      } else {
        if (error instanceof Error) {
          console.error("Error en la solicitud:", error.message);
        } else {
          console.error("Error en la solicitud:", error);
        }
      }

      openErrorModal();
      setStudentData(null);
      setCloseTable(false);
    } finally {
      setLoading(false);
    }
  };

  console.log("Datos obtenidos:", studentData);

  return (
    <div className="">
      <form onSubmit={searchDNI} className="w-full">
        <div className="flex items-center">
          <div className="flex-1">
            <input
              type="search"
              id="default-search"
              className="font-normal text-sm text-gray-900 border-1 border-gray-300 rounded-lg bg-white focus:border-transparent m-0"
              placeholder="Ingrese su Documento de Identidad"
              required
              onClick={toggleIsActive}
              onChange={onChange}
              value={queryValue}
            />
          </div>
          <div className="ml-2 h-full">
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

      {closeTable && studentData && (
        <div className="relative overflow-x-auto rounded-lg border border-white/30 mt-8">
          <Table className="border border-transparent bg-gray-50 dark:bg-gray-700/30">
            <TableHeader>
              <TableRow className="border border-transparent rounded-xl bg-gray-300 dark:bg-customDark">
                <TableHead className="text-center text-gray-800 dark:text-gray-200">
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
              {studentData.map((student, index) => (
                <TableRow
                  key={student.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="text-center text-gray-700 dark:text-gray-100">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center text-gray-700 dark:text-gray-100">
                    {student.fullName}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => {
                        setSelectedStudentData(student);
                        setModalOpen(true); // Asegura que el modal se abre
                      }}
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
        <DynamicModalDni
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          student={selectedStudentData}
      
        />
      )}
    </div>
  );
};

export default SearchName;
