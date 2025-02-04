import { useState } from "react";
import axios from "axios";
import { veryURL } from "@/components/utils/format/tokenConfig";
import { StudentCourse, StudentModule } from "@/interface/types";
import { APIResponse, StudentGraduate } from "@/interface/types";
import useCounterStore from "@/store/counterStore";

interface ExtendedStudent extends StudentGraduate {
  courses?: StudentCourse[];
  modules?: StudentModule[];
}

const useFetchStudents = (
  queryValue: string,
  setNoResultsModal: (value: boolean) => void
) => {
  const [studentData, setStudentData] = useState<StudentGraduate[]>([]);
  const [loading, setLoading] = useState(false);

  const searchDNI = async (event: React.FormEvent) => {
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

      if (res.data.counter) {
        useCounterStore.getState().setCount(res.data.counter);
      }

      console.log(res.data);
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
