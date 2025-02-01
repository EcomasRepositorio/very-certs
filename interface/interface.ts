// ✅ Propiedades exactas según la API
export interface StudentAPI {
  id: number;
  fullName: string;
  documentNumber: string;
  code: string;
  quota?: Quota[];
  graduate?: StudentGraduate[];
  corporation?: StudentCorporation[];
  endDate?: string;
}

// ✅ Datos de cuotas (extraído de la API)
export interface Quota {
  id: number;
  name: string;
  code: string;
  dateReceipt?: string | null;
  price: string;
  state: boolean;
  date: string;
}

// ✅ Estructura para estudiantes graduados (API)
export interface StudentGraduate {
  graduate: {
    id: number;
    name: string;
  };
}

// ✅ Estructura para cursos (API)
export interface StudentCourse {
  module: {
    id: number;
    name: string;
    endDate: string;
    corporation: StudentCorporation[];
  };
}

// ✅ Estructura para módulos (API)
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

// ✅ Corporaciones (API)
export interface StudentCorporation {
  corporation: {
    id: number;
    name: string;
    icon?: string;
    image?: string;
  };
}

// ✅ Tipo de respuesta de la API
export interface APIResponse {
  studentGraduate: StudentAPI[];
  studentCourse: StudentAPI[];
  studentModule: StudentAPI[];
  counter: number;
}

// ✅ Search Props corregidos
export interface SearchDNIProps {
  onSearchDNI: (data: StudentAPI[]) => void;
}

export interface SearchStudentDNIProps {
  onSearchDNI: (query: string, queryValue: string) => void;
}
