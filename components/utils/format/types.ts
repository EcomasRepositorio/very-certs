export interface CertificateDetailsProps {
  participantData: {
    id: number;
    code: string;
    uuidCode: string;
    documentNumber: string;
    fullName: string;

    quota: {
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
      idGraduate: number;
      voucherUpload: string | null;
      createdAt: string;
      updatedAt: string;
      studentGraduateId: number;
    }[];

    result: any[]; // Sin detalles en los datos, se deja como `any[]`

    graduate: {
      graduate: {
        id: number;
        name: string;
      };
    }[];

    corporation: {
      corporation: {
        id: number;
        name: string;
        image: string;
        icon: string | null;

        graduate: {
          credits: string;
          hours: string;

          // Aquí está la clave correcta para `institute`
          corporation: {
            graduate: {
              corporation: {
                id: number;
                name: string;
              };
              institute: {
                id: number;
                name: string;
                image: string;
                icon: string | null;
              };
            }[];
          };
        }[];

        module: {
          module: {
            id: number;
            name: string;
            startDate: string;
            endDate: string;
          };
        }[];
      };
    }[];

    endDate: string;
  };
}


export interface ParticipantData {
  id: number;
  code: string;
  uuidCode: string;
  fullName: string;
  documentNumber: string;
  quota: any[]; // Puedes ajustar el tipo si es necesario
  result: any[]; // Lo mismo que `quota`
  graduate: {
    graduate: {
      id: number;
      name: string;
    };
  }[];
  corporation: {
    corporation: {
      id: number;
      name: string;
      image: string;
      icon: string;
      graduate: {
        credits: string;
        hours: string;
        institute: {
          id: number;
          name: string;
          image: string;
          icon: string | null;
        };
      }[];
      module: {
        module: {
          id: number;
          name: string;
          startDate: string;
          endDate: string;
        };
      }[];
    };
  }[];
  endDate: string;
}
  
 // types/type.ts

 export interface CourseData {
  id: number;
  fullName: string;
  documentNumber: string;
  code: string;
  uuidCode: string;
  quota: {
    id: number;
    name: string;
    code: string;
    dateReceipt: string;
    hourReceipt: string;
    price: string;
    state: boolean;
    studentCourseId: number;
  }[];
  module: {
    id: number;
    name: string;
    endDate: string;
    corporation: {
      institute: {
        id: number;
        name: string;
        icon: string | null;
        image: string | null;
      };
    }[];
  }[];
  corporation: {
    id: number;
    name: string;
    icon: string | null;
    image: string | null;
  }[];
}


export interface CertificateDetailsPropsCourse {
  courseData: {
    id: number;
    fullName: string; // Nombre completo del participante
    documentNumber: string;
    code: string; // Código del certificado
    uuidCode: string; // Código único del certificado
    quota: {
      id: number;
      name: string; // Nombre de la cuota
      code: string; // Código de la cuota
      dateReceipt: string; // Fecha de recibo
      hourReceipt: string; // Hora de recibo
      price: string; // Precio de la cuota
      state: boolean; // Estado de la cuota (pagado o no)
      date: string; // Fecha de vencimiento de la cuota
      observation: string; // Observaciones
      observationOption: string; // Opción de observación
      moduleId: number; // ID del módulo relacionado
      createdAt: string; // Fecha de creación
      updatedAt: string; // Fecha de actualización
      studentCourseId: number; // ID del curso del estudiante
    }[];
    module: {
      module: {
        id: number; // ID del módulo
        name: string; // Nombre del módulo
        endDate: string; // Fecha de fin del módulo
        corporation: {
          institute: {
            id: number;
            name: string;
            icon: string | null;
            image: string | null;
          } // Instituto relacionado (puede ser nulo)
        }[];
      };
    }[];
    corporation: {
      corporation: {
        id: number; // ID de la corporación
        name: string; // Nombre de la corporación
        icon: string; // URL del icono de la corporación
        image: string; // URL de la imagen de la corporación
      };
    }[];
  };
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
  idGraduate: number;
  voucherUpload: string | null;
  createdAt: string;
  updatedAt: string;
  studentGraduateId: number;
}

export interface Graduate {
  graduate: {
    id: number;
    name: string;
  };
}

export interface Corporation {
  corporation: {
    id: number;
    name: string;
    icon: string;
    image: string;
    graduate: {
      credits: string;
      hours: string;
      corporation: { graduate: Graduate[] };
    }[];
    module: {
      module: {
        id: number;
        name: string;
        startDate: string;
        endDate: string;
      };
    }[];
  };
}

export interface StudentGraduate {
  id: number;
  fullName: string;
  documentNumber: string;
  code: string;
  quota: Quota[];
  result: any[]; // Define según los datos reales
  graduate: Graduate[];
  corporation: Corporation[];
  endDate: string;
}

export interface DataStudent {
  studentGraduate: StudentGraduate[];
}







export interface Corporation {
  id: number;
  name: string;
  icon?: string;
  image?: string;
}

export interface ModuleData {
  id: number;
  code: string;
  uuidCode: string;
  fullName: string;
  documentNumber: string;
  nameModule: string;
  endDate: string;
  hours: string;
  corporation: string; // Es un string en los datos reales
  studentGraduate: {
    corporation: {
      corporation: Corporation;
    }[];
  }; // Estructura anidada integrada
}

export interface CertificateDetailsPropsModule {
  corporation: ModuleData;
}
