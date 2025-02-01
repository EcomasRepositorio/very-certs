import { Quota } from "./Quota";
import { Corporation } from "./Corporation";

export interface StudentGraduate {
  id: number;
  fullName: string;
  documentNumber: string;
  code: string;
  quota?: Quota[];
  graduate?: {
    graduate: {
      id: number;
      name: string;
    };
  }[];
  corporation?: Corporation[];
  endDate?: string;
}
