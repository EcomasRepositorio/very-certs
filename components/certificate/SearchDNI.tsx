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
import Modal from "../share/ModalSearchDni";

import Modalerror from "../share/ModalErrorLens";
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
        <Modal open={modalOpen} onClose={() => setSelectedStudentData(null)}>
          <div className="p-6 bg-white dark:bg-gray-900 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-center text-2xl font-bold text-white bg-blue-600 p-3 rounded-t-lg">
              {selectedStudentData.fullName}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
              DNI: {selectedStudentData.documentNumber}
            </p>

            {/* Diplomados de especialización */}
            <h3 className="text-lg font-semibold bg-blue-600 text-white px-4 py-2 rounded-md">
              Diplomados de especialización
            </h3>
            <table className="w-full border-collapse border border-gray-300 mt-2 text-sm">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 px-4 py-2">
                    Denominación
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Organizado por
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Créditos</th>
                  <th className="border border-gray-300 px-4 py-2">
                    En calidad
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Fecha de emisión
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Acción</th>
                </tr>
              </thead>
              <tbody>diplomados</tbody>
            </table>

            {/* Cursos de capacitación */}
            <h3 className="text-lg font-semibold bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
              Cursos de capacitación
            </h3>
            <table className="w-full border-collapse border border-gray-300 mt-2 text-sm">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 px-4 py-2">
                    Denominación
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Organizado por
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Horas</th>
                  <th className="border border-gray-300 px-4 py-2">
                    En calidad
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Fecha de emisión
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudentData.module.map((module) => (
                  <tr
                    key={module.module.id}
                    className="text-center border-b border-gray-300"
                  >
                    <td className="px-4 py-2">{module.module.name}</td>
                    <td className="px-4 py-2">
                      {module.module.corporation.map((a) => a.institute)}
                    </td>
                    <td className="px-4 py-2 text-blue-600 cursor-pointer">
                      Ver
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
        </Modal>
      )}
    </div>
  );
};

export default SearchName;
