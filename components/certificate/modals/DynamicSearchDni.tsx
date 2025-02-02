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

 
  console.log("📌 Datos recibidos en el modal:", student); // Depuración
  console.log("🎓 Diplomados:", student.studentGraduate);
  console.log("📚 Cursos:", student.studentCourse);
  console.log("📖 Módulos:", student.studentModule);

  // 🔹 Verificar que los datos existan
  const studentGraduate = student.studentGraduate ?? [];
  const studentCourse = student.studentCourse ?? [];
  const studentModule = student.studentModule ?? [];

  // ✅ Verificar si hay datos en cada sección
  const hasGraduates = studentGraduate.length > 0;
  const hasCourses = studentCourse.length > 0;
  const hasModules = studentModule.length > 0;

  // 🔹 Función para formatear fechas correctamente
  const formattedDate = (date?: string | null) =>
    date && isValid(new Date(date)) ? format(new Date(date), "dd/MM/yyyy") : "Fecha no disponible";

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg max-w-5xl w-full mx-auto max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-200">
          {student.fullName}
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 font-semibold mb-6">
          DNI: {student.documentNumber}
        </p>

        {/* 🔹 Mostrar Diplomados si existen */}
        {hasGraduates && (
          <h3 className="text-lg text-center font-semibold bg-blue-500 text-white px-4 py-2 rounded-md">
            Diplomados de Especialización
          </h3>
        )}

        {/* 🔹 Mostrar Cursos si existen */}
        {hasCourses && (
          <h3 className="text-lg text-center font-semibold bg-blue-500 text-white px-4 py-2 rounded-md mt-6">
            Cursos de Capacitación
          </h3>
        )}

        {/* 🔹 Mostrar Módulos si existen */}
        {hasModules && (
          <h3 className="text-lg text-center font-semibold bg-green-500 text-white px-4 py-2 rounded-md mt-6">
            Módulos de Especialización
          </h3>
        )}
      </div>
    </Modal>
  );
};

export default StudentDetailsModal;
