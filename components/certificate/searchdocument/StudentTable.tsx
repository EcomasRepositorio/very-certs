import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentGraduate } from "@/interface/types";

interface StudentTableProps {
  studentData: StudentGraduate[];
  setSelectedStudent: (student: StudentGraduate) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  studentData,
  setSelectedStudent,
  setIsModalOpen,
}) => {
  if (studentData.length === 0) return null;

  

  return (
    <div className="overflow-x-auto">
      <Table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg">
        <TableHeader>
          <TableRow className="bg-gray-200 dark:bg-[#0F172A]">
            <TableHead className="text-center">#</TableHead>
            <TableHead className="text-center">Nombre</TableHead>
            <TableHead className="text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentData.map((student, index) => (
            <TableRow key={student.id} className="bg-gray-100 dark:bg-gray-700">
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{student.fullName}</TableCell>
              <TableCell className="text-center">
                <Button
                  className="bg-customBlue dark:bg-customDark text-white"
                  onClick={() => {
                    setSelectedStudent(student);
                    setIsModalOpen(true);
                  }}
                >
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
