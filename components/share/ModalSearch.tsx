import React from "react";

const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ open, onClose, children }) => {
  const overlayClass = open
    ? "visible backdrop-blur-sm bg-black/50 dark:bg-black/80"
    : "invisible";
  const modalClass = open
    ? "scale-100 opacity-100 z-100"
    : "scale-110 opacity-0";

  return (
    <div
      className={`fixed inset-0 p-4 z-50 flex justify-center items-center transition-colors ${overlayClass}`}
      onClick={() => open && onClose()} // Cierra solo si el modal está abierto
    >
      <div
        className={`relative bg-slate-200 dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all max-w-2xl sm:w-full w-full ${modalClass}`}
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro cierre el modal
      >
        <button
          aria-label="Cerrar modal"
          className="absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-white bg-blue-800 hover:bg-red-600"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
