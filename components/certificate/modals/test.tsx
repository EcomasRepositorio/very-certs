import React, { useState, FormEvent } from "react";
import axios from "axios";
import { veryURL } from "@/components/utils/format/tokenConfig";
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
  const [studentData, setStudentData] = useState<any[]>([]);
  const [selectedStudentData, setSelectedStudentData] = useState<any | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchDNI = async (event: FormEvent) => {
    event.preventDefault();
    if (!queryValue.trim()) return;

    setLoading(true);
    try {
      const url = `${veryURL()}/search/students?search=${queryValue.trim()}`;
      const res = await axios.get(url);

      if (res.data) {
        const studentRecords = [
          ...res.data.studentGraduate,
          ...res.data.studentCourse,
          ...res.data.studentModule,
        ];
        console.log("📌 Datos de la API:", res.data);

        const uniqueStudents = Array.from(
          new Map(studentRecords.map((s) => [s.documentNumber, s])).values()
        );
        setStudentData(uniqueStudents);
      }
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      setStudentData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-center mb-4">
        Búsqueda de Participantes
      </h1>

      {/* Formulario de búsqueda */}
      <form onSubmit={searchDNI} className="flex gap-2 justify-center mb-4">
        <input
          type="search"
          className="border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Ingrese su Documento de Identidad"
          required
          value={queryValue}
          onChange={(e) => setQueryValue(e.target.value)}
        />
        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Buscar
        </Button>
      </form>

      {loading && <Spinner className="flex justify-center" />}

      {/* Tabla de estudiantes */}
      {studentData.length > 0 && (
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
              <TableRow key={student.id} className="hover:bg-gray-100 transition">
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{student.fullName}</TableCell>
                <TableCell className="text-center">
                  <Button
                    onClick={() => {
                      setSelectedStudentData(student);
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

      {/* MODAL */}
      {isModalOpen && selectedStudentData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-4/5 max-w-4xl">
            <h2 className="text-xl font-bold text-center">
              {selectedStudentData.fullName}
            </h2>
            <p className="text-center text-gray-600">
              DNI: {selectedStudentData.documentNumber}
            </p>

            {/* Diplomados */}
            {Array.isArray(selectedStudentData.graduate) &&
              selectedStudentData.graduate.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold bg-blue-500 text-white px-4 py-2 rounded-md text-center">
                    Diplomados de Especialización
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Denominación</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedStudentData.graduate.map((grad, index) => (
                        <TableRow key={index}>
                          <TableCell>{grad.graduate?.name || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

            {/* Cursos */}
            {Array.isArray(selectedStudentData.module) &&
              selectedStudentData.module.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold bg-blue-500 text-white px-4 py-2 rounded-md text-center">
                    Cursos de Capacitación
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre del Curso</TableHead>
                        <TableHead>Fecha de Inicio</TableHead>
                        <TableHead>Fecha de Fin</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedStudentData.module.map((course, index) => (
                        <TableRow key={index}>
                          <TableCell>{course.module?.name || "N/A"}</TableCell>
                          <TableCell>{course.module?.startDate || "N/A"}</TableCell>
                          <TableCell>{course.module?.endDate || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

            {/* Corporaciones */}
            {Array.isArray(selectedStudentData.corporation) &&
              selectedStudentData.corporation.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold bg-blue-500 text-white px-4 py-2 rounded-md text-center">
                    Institución
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedStudentData.corporation.map((corp, index) => (
                        <TableRow key={index}>
                          <TableCell>{corp.corporation?.name || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

            {/* Botón para cerrar el modal */}
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
