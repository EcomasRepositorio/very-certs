import React from "react";

const ModalTest: React.FC<{
  open: boolean;
  children: React.ReactNode;
}> = ({ open, children }) => {
  if (!open) return null; // Desmonta el modal cuando no está abierto

  return <>{children}</>; // Renderiza únicamente el contenido pasado como children
};

export default ModalTest;
