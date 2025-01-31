import React from "react";
import { CertificateDetailsPropsCourse } from "@/components/utils/format/typeSeacrh";
import Modal from "../../share/ModalSearchDni";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface StudentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  student: CertificateDetailsPropsCourse | null;
}

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
  open,
  onClose,
  student,
}) => {
  if (!student) return null;

  console.log(student);

  const formattedDate = (date?: string) =>
    date ? format(new Date(date), "dd/MM/yyyy") : "Fecha no disponible";

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg max-w-5xl w-full mx-auto max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-200">
          {student.fullName}
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 font-semibold mb-6">
          DNI: {student.documentNumber}
        </p>

        {/* Diplomados de Especialización */}
        <h3 className="text-lg text-center font-semibold bg-blue-500 text-white px-4 py-2 rounded-md">
          Diplomados de Especialización
        </h3>
        <Table className="w-full mt-2 border border-gray-300">
          <TableHead className="bg-blue-500 text-white">
            <TableRow>
              <TableCell>Denominación</TableCell>
              <TableCell>Organizado por</TableCell>
              <TableCell>Créditos</TableCell>
              <TableCell>Fecha de emisión</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(student.studentGraduate) &&
              student.studentGraduate.map((diplomado, index) => (
                <TableRow key={index}>
                  <TableCell>{diplomado.name}</TableCell>
                  <TableCell>{diplomado.corporation || "N/A"}</TableCell>
                  <TableCell>{diplomado.credits || "N/A"}</TableCell>
                  <TableCell>{formattedDate(diplomado.endDate)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Cursos de Capacitación */}
        <h3 className="text-lg text-center font-semibold bg-blue-500 text-white px-4 py-2 rounded-md mt-6">
          Cursos de Capacitación
        </h3>
        <Table className="w-full mt-2 border border-gray-300">
          <TableHead className="bg-blue-500 text-white">
            <TableRow>
              <TableCell>Denominación</TableCell>
              <TableCell>Organizado por</TableCell>
              <TableCell>Horas</TableCell>
              <TableCell>Fecha de emisión</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(student.studentCourse) &&
              student.studentCourse.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.corporation || "N/A"}</TableCell>
                  <TableCell>{course.hours} Hrs</TableCell>
                  <TableCell>{formattedDate(course.endDate)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Módulos de Especialización */}
        <h3 className="text-lg text-center font-semibold bg-green-500 text-white px-4 py-2 rounded-md mt-6">
          Módulos de Especialización
        </h3>
        <Table className="w-full mt-2 border border-gray-300">
          <TableHead className="bg-green-500 text-white">
            <TableRow>
              <TableCell>Denominación</TableCell>
              <TableCell>Horas</TableCell>
              <TableCell>Fecha de emisión</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(student.studentModule) &&
              student.studentModule.map((module, index) => (
                <TableRow key={index}>
                  <TableCell>{module.name}</TableCell>
                  <TableCell>{module.hours} Hrs</TableCell>
                  <TableCell>{formattedDate(module.endDate)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Modal>
  );
};

export default StudentDetailsModal;
