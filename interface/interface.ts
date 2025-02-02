import { Student } from "@/interface/types";

// ✅ Propiedades que usa el componente `SearchDNI`
export interface SearchDNIProps {
  onSearchDNI: (data: Student[]) => void;
}

// ✅ Propiedades para búsqueda de estudiantes por DNI
export interface SearchStudentDNIProps {
  onSearchDNI: (query: string, queryValue: string) => void;
}
