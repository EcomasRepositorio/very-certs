import React from "react";
import { Button } from "@/components/ui/button";

interface NoResultsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NoResultsModal: React.FC<NoResultsModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
       <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                No se encontraron resultados
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Intente con otro DNI.
              </p>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-customBlue dark:customBlue text-white px-4 py-2 rounded-lg mt-4"
              >
                Cerrar
              </Button>
            </div>
          </div>
    </div>
  );
};

export default NoResultsModal;
