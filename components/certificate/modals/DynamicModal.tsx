"use client";

import { useState } from "react";
import Image from "next/image";
import animationData from "../../../public/certificate/qr/animation/check-animation.json";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  GraduationCap as LucideGraduationCap,
  Clock3 as LucideClock,
  CalendarDays as LucideCalendarDays,
  ShieldCheck,
  X,
} from "lucide-react";
import { format } from "date-fns";

interface DynamicModalProps {
  open: boolean;
  onClose: () => void;
  data: any; // Datos dinámicos para el modal
  isCourse: boolean; // Indica si es curso o diplomado
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  open,
  onClose,
  data,
  isCourse,
}) => {
  if (!open) return null;

  const API_BASE_URL = "https://backclassroom.ecomas.pe";

  // Imagen de la corporación
  const corpotationImageUrl = data?.corporation?.[0]?.corporation?.icon
    ? `${API_BASE_URL}${data.corporation[0].corporation.icon}`
    : null;

  // Fecha formateada
  const formattedDate = isCourse
    ? data?.module?.[0]?.module?.endDate
      ? format(new Date(data.module[0].module.endDate), "dd/MM/yyyy")
      : "Fecha no disponible"
    : data?.endDate
    ? format(new Date(data.endDate), "dd/MM/yyyy")
    : "Fecha no disponible";

  // Nombre dinámico del curso o diplomado
  const itemName = isCourse
    ? data?.module?.map((mod: any) => mod.module.name).join(", ") ||
      "Nombre del curso no disponible"
    : data?.graduate?.[0]?.graduate?.name ||
      "Nombre del diplomado no disponible";

  // Horas dinámicas
  const hours = isCourse
    ? "50 horas" // Ejemplo estático para cursos
    : data?.corporation?.[0]?.corporation?.graduate?.[0]?.hours || "0 horas";

  // Créditos dinámicos (solo para graduates)
  const credits = !isCourse
    ? data?.corporation?.[0]?.corporation?.graduate?.[0]?.credits ||
      "0 créditos"
    : null;

  return (
    <div
      className={`fixed inset-0 flex items-center  justify-center z-50 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="bg-black/80 fixed inset-0 z-50"></div>

      <div
        className="relative bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full z-50 overflow-y-auto"
        style={{ maxHeight: "90vh" }} // Para evitar que el modal se salga de la pantalla en vistas pequeñas
      >
        {/* Botón para cerrar */}
        <button
          aria-label="Cerrar modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Barra lateral azul */}
        <div className="flex">
          <div className="w-4 bg-cyan-500 rounded-l-xl"></div>
          <div className="flex-1 p-6">
            {/* Encabezado con logo */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xl font-bold text-gray-800">
                  ORGANIZADO POR:
                </div>
                <div className="mt-6">
                  {corpotationImageUrl ? (
                    <Image
                      src={corpotationImageUrl}
                      alt="Logo de la corporación"
                      width={250}
                      height={250}
                      className="object-cover"
                    />
                  ) : (
                    <p>Logo no disponible</p>
                  )}
                </div>
              </div>
            </div>

            {/* Certificado verificado */}
            <p className="text-base text-gray-600 mb-2">
              Certificado verificado a nombre de:
            </p>
            <div className="font-semibold text-3xl text-gray-800 mb-6">
              {data?.fullName || "Nombre del participante no disponible"}
            </div>

            {/* Nombre del curso o diplomado */}
            <p className="text-base text-gray-800 mb-4">
              Por culminar con éxito el {isCourse ? "curso" : "diplomado"}:
            </p>
            <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-cyan-500">
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {itemName}
                </div>
                <div className="text-sm text-gray-600 flex items-center">
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
            <div className="flex items-center text-gray-600 mt-6 space-x-2">
              <span className="flex items-center space-x-2">
                <ShieldCheck className="text-cyan-500" size={20} />
                <strong>Doc. de Identidad:</strong>&nbsp;
                {data?.documentNumber || "Código no disponible"}
              </span>
            </div>

            {/* Detalles adicionales */}
            <div className="mt-4 text-gray-600 text-base space-y-3">
              <div className="flex items-center space-x-2">
                <LucideClock className="text-cyan-500" size={20} />
                <span>
                  <strong>Horas de capacitación:</strong> {hours}
                </span>
              </div>
              {!isCourse && (
                <div className="flex items-center space-x-2">
                  <LucideGraduationCap className="text-cyan-500" size={20} />
                  <span>
                    <strong>Créditos:</strong> {credits}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <LucideCalendarDays className="text-cyan-500" size={20} />
                <span>
                  <strong>Fecha de emisión:</strong> {formattedDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
