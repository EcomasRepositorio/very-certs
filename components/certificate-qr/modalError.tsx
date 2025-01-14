"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";
import errorAnimation from "../../public/certificate/qr/animation/error.json";

export const ModalError = () => {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 dark:bg-black/80 bg-opacity-60 z-50">
      <div className="relative bg-gradient-to-br from-white via-gray-100 to-gray-300 dark:from-black dark:via-[#001A6E] dark:to-black bg-[length:200%] animate-gradient-move font-semibold rounded-2xl shadow-lg p-6 sm:p-8 transition-all max-w-md w-[90%] text-center">
        {/* Botón para cerrar */}
        <button
          aria-label="Cerrar modal"
          onClick={() => {
            setShowModal(false);
            setTimeout(() => router.push("/certs/"), 300);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <X size={24} />
        </button>

        {/* Animación Lottie */}
        <div className="flex justify-center items-center mb-6">
          <Player
            autoplay
            loop
            src={errorAnimation}
            style={{ height: "350px", width: "350px" }}
          />
        </div>

        {/* Contenido del Modal */}
        <div className="text-2xl font-bold text-red-500 mb-4">
          Ups, algo salió mal!
        </div>
        <p className="text-gray-800 dark:text-white mb-2">
          No encontramos información asociada a este código QR.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Si necesitas ayuda, ponte en contacto con nuestro equipo de soporte.
        </p>

        {/* Espaciado para una mejor simetría */}
        <div className="mt-4" />
      </div>
    </div>
  );
};

export default ModalError;
