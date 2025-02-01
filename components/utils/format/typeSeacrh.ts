// src/interfaces/types.ts

export interface Quota {
  id: number;
  name: string;
  code: string;
  dateReceipt: string | null;
  hourReceipt: string | null;
  price: string;
  state: boolean;
  date: string;
  observation: string | null;
  observationOption: string | null;
  moduleId?: number;  // Opcional para evitar errores
  createdAt: string;
  updatedAt: string;
  studentCourseId?: number;
}

export interface Graduate {
  id: number;
  name: string;
}

export interface Corporation {
  id: number;
  name: string;
  icon: string;
  image: string;
}

export interface Module {
  id: number;
  name: string;
  startDate?: string;
  endDate: string;
  corporation?: Corporation[];
}

// 🔹 Definimos la estructura correcta de `studentGraduate`
export interface StudentGraduate {
  id: number;
  fullName: string;
  documentNumber: string;
  code: string;
  quota: Quota[];
  graduate: { graduate: Graduate }[];
  corporation: { corporation: Corporation }[];
  endDate?: string;
}

// 🔹 Definimos la estructura correcta de `studentCourse`
export interface StudentCourse {
  id: number;
  fullName: string;
  documentNumber: string;
  code: string;
  quota: Quota[];
  module?: { module: Module }[];
  corporation: { corporation: Corporation }[];
  endDate?: string;
}

// 🔹 Definimos la estructura correcta de `studentModule`
export interface StudentModule {
  id: number;
  fullName: string;
  documentNumber: string;
  nameModule: string;
  endDate: string;
  hours: string;
  code: string;
  corporation: string;
}

// 🔹 API Response para manejar los datos
export interface APIResponse {
  studentGraduate: StudentGraduate[];
  studentCourse: StudentCourse[];
  studentModule: StudentModule[];
  counter: number;
}

// 🔹 Extendemos de `StudentGraduate`, `StudentCourse` y `StudentModule` correctamente
export interface CertificateDetailsPropsCourse {
  id: number;
  fullName: string;
  documentNumber: string;
  code: string;
  quota: Quota[];
  studentGraduate?: StudentGraduate[];
  studentCourse?: StudentCourse[];
  studentModule?: StudentModule[];
}
