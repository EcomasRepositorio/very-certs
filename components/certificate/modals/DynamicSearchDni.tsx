import React from "react";
import { CertificateDetailsPropsCourse } from "@/components/utils/format/typeSeacrh";
import Modal from "../../share/ModalSearchDni";
import { format, isValid } from "date-fns";

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
    date && isValid(new Date(date)) ? format(new Date(date), "dd/MM/yyyy") : "Fecha no disponible";

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg max-w-5xl w-full mx-auto max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-200">
          {student.studentGraduate?.[0]?.fullName}
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 font-semibold mb-6">
          DNI: {student.studentGraduate?.[0]?.documentNumber}
        </p>

        {/* Diplomados de Especialización */}
        <h3 className="text-lg text-center font-semibold bg-blue-500 text-white px-4 py-2 rounded-md">
          Diplomados de Especialización
        </h3>
        <table className="w-full mt-2 border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border px-4 py-2">Denominación</th>
              <th className="border px-4 py-2">Organizado por</th>
            </tr>
          </thead>
          <tbody>
            {student.studentGraduate?.map((graduate, index) => (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border px-4 py-2">{graduate.graduate?.[0]?.graduate?.name || "N/A"}</td>
                <td className="border px-4 py-2">{graduate.corporation?.[0]?.corporation?.name || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Cursos de Capacitación */}
        <h3 className="text-lg text-center font-semibold bg-blue-500 text-white px-4 py-2 rounded-md mt-6">
          Cursos de Capacitación
        </h3>
        <table className="w-full mt-2 border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border px-4 py-2">Denominación</th>
              <th className="border px-4 py-2">Fecha de Inicio</th>
              <th className="border px-4 py-2">Fecha de Fin</th>
              <th className="border px-4 py-2">Instituto</th>
            </tr>
          </thead>
          <tbody>
            {student.studentCourse?.map((course, index) => (
              <tr key={index} className="border hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border px-4 py-2">{course.module?.[0]?.module?.name || "N/A"}</td>
                <td className="border px-4 py-2">{formattedDate(course.module?.[0]?.module?.startDate)}</td>
                <td className="border px-4 py-2">{formattedDate(course.module?.[0]?.module?.endDate)}</td>
                <td className="border px-4 py-2">
                  {course.module?.[0]?.module?.corporation?.[0]?.name || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Módulos de Especialización */}
        <h3 className="text-lg text-center font-semibold bg-green-500 text-white px-4 py-2 rounded-md mt-6">
          Módulos de Especialización
        </h3>
        <table className="w-full mt-2 border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="border px-4 py-2">Denominación</th>
              <th className="border px-4 py-2">Horas</th>
              <th className="border px-4 py-2">Fecha de emisión</th>
            </tr>
          </thead>
          <tbody>
            {student.studentModule?.map((module, index) => (
              <tr key={index} className="border hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border px-4 py-2">{module.fullName || "N/A"}</td>
                <td className="border px-4 py-2">{module.documentNumber} Hrs</td>
                <td className="border px-4 py-2">{formattedDate(module.endDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default StudentDetailsModal;
