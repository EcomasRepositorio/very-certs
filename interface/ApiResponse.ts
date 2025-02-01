import { StudentGraduate } from "./StudentGraduate";
import { StudentCourse } from "./StudentCourse";
import { StudentModule } from "./StudentModule";

export interface APIResponse {
  studentGraduate: StudentGraduate[];
  studentCourse: StudentCourse[];
  studentModule: StudentModule[];
  counter: number;
}
