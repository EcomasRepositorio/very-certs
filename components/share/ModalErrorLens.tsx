import React, { useEffect } from "react";
import { X } from "lucide-react";

const ModalError: React.FC<{
  open: boolean; // Controla si el modal está visible
  onClose: () => void; // Función para cerrar el modal
  children: React.ReactNode; // Contenido dinámico del modal
}> = ({ open, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(); // Cierra el modal al presionar Escape
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null; // No renderiza nada si no está abierto

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">

        {children}

        {/* Botón de cierre adicional */}
        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="bg-customBlue dark:customBlue text-white px-4 py-2 rounded-lg mt-4"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalError;
