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
import { Student, APIResponse } from "@/interface/types";
import Modalerror from "../share/ModalErrorLens";
import DynamicModalDni from "./modals/DynamicSearchDni";
import "./Styles.css";
import { Spinner } from "@nextui-org/react";
import useCounterStore from "@/store/counterStore";
import Image from "next/image";

const SearchDNI: React.FC<SearchDNIProps> = ({ onSearchDNI }) => {
  const [queryValue, setQueryValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudentData, setSelectedStudentData] =
    useState<Student | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.value);
  };

  const handleOpenModal = (dni: string) => {
    const studentDetails = studentData.find((s) => s.documentNumber === dni);

    if (studentDetails) {
      const fullStudentData = {
        ...studentDetails,
        studentGraduate: studentData.filter(
          (s) => s.documentNumber === dni && s.graduate
        ),
        studentCourse: studentData.filter(
          (s) => s.documentNumber === dni && s.module
        ),
        studentModule: studentData.filter(
          (s) => s.documentNumber === dni && s.module
        ),
      };

      setSelectedStudentData(fullStudentData);
      setModalOpen(true);
    }
  };

  const searchDNI = async (event: FormEvent) => {
    event.preventDefault();
    if (!queryValue.trim()) return;

    setLoading(true);
    try {
      const url = `${veryURL()}/search/students?search=${queryValue.trim()}`;
      const res = await axios.get<APIResponse>(url);

      if (res.data) {
        const studentRecords = [
          ...res.data.studentGraduate,
          ...res.data.studentCourse,
          ...res.data.studentModule,
        ];
        setStudentData(studentRecords);
        onSearchDNI(studentRecords);
      }
      console.log(res.data);

      if (res.data.counter) {
        useCounterStore.getState().setCount(res.data.counter);
      }
    } catch (error) {
      console.error(
        "❌ Error en la solicitud:",
        axios.isAxiosError(error)
          ? error.response?.data || error.message
          : error
      );
      setStudentData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={searchDNI} className="w-full">
        <div className="flex items-center">
          <div className="flex-1">
            <input
              type="search"
              id="default-search"
              className="font-normal text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:border-transparent"
              placeholder="Ingrese su Documento de Identidad"
              required
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

      {studentData.length > 0 && (
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
                      onClick={() => handleOpenModal(student.documentNumber)}
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

export default SearchDNI;
