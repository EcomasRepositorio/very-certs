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
    moduleId: number;  // <-- Asegurar que sea obligatorio
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
  
  export interface Student {
    id: number;
    name: string;  // <-- Añadir propiedades faltantes
    activityAcademy: string;
    datets: string;
    fullName: string;
    documentNumber: string;
    code: string;
    quota: Quota[];
    module?: { module: Module }[];
    corporation: { corporation: Corporation }[];
    graduate?: { graduate: Graduate }[];
    endDate?: string;
    date: string;
  }
  
  export interface APIResponse {
    studentGraduate: Student[];
    studentCourse: Student[];
    studentModule: Student[];
    counter: number;
  }
  