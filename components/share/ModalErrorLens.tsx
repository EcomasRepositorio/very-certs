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
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">

        {children}

        {/* Botón de cierre adicional */}
        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalError;
