export interface StudentCourse {
    id: number;
    fullName: string;
    documentNumber: string;
    module: { module: { id: number; name: string; endDate: string } }[];
  }
  