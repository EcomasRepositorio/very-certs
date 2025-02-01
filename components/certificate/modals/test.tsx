import React from "react";
import { CertificateDetailsPropsCourse } from "@/components/utils/format/typeSeacrh";
import Modal from "../../share/ModalSearchDni";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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

  const formattedDate = (date?: string | null) =>
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
        <Table className="w-full mt-2 border border-gray-300 rounded-lg overflow-hidden">
          <TableHeader className="bg-blue-500 text-white">
            <TableRow>
              <TableHead>Denominación</TableHead>
              <TableHead>Organizado por</TableHead>
              <TableHead>Créditos</TableHead>
              <TableHead>Fecha de emisión</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(student.studentGraduate) &&
              student.studentGraduate.map((graduate, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <TableCell>{graduate.graduate[0].graduate.name}</TableCell>

                  <TableCell>
                    {graduate.graduate[0].graduate.name || "N/A"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Cursos de Capacitación */}
        <h3 className="text-lg text-center font-semibold bg-blue-500 text-white px-4 py-2 rounded-md mt-6">
          Cursos de Capacitación
        </h3>
        <Table className="w-full mt-2 border border-gray-300 rounded-lg overflow-hidden">
          <TableHeader className="bg-blue-500 text-white">
            <TableRow>
              <TableHead>Denominación</TableHead>
              <TableHead>Organizado por</TableHead>
              <TableHead>Horas</TableHead>
              <TableHead>Fecha de emisión</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {student.studentCourse?.map((course, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <TableCell>
                  {Array.isArray(course.module) && course.module.length > 0
                    ? course.module[0].module.name
                    : "N/A"}
                </TableCell>

                <TableCell>
                  {Array.isArray(course.module) && course.module.length > 0
                    ? course.module[0].module.endDate
                    : "N/A"}
                </TableCell>

                <TableCell>
                  {Array.isArray(course.module) && course.module.length > 0
                    ? course.module[0].module.startDate
                    : "N/A"}
                </TableCell>

                <TableCell>{formattedDate(course.endDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Módulos de Especialización */}
        <h3 className="text-lg text-center font-semibold bg-green-500 text-white px-4 py-2 rounded-md mt-6">
          Módulos de Especialización
        </h3>
        <Table className="w-full mt-2 border border-gray-300 rounded-lg overflow-hidden">
          <TableHeader className="bg-green-500 text-white">
            <TableRow>
              <TableHead>Denominación</TableHead>
              <TableHead>Horas</TableHead>
              <TableHead>Fecha de emisión</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {student.studentModule?.map((module, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <TableCell>{module.nameModule}</TableCell>
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
