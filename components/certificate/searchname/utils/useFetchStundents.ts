import { useState } from "react";
import axios from "axios";
import { veryURL } from "@/components/utils/format/tokenConfig";
import { APIResponse, StudentGraduate, StudentCourse, StudentModule } from "@/interface/types";
import useCounterStore from "@/store/counterStore";

interface ExtendedStudent extends StudentGraduate {
  courses?: StudentCourse[];
  modules?: StudentModule[];
}

const useFetchStudents = (
  queryValue: string,
  setNoResultsModal: (value: boolean) => void
) => {
  const [studentData, setStudentData] = useState<ExtendedStudent[]>([]);
  const [loading, setLoading] = useState(false);

  const searchDNI = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!queryValue.trim()) return;

    setLoading(true);
    try {
      const url = `${veryURL()}/search/students?search=${queryValue.trim()}`;
      const res = await axios.get<APIResponse>(url);
      const data = res.data;

      console.log("🔍 Respuesta completa:", data);

      // Extraer datos asegurando que sean arrays válidos
      const graduates = data.studentGraduate ?? [];
      const courses = data.studentCourse ?? [];
      const modules = data.studentModule ?? [];

      // Si no hay datos en ninguna categoría, mostrar "No se encontraron resultados"
      if (graduates.length === 0 && courses.length === 0 && modules.length === 0) {
        setStudentData([]);
        setNoResultsModal(true);
        return;
      }

      // Mapeo y combinación de datos
      const combinedData: ExtendedStudent[] = [];

      // Procesar graduados
      graduates.forEach((graduate) => {
        combinedData.push({
          ...graduate,
          courses: courses.filter(course => course.documentNumber === graduate.documentNumber),
          modules: modules.filter(module => module.documentNumber === graduate.documentNumber),
        });
      });

      // Agregar cursos que no tengan un `graduate` asociado
      courses.forEach((course) => {
        if (!combinedData.some(student => student.documentNumber === course.documentNumber)) {
          combinedData.push({
            id: course.id,
            fullName: course.fullName,
            documentNumber: course.documentNumber,
            code: course.code ?? "", // Asegurar que exista `code`
            corporation: course.corporation ?? [], // Si tiene `corporation`, lo asigna, sino, array vacío
            graduate: [], // No es un graduado, entonces vacío
            quota: course.quota ?? [], // Si tiene `quota`, la asigna, sino, array vacío
            result: [], // Campo vacío porque no aplica
            courses: [course], // Se guarda como array
            modules: [], // No tiene módulos asociados
          } as ExtendedStudent); // Se castea a `ExtendedStudent`
        }
      });

      // Agregar módulos que no tengan un `graduate` o `course` asociado
      modules.forEach((module) => {
        if (!combinedData.some(student => student.documentNumber === module.documentNumber)) {
          combinedData.push({
            id: module.id,
            fullName: module.fullName,
            documentNumber: module.documentNumber,
            code: module.code ?? "", // Asegurar `code`
            corporation: [], // No tiene una estructura de `corporation`
            graduate: [], // No es un graduado
            quota: [], // No tiene cuotas
            result: [], // No tiene resultados asociados
            courses: [], // No tiene cursos asociados
            modules: [module], // Se guarda como array
          } as ExtendedStudent);
        }
      });

      // Guardar datos combinados en el estado
      setStudentData(combinedData);

      // Actualizar contador global (si existe)
      if (data.counter) {
        useCounterStore.getState().setCount(data.counter);
      }

    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      setStudentData([]);
      setNoResultsModal(true);
    } finally {
      setLoading(false);
    }
  };

  return { studentData, loading, searchDNI };
};

export default useFetchStudents;
