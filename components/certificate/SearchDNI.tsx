import React, { useState, FormEvent } from "react";
import axios from "axios";
import { veryURL } from "@/components/utils/format/tokenConfig";
import {
  APIResponse,
  StudentGraduate,
  StudentCourse,
  StudentModule,
} from "@/interface/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@nextui-org/react";
import "./Styles.css";

// Tipo extendido para incluir cursos y módulos asociados al graduado.
interface ExtendedStudent extends StudentGraduate {
  courses?: StudentCourse[];
  modules?: StudentModule[];
}

const SearchDNI: React.FC = () => {
  const [queryValue, setQueryValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<ExtendedStudent[]>([]);
  const [selectedStudent, setSelectedStudent] =
    useState<ExtendedStudent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noResultsModal, setNoResultsModal] = useState(false);

  const searchDNI = async (event: FormEvent) => {
    event.preventDefault();
    if (!queryValue.trim()) return;

    setLoading(true);
    try {
      const url = `${veryURL()}/search/students?search=${queryValue.trim()}`;
      const res = await axios.get<APIResponse>(url);
      const data = res.data;

      if (data && data.studentGraduate) {
        // Combina los datos de graduados, cursos y módulos en un único objeto.
        const combinedData: ExtendedStudent[] = data.studentGraduate.map(
          (graduate) => ({
            ...graduate,
            courses: data.studentCourse.filter(
              (course) => course.documentNumber === graduate.documentNumber
            ),
            modules: data.studentModule.filter(
              (module) => module.documentNumber === graduate.documentNumber
            ),
          })
        );
        setStudentData(combinedData);
      } else {
        setStudentData([]);
        setNoResultsModal(true);
      }
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      setStudentData([]);
      setNoResultsModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <form onSubmit={searchDNI} className="w-full ">
        <div className="flex items-center mb-4">
          <div className="flex-1">
            <input
              type="search"
              id="default-search"
              className="font-normal text-sm text-gray-900 border-1 border-gray-300 rounded-lg bg-white focus:border-primaryblue m-0"
              placeholder="Ingrese su Documento de Identidad"
              required
              onChange={(e) => setQueryValue(e.target.value)}
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

      {loading && (
        <div className="flex justify-center my-4">
          <Spinner />
        </div>
      )}

      {/* Contenedor de la tabla con overflow para datos largos */}
      {studentData.length > 0 && (
        <div className="overflow-x-auto">
          <Table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg">
            <TableHeader>
              <TableRow className="bg-gray-200 dark:bg-gray-800">
                <TableHead className="text-center">#</TableHead>
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentData.map((student, index) => (
                <TableRow
                  key={student.id}
                  className="bg-gray-100 dark:bg-gray-700"
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">
                    {student.fullName}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      className="bg-customBlue dark:bg-customDark text-white"
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsModalOpen(true);
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

      {/* Modal para "No se encontraron resultados" */}
      {noResultsModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              No se encontraron resultados
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Intente con otro DNI.
            </p>
            <Button
              onClick={() => setNoResultsModal(false)}
              className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}

      {/* Modal de detalles del estudiante */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          {/* Modal con colores equilibrados para light/dark */}
          <div className="relative bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg w-11/12 sm:w-4/5 max-w-5xl shadow-lg max-h-[80vh] overflow-y-auto">
            {/* Botón de cierre en la esquina superior derecha */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              &#10005;
            </button>
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
                            {selectedStudent.graduate[0]?.graduate?.name ||
                              "N/A"}
                          </TableCell>
                          <TableCell className="px-4 py-2 text-neutral-800 dark:text-neutral-200">
                            {selectedStudent.corporation?.[0]?.corporation?.name ||
                              "N/A"}
                          </TableCell>
                          <TableCell className="text-center px-4 py-2 text-neutral-800 dark:text-neutral-200">
                            {selectedStudent.corporation?.[0]?.corporation?.graduate?.[0]?.credits ||
                              "N/A"}
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
                            <Button className="bg-customBlue dark:bg-customBlue text-white underline">
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
                            {course.corporation?.[0]?.corporation?.name ||
                              "N/A"}
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
                            <Button className="bg-customBlue dark:bg-customBlue text-white underline">
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

            {/* Sección de Módulos */}
            {selectedStudent.modules && selectedStudent.modules.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold bg-customBlue text-white px-4 py-2 rounded-md text-center">
                  Módulos de Especialización
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDNI;
