"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";
import errorAnimation from "../../public/certificate/qr/animation/error.json";
import { FcOnlineSupport } from "react-icons/fc";

export const ModalError = () => {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 dark:bg-black/80 bg-opacity-60 z-50">
      <div className="relative  bg-slate-200 bg-[length:200%] animate-gradient-move font-semibold rounded-2xl shadow-lg p-6 sm:p-8 transition-all max-w-md w-[90%] text-center">
        {/* Botón para cerrar */}
        <button
          aria-label="Cerrar modal"
          onClick={() => {
            setShowModal(false);
            setTimeout(() => router.push("/certs/"), 300);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 "
        >
          <X size={24} />
        </button>

        {/* Animación Lottie */}
        <div className="flex justify-center items-center mb-2 mt-6">
          <Player
            autoplay
            loop
            src={errorAnimation}
            style={{ height: "320px", width: "320px" }}
          />
        </div>

        {/* Contenido del Modal */}
        <div className="text-3xl font-bold text-red-500 mb-4">
          Ups, algo salió mal!
        </div>
        <div className="text-gray-800 font-light text-lgmb-2">
          No encontramos información asociada a este código QR. Si necesitas
          ayuda, ponte en contacto con nuestro equipo de soporte.
          <div className="text-gray-600 text-lg font-semibold text-center mt-2 flex items-center justify-center">
            {/* Enlace que redirige a WhatsApp con un mensaje predefinido */}
            <a
              href="https://wa.me/994946573?text=Hola,%20el%20código%20QR%20de%20mi%20certificado%20me%20lleva%20a%20un%20error."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-center space-x-2 hover:underline"
            >
              <span className="underline ">Haz click aquí</span>
              <FcOnlineSupport className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Espaciado para una mejor simetría */}
        <div className="mt-4" />
      </div>
    </div>
  );
};

export default ModalError;
