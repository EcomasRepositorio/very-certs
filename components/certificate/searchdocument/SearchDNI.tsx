import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@nextui-org/react";
import useFetchStudents from "./utils/useFetchStudents";
import {
    APIResponse,
    StudentGraduate,
    StudentCourse,
    StudentModule,
  } from "@/interface/types";
import SearchForm from "./SearchForm";
import StudentTable from "./StudentTable";
import StudentModal from "./StudentModal";
import NoResultsModal from "./NoResultsModal";

interface ExtendedStudent extends StudentGraduate {
  courses?: StudentCourse[];
  modules?: StudentModule[];
}


const SearchDNI: React.FC = () => {
  const [queryValue, setQueryValue] = useState("");

  const [selectedStudent, setSelectedStudent] =
    useState<ExtendedStudent | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noResultsModal, setNoResultsModal] = useState(false);

  const { studentData, loading, searchDNI } = useFetchStudents(
    queryValue,
    setNoResultsModal
  );

  return (
    <div>
      <SearchForm queryValue={queryValue} setQueryValue={setQueryValue} searchDNI={searchDNI} />
      
      {loading && (
        <div className="flex justify-center my-4">
          <Spinner />
        </div>
      )}

      <StudentTable studentData={studentData} setSelectedStudent={setSelectedStudent} setIsModalOpen={setIsModalOpen} />

      <NoResultsModal isOpen={noResultsModal} setIsOpen={setNoResultsModal} />

      <StudentModal isOpen={isModalOpen} student={selectedStudent} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default SearchDNI;
