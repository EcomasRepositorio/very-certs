export interface APIResponse {
  studentGraduate: StudentGraduate[];
  studentCourse: StudentCourse[];
  studentModule: StudentModule[];
  counter: number;
}

export interface Student {
  id: number;
  fullName: string;
  documentNumber: string;
  code: string;
  corporation?: CorporationContainer[];
}

export interface StudentGraduate extends Student {
  quota: Quota[];
  result: any[];
  graduate: GraduateContainer[];
  endDate?: string;
}

export interface StudentCourse extends Student {
  quota: Quota[];
  module: ModuleContainer[];
}

export interface StudentModule {
  id: number;
  fullName: string;
  documentNumber: string;
  nameModule: string;
  endDate: string;
  hours: string;
  code: string;
  corporation: string;
  studentGraduate: CorporationContainer;
}

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
  idGraduate?: number;
  voucherUpload: string | null;
  createdAt: string;
  updatedAt: string;
  studentGraduateId?: number;
  moduleId?: number;
  studentCourseId?: number;
}

export interface GraduateContainer {
  graduate: Graduate;
}

export interface Graduate {
  id: number;
  name: string;
}

export interface CorporationContainer {
  corporation: Corporation;
}

export interface Corporation {
  id: number;
  name: string;
  icon: string;
  image: string;
  graduate?: GraduateDetail[];
  module?: ModuleContainer[];
}

export interface GraduateDetail {
  credits: string;
  hours: string;
  corporation: {
    graduate: GraduateInstitute[];
  };
}

export interface GraduateInstitute {
  corporation: Corporation;
  institute: Institute | null;
}

export interface Institute {
  id: number;
  name: string;
  icon: string | null;
  image: string | null;
}

export interface ModuleContainer {
  module: Module;
}

export interface Module {
  id: number;
  name: string;
  startDate?: string;
  endDate: string;
  corporation?: Corporation[];
}
