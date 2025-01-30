import React from "react";
import { CertificateDetailsPropsCourse } from "@/components/utils/format/typeSeacrh";
import Modal from "../../share/ModalSearchDni";

interface StudentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  student: CertificateDetailsPropsCourse | null;
}

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ open, onClose, student }) => {
  if (!student) return null;

  console.log(student);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg max-w-5xl w-full mx-auto max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Nombre y DNI */}
        <h2 className="text-center text-2xl font-bold text-gray-200">
          {student.fullName}
        </h2>
        <p className="text-center text-lg text-gray-600 font-semibold mb-6">
          DNI: {student.documentNumber}
        </p>

        {/* Diplomados de Especialización */}
        <h3 className="text-lg text-center font-semibold bg-blue-500 text-white px-4 py-2 rounded-md">
          Diplomados de especialización
        </h3>
        <table className="w-full border-collapse border border-gray-300 mt-2 text-sm">
          <thead>
            <tr className="bg-blue-500 text-white text-center">
              <th className="border border-gray-300 px-4 py-2">Denominación</th>
              <th className="border border-gray-300 px-4 py-2">Organizado por</th>
              <th className="border border-gray-300 px-4 py-2">Créditos</th>
              <th className="border border-gray-300 px-4 py-2">En calidad</th>
              <th className="border border-gray-300 px-4 py-2">Fecha de emisión</th>
              <th className="border border-gray-300 px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {student?.corporation.map((diplomado) => (
              <tr key={diplomado.corporation.id} className="border-b border-gray-300">
                <td className="px-4 py-3">{diplomado.corporation.name}</td>
               
                <td className="px-4 py-3 text-blue-600 cursor-pointer">Ver</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Cursos de Capacitación */}
        <h3 className="text-lg text-center font-semibold bg-blue-500 text-white px-4 py-2 rounded-md mt-6">
          Cursos de capacitación
        </h3>
        <table className="w-full border-collapse border border-gray-300 mt-2 text-sm">
          <thead>
            <tr className="bg-blue-500 text-white text-center">
              <th className="border border-gray-300 px-4 py-2">Denominación</th>
              <th className="border border-gray-300 px-4 py-2">Organizado por</th>
              <th className="border border-gray-300 px-4 py-2">Horas</th>
              <th className="border border-gray-300 px-4 py-2">En calidad</th>
              <th className="border border-gray-300 px-4 py-2">Fecha de emisión</th>
              <th className="border border-gray-300 px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {student.module?.map((module) => (
              <tr key={module.module.id} className="border-b border-gray-300">
                <td className="px-4 py-3">{module.module.name}</td>
                <td className="px-4 py-3">
                  {module.module.corporation.map((a) => a.institute).join(", ")}
                </td>
                dates hours 
                {/* <td className="px-4 py-3">{module.module.hours} Hrs</td>
                <td className="px-4 py-3">{module.module.quality}</td>
                <td className="px-4 py-3">{module.module.issueDate}</td> */}
                <td className="px-4 py-3 text-blue-600 cursor-pointer">Ver</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default StudentDetailsModal;
