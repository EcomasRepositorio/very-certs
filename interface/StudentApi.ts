export interface StudentAPI {
  id: number;
  fullName: string;
  documentNumber: string;
  code?: string; // Opcional porque no todos los datos lo tienen
  type: "Graduate" | "Course" | "Module"; // Identifica el tipo de estudiante

  // 🔹 Opcionales según el tipo de estudiante
  graduateName?: string; // Para `studentGraduate`
  moduleName?: string; // Para `studentModule`
  courseName?: string; // Para `studentCourse`
  endDate?: string; // Fecha de finalización si aplica
  hours?: string; // Horas del curso/módulo si aplica
  corporation?: string; // Institución asociada
}
