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

const SearchDNI: React.FC = () => {
  const [queryValue, setQueryValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<
    (StudentGraduate | StudentCourse | StudentModule)[]
  >([]);
  const [selectedStudent, setSelectedStudent] = useState<
    (StudentGraduate & { courses?: StudentCourse[] }) | null
  >(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noResultsModal, setNoResultsModal] = useState(false);

  const searchDNI = async (event: FormEvent) => {
    event.preventDefault();
    if (!queryValue.trim()) return;

    setLoading(true);
    try {
      const url = `${veryURL()}/search/students?search=${queryValue.trim()}`;
      const res = await axios.get<APIResponse>(url);

      if (res.data) {
        const combinedData = res.data.studentGraduate.map((graduate) => ({
          ...graduate,
          courses: res.data.studentCourse.filter(
            (course) => course.documentNumber === graduate.documentNumber
          ),
        }));
        setStudentData(combinedData);
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
    <div className="p-4">
      <h1 className="text-xl font-bold text-center mb-4">
        Búsqueda de Participantes
      </h1>

      <form onSubmit={searchDNI} className="flex gap-2 justify-center mb-4">
        <input
          type="search"
          className="border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Ingrese su Documento de Identidad"
          required
          value={queryValue}
          onChange={(e) => setQueryValue(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Buscar
        </Button>
      </form>

      {loading && <Spinner className="flex justify-center" />}

      {Array.isArray(studentData) && studentData.length > 0 && (
        <Table className="border border-gray-300 rounded-lg">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-center">#</TableHead>
              <TableHead className="text-center">Nombre</TableHead>
              <TableHead className="text-center">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentData.map((student, index) => (
              <TableRow
                key={student.id}
                className="hover:bg-gray-100 transition"
              >
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">
                  {student.fullName}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    onClick={() => {
                      setSelectedStudent(
                        student as StudentGraduate & {
                          courses?: StudentCourse[];
                        }
                      );
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
      )}

      {noResultsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h3 className="text-xl font-bold text-gray-900">
              No se encontraron resultados
            </h3>
            <p className="text-gray-600 mt-2">Intente con otro DNI.</p>
            <Button
              onClick={() => setNoResultsModal(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}

      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-4/5 max-w-5xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              {selectedStudent.fullName}
            </h2>
            <p className="text-center text-gray-600 text-lg">
              DNI: {selectedStudent.documentNumber}
            </p>

            {/* Diplomados */}
            {selectedStudent?.graduate?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold bg-blue-500 text-white px-4 py-2 rounded-md text-center">
                  Diplomados de Especialización
                </h3>
                <Table className="border border-gray-300 rounded-lg">
                  <TableHeader>
                    <TableRow className="bg-blue-500 text-white">
                      <TableHead className="text-lef text-gray-200 px-4 py-2">
                        Denominación
                      </TableHead>
                      <TableHead className="text-left text-gray-200 px-4 py-2">
                        Organizado por
                      </TableHead>
                      <TableHead className="text-center text-gray-200 px-4 py-2">
                        Créditos
                      </TableHead>
                      <TableHead className="text-center text-gray-200 px-4 py-2">
                        Fecha de emisión
                      </TableHead>
                      <TableHead className="text-center text-gray-200 px-4 py-2">
                        Acción
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedStudent &&
                      selectedStudent.graduate?.length > 0 && (
                        <TableRow key={selectedStudent.id} className="border-b">
                          <TableCell className="px-4 py-2 text-gray-800">
                            {selectedStudent.graduate[0].graduate.name || "N/A"}
                          </TableCell>
                          <TableCell className="px-4 py-2 text-gray-800">
                            {selectedStudent.corporation?.[0]?.corporation
                              ?.name || "N/A"}
                          </TableCell>
                          <TableCell className="text-center text-gray-800 px-4 py-2">
                            {selectedStudent.corporation?.[0]?.corporation
                              ?.graduate?.[0].credits || "N/A"}
                          </TableCell>
                          <TableCell className="text-center text-gray-800 px-4 py-2">
                            {selectedStudent.endDate
                              ? new Date(
                                  selectedStudent.endDate
                                ).toLocaleDateString("es-ES", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })
                              : "N/A"}

                            {/* {new Date().toLocaleDateString()} */}
                          </TableCell>
                          <TableCell className="text-center px-4 py-2">
                            <Button className="text-blue-500 underline">
                              Ver
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                  </TableBody>
                </Table>
              </div>
            )}

            {selectedStudent?.courses && selectedStudent.courses.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold bg-blue-500 text-white px-4 py-2 rounded-md text-center">
                  Cuotas del Curso
                </h3>
                <Table className="border border-gray-300 rounded-lg">
                  <TableHeader>
                    <TableRow className="bg-blue-500 text-white">
                      <TableHead className="text-left px-4 py-2">
                        Nombre
                      </TableHead>
                      <TableHead className="text-center px-4 py-2">
                        Precio
                      </TableHead>
                      <TableHead className="text-center px-4 py-2">
                        Fecha
                      </TableHead>
                      <TableHead className="text-center px-4 py-2">
                        Estado
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    selectedStudent
                    {selectedStudent.quota.map((q) => (
                      <TableRow key={q.id} className="border-b">
                        <TableCell className="px-4 py-2 text-gray-800">
                          {q.name}
                        </TableCell>
                        <TableCell className="text-center text-gray-800 px-4 py-2">
                          S/{q.price}
                        </TableCell>
                        <TableCell className="text-center text-gray-800 px-4 py-2">
                          {new Date(q.date).toLocaleDateString("es-ES")}
                        </TableCell>
                        <TableCell className="text-center text-gray-800 px-4 py-2">
                          {q.state ? "Pagado" : "Pendiente"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDNI;
