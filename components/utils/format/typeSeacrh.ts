
export interface CertificateDetailsPropsCourse {
      id: number;
      fullName: string; // Nombre completo del participante
      documentNumber: string;
      code: string; // Código del certificado
      quota: {
        id: number;
        name: string; // Nombre de la cuota
        code: string; // Código de la cuota
        dateReceipt: string | null; // Fecha de recibo
        hourReceipt: string | null; // Hora de recibo
        price: string; // Precio de la cuota
        state: boolean; // Estado de la cuota (pagado o no)
        date: string; // Fecha de vencimiento de la cuota
        observation: string | null; // Observaciones
        observationOption: string | null; // Opción de observación
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
  
  }
  
  
  
  
  