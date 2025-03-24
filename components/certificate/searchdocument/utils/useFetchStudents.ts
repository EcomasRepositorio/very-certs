import { useState } from "react";
import axios from "axios";
import { veryURL } from "@/components/utils/format/tokenConfig";
import {
  APIResponse,
  StudentGraduate,
  StudentCourse,
  StudentModule,
} from "@/interface/types";
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

      console.log("🔍 Respuesta completa:", data.studentCourse);


      const graduates = data.studentGraduate ?? [];
      const courses = data.studentCourse ?? [];
      const modules = data.studentModule ?? [];

    
      if (
        graduates.length === 0 &&
        courses.length === 0 &&
        modules.length === 0
      ) {
        setStudentData([]);
        setNoResultsModal(true);
        return;
      }


      const combinedData: ExtendedStudent[] = [];

      graduates.forEach((graduate) => {
        combinedData.push({
          ...graduate,
          courses: courses.filter(
            (course) => course.documentNumber === graduate.documentNumber
          ),
          modules: modules.filter(
            (module) => module.documentNumber === graduate.documentNumber
          ),
        });
      });
      
      
      courses.forEach((course) => {
        const existingStudent = combinedData.find(
          (student) => student.documentNumber === course.documentNumber
        );

        if (existingStudent) {
          existingStudent.courses = existingStudent.courses
            ? [...existingStudent.courses, course]
            : [course];
        } else {
          combinedData.push({
            id: course.id,
            fullName: course.fullName,
            documentNumber: course.documentNumber,
            code: course.code ?? "",
            corporation: course.corporation ?? [],
            graduate: [],
            quota: course.quota ?? [],
            result: [],
            courses: [course],
            modules: [],
          } as ExtendedStudent);
        }
      });

      // Agregar módulos que no tengan un `graduate` o `course` asociado
      modules.forEach((module) => {
        if (
          !combinedData.some(
            (student) => student.documentNumber === module.documentNumber
          )
        ) {
          combinedData.push({
            id: module.id,
            fullName: module.fullName,
            documentNumber: module.documentNumber,
            code: module.code ?? "",
            corporation: [], 
            graduate: [], 
            quota: [],
            result: [], 
            courses: [], 
            modules: [module], 
          } as ExtendedStudent);
        }
      });

      setStudentData(combinedData);

   
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
