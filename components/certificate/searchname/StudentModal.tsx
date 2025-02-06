import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  StudentGraduate,
  StudentCourse,
  StudentModule,
} from "@/interface/types";

interface StudentModalProps {
  isOpen: boolean;
  student: StudentGraduate | null;
  setIsOpen: (isOpen: boolean) => void;
}

interface ExtendedStudent extends StudentGraduate {
  courses?: StudentCourse[];
  modules?: StudentModule[];
}

const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  student,
  setIsOpen,
}) => {
  const [selectedStudent, setSelectedStudent] =
    useState<ExtendedStudent | null>(null);

  const [isDynamicModalOpen, setIsDynamicModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null); // Almacena los datos del ítem seleccionado
  const [selectedDataType, setSelectedDataType] = useState<
    "course" | "graduate" | "module"
  >("graduate"); // Tipo de dato seleccionado

  const handleViewClick = (
    data: any,
    type: "course" | "graduate" | "module"
  ) => {
    setSelectedData(data);
    setSelectedDataType(type);
    setIsDynamicModalOpen(true);
  };

  // 📌 Sincroniza `selectedStudent` cuando `student` cambia
  useEffect(() => {
    if (isOpen && student) {
      setSelectedStudent(student);
    }
  }, [isOpen, student]);

  if (!isOpen || !selectedStudent) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg w-11/12 sm:w-4/5 max-w-5xl shadow-lg max-h-[80vh] overflow-y-auto">
        {/* Botón de cierre */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          &#10005;
        </button>

        {/* Información del estudiante */}
        <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100">
          {selectedStudent.fullName}
        </h2>
        <p className="text-center text-neutral-700 dark:text-neutral-300 text-lg">
          DNI: {selectedStudent.documentNumber}
        </p>

        {/* Sección de Diplomados */}
        {selectedStudent.graduate &&
          Array.isArray(selectedStudent.graduate) &&
          selectedStudent.graduate.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold bg-customBlue text-white px-4 py-2 rounded-md text-center">
                Diplomados de Especialización
              </h3>
              <div className="overflow-x-auto mt-2">
                <Table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg">
                  <TableHeader>
                    <TableRow className="bg-neutral-300 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100">
                      <TableHead className="text-left px-4 py-2">
                        Denominación
                      </TableHead>
                      <TableHead className="text-left px-4 py-2">
                        Organizado por
                      </TableHead>
                      <TableHead className="text-center px-4 py-2">
                        Créditos
                      </TableHead>
                      <TableHead className="text-center px-4 py-2">
                        Fecha de emisión
                      </TableHead>
                      <TableHead className="text-center px-4 py-2">
                        Acción
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow key={selectedStudent.id} className="border-b">
                      <TableCell className="px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {selectedStudent.graduate[0]?.graduate?.name || "N/A"}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {selectedStudent.corporation?.[0]?.corporation?.name ||
                          "N/A"}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {selectedStudent.corporation?.[0]?.corporation
                          ?.graduate?.[0]?.credits || "N/A"}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {selectedStudent.endDate
                          ? new Date(
                              selectedStudent.endDate
                            ).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        <Button
                          className="bg-customBlue dark:bg-customBlue text-white underline"
                          onClick={() =>
                            handleViewClick(selectedStudent, "graduate")
                          }
                        >
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

        {/* Sección de Cursos */}
        {selectedStudent.courses && selectedStudent.courses.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold bg-customBlue text-white px-4 py-2 rounded-md text-center">
              Cursos de Especialización
            </h3>
            <div className="overflow-x-auto mt-2">
              <Table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg">
                <TableHeader>
                  <TableRow className="bg-neutral-300 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100">
                    <TableHead className="text-left px-4 py-2">
                      Denominación
                    </TableHead>
                    <TableHead className="text-center px-4 py-2">
                      Organizado por
                    </TableHead>
                    <TableHead className="text-center px-4 py-2">
                      Fecha de emisión
                    </TableHead>
                    <TableHead className="text-center px-4 py-2">
                      Acción
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedStudent.courses.map((course) => (
                    <TableRow key={course.id} className="border-b">
                      <TableCell className="px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {course.module?.[0]?.module?.name || "N/A"}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {course.corporation?.[0]?.corporation?.name || "N/A"}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {course.module?.[0]?.module?.endDate
                          ? new Date(
                              course.module[0].module.endDate
                            ).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        <Button
                          className="bg-customBlue dark:bg-customBlue text-white underline"
                          onClick={() => handleViewClick(course, "course")}
                        >
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {selectedStudent.modules && selectedStudent.modules.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold bg-customBlue text-white px-4 py-2 rounded-md text-center">
              Cursos Taller
            </h3>
            <div className="overflow-x-auto mt-2">
              <Table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg">
                <TableHeader>
                  <TableRow className="bg-neutral-300 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100">
                    <TableHead className="text-left px-4 py-2">
                      Denominación
                    </TableHead>
                    <TableHead className="text-center px-4 py-2">
                      Organizado por
                    </TableHead>
                    <TableHead className="text-center px-4 py-2">
                      Código
                    </TableHead>
                    <TableHead className="text-center px-4 py-2">
                      Horas
                    </TableHead>
                    <TableHead className="text-center px-4 py-2">
                      Fecha de finalización
                    </TableHead>
                    <TableHead className="text-center px-4 py-2">
                      Acción
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedStudent.modules.map((module) => (
                    <TableRow key={module.id} className="border-b">
                      <TableCell className="px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {module.nameModule}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {module.studentGraduate.corporation.name || "ECOMAS"}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {module.code}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {module.hours} hrs
                      </TableCell>
                      <TableCell className="text-center px-4 py-2 text-neutral-800 dark:text-neutral-200">
                        {module.endDate
                          ? new Date(module.endDate).toLocaleDateString(
                              "es-ES",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-center px-4 py-2">
                        <Button
                          className="bg-customBlue dark:bg-customBlue text-white underline"
                          onClick={() => handleViewClick(module, "module")}
                        >
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentModal;
