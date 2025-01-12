"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./Style.css";
import Image from "next/image";
import animationData from "../../public/certificate/qr/animation/check-animation.json";
import { Player } from "@lottiefiles/react-lottie-player";

// Imports de Lucide
import {
  GraduationCap as LucideGraduationCap,
  Clock3 as LucideClock,
  CalendarDays as LucideCalendarDays,
  ShieldCheck,
  X,
} from "lucide-react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

interface CertificateDetailsProps {
  participantData: {
    fullName: string;
    code: string;
    graduate: [
      {
        graduate: {
          name: string; // Nombre del curso
          corporation: [
            {
              credits: string; // Créditos
              hours: string; // Horas
            }
          ];
        };
      }
    ];
  };
}

const CertificateDetails = ({ participantData }: CertificateDetailsProps) => {
  // Estado para controlar si el modal se muestra o no
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  // Si showModal es false, no renderizamos nada (cierra el modal)
  if (!showModal) {
    return null;
  }

  const graduateData = participantData.graduate?.[0]?.graduate || {};
  const corporationData = graduateData.corporation?.[0] || {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/80 z-50">
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-4xl w-full">
        {/* Botón para cerrar el modal */}
        <button
          onClick={() => {
            router.push("/certs/"); // Redirige a la página de inicio
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700
                     dark:text-gray-300 dark:hover:text-gray-100"
        >
          <X size={24} />
        </button>

        {/* Barra lateral azul */}
        <div className="flex">
          <div className="w-4 bg-cyan-500 rounded-l-xl"></div>
          <div className="flex-1 p-6">
            {/* Encabezado con logo */}
            <div className="flex items-center justify-between mb-10">
              {/* Texto ORGANIZADO POR */}
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  ORGANIZADO POR:
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                  VERY CERTS
                </p>
              </div>
              {/* Logo al extremo derecho */}
              <div>
                <Image
                  src={"/certificate/qr/log-light.png"}
                  alt="Logo_verycerts"
                  width={200}
                  height={200}
                  className="h-32 w-auto object-contain block dark:hidden"
                />
                <Image
                  src={"/certificate/qr/log-dark.png"}
                  alt="Logo_verycerts"
                  width={200}
                  height={200}
                  className="h-32 w-auto object-contain hidden dark:block"
                />
              </div>
            </div>

            {/* Certificado verificado */}
            <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
              Certificado verificado a nombre de:
            </p>

            {/* Nombre del participante */}
            <div className="font-semibold text-3xl text-gray-800 dark:text-gray-100 mb-6">
              {participantData?.fullName || "Nombre del participante"}
            </div>

            {/* Curso */}
            <p className="text-base text-gray-800 dark:text-gray-100 mb-4">
              Por culminar con éxito el Diplomado:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-cyan-500">
              {/* Nombre del curso */}
              <div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {graduateData?.name || "Nombre del curso no disponible"}
                </div>
                {/* Texto "Completado" con el ícono al costado */}
                <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  Completado
                  <div className="w-6 h-6 ml-0">
                    <Player
                      autoplay
                      loop
                      src={animationData}
                      style={{ height: "24px", width: "24px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ID del certificado */}
            <div className="flex items-center text-gray-600 dark:text-gray-300 mt-6 space-x-2">
              <span className="flex items-center space-x-2">
                <ShieldCheck className="text-cyan-500" size={20} />
                <strong>ID del certificado:</strong>{" "}
                {participantData?.code || "Código no disponible"}
              </span>
            </div>

            {/* Detalles adicionales */}
            <div className="mt-4 text-gray-600 dark:text-gray-300 text-base space-y-3">
              <div className="flex items-center space-x-2">
                <LucideClock className="text-cyan-500" size={20} />
                <span>
                  <strong>Horas de capacitación:</strong>{" "}
                  {corporationData?.hours || "0"} horas
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <LucideGraduationCap className="text-cyan-500" size={20} />
                <span>
                  <strong>Créditos:</strong> {corporationData?.credits || "0"}{" "}
                  créditos
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <LucideCalendarDays className="text-cyan-500" size={20} />
                <span>
                  <strong>Fecha:</strong> 23/03/2025
                </span>
              </div>
            </div>

            {/* 
            Si deseas mostrar el enlace al certificado, descomenta esta sección:
            
            <div className="mt-4">
              <span className="font-medium">Enlace:</span>{" "}
              <a
                href="https://www.youtube.com/watch?v=z3NsAtCWfjw"
                className="text-blue-600 underline dark:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link de certificado
              </a>
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetails;
