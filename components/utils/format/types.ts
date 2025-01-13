export interface ParticipantData {
    id: number;
    code: string;
    uuidCode: string;
    fullName: string;
    quota: any[]; // Parece que está vacío en los datos proporcionados, pero lo puedes ajustar según la lógica
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
  
  export interface CourseData {
    id: number;
    fullName: string; // Nombre completo del participante
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
          institute: string | null; // Instituto relacionado (puede ser nulo)
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

  