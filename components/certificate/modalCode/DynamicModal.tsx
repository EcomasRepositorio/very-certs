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
import { format, parseISO } from "date-fns";

interface DynamicModalProps {
  open: boolean;
  onClose: () => void;
  data: any;
  dataType: "course" | "graduate" | "module";
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  open,
  onClose,
  data,
  dataType,
}) => {
  if (!open) return null;

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const corporationData =
    dataType === "module"
      ? data?.studentGraduate?.corporation?.[0]?.corporation
      : dataType === "course"
      ? data?.corporation?.[0]?.corporation
      : dataType === "graduate"
      ? data?.corporation?.[0]?.corporation
      : null;

  const corporationImageUrl = corporationData?.icon
    ? `${API_BASE_URL}${corporationData.icon}`
    : null;

  const instituteData =
    dataType === "module"
      ? data?.studentGraduate?.corporation?.[0]?.corporation?.graduate?.[0]
          ?.corporation?.graduate?.[0]?.institute
      : dataType === "course"
      ? data?.module?.[0]?.module?.corporation?.[0]?.institute
      : dataType === "graduate"
      ? data?.corporation?.[0]?.corporation?.graduate?.[0]?.corporation
          ?.graduate?.[0]?.institute
      : null;

  const instituteImageUrl = instituteData?.icon
    ? `${API_BASE_URL}${instituteData.icon}`
    : null;

  console.log("Institute Image URL:", instituteImageUrl);


  const thirdImageUrl = instituteData?.image
    ? `${API_BASE_URL}${instituteData.image}`
    : null;

  const logos = [corporationImageUrl, instituteImageUrl, thirdImageUrl].filter(
    Boolean
  );

  const isValidDate = (date: any) => date && !isNaN(new Date(date).getTime());

  const getFormattedDate = (dateString: any) => {
    if (!isValidDate(dateString)) return "Fecha no disponible";
    const utcDate = parseISO(dateString);
    return format(
      new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate()
      ),
      "dd/MM/yyyy"
    );
  };

  const formattedDate =
    dataType === "course"
      ? getFormattedDate(data?.module?.[0]?.module?.endDate)
      : getFormattedDate(data?.endDate);

  const itemName =
    dataType === "course"
      ? data?.module?.map((mod: any) => mod.module.name).join(", ") ||
        "Nombre del curso no disponible"
      : dataType === "module"
      ? data?.nameModule || "Nombre del módulo no disponible"
      : data?.graduate?.[0]?.graduate?.name ||
        "Nombre del programa no disponible";

  const hours =
    dataType === "module"
      ? "20 horas"
      : dataType === "graduate"
      ? data?.corporation?.[0]?.corporation?.graduate?.[0]?.hours || "0 horas"
      : dataType === "course"
      ? data?.module?.[0]?.module?.corporation?.[0]?.hours || "0 horas"
      : "0 horas";

  const credits =
    dataType === "graduate"
      ? data?.corporation?.[0]?.corporation?.graduate?.[0]?.credits ||
        "0 créditos"
      : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo semi-transparente */}
      <div className="bg-black/80 fixed inset-0" />

      <div
        className="relative bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full z-50 overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <button
          aria-label="Cerrar modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="flex">
          <div className="w-4 bg-cyan-500 rounded-l-xl"></div>

          <div className="flex-1 p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* VISTA MÓVIL (se muestra en pantallas pequeñas) */}
                <div className="block md:hidden">
                  <div className="text-xl font-bold text-gray-800 mb-2">
                    ORGANIZADO POR:
                  </div>

                  {corporationImageUrl || instituteImageUrl || thirdImageUrl ? (
                    <div className="flex flex-col items-center gap-4">
                      {corporationImageUrl && (
                        <div className="relative w-60 h-20">
                          <Image
                            src={corporationImageUrl}
                            alt="Logo Corporación"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      )}

                      {[instituteImageUrl, thirdImageUrl]
                        .filter(Boolean)
                        .map((logoUrl, idx) => (
                          <div
                            key={idx}
                            className="mt-2 mb-4 relative w-28 h-28"
                          >
                            <Image
                              src={logoUrl || ""}
                              alt={`Logo ${idx + 2}`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="mt-6 text-red-400">Logos no disponibles</p>
                  )}
                </div>

                {/* VISTA ESCRITORIO (se muestra en pantallas medianas en adelante) */}
                <div className="hidden md:block">
                  <div className=" text-xl font-bold text-gray-800 mb-2">
                    ORGANIZADO POR:
                  </div>

                  {corporationImageUrl || instituteImageUrl || thirdImageUrl ? (
                    <div className="flex flex-row items-center gap-6 -my-14">
                      {corporationImageUrl && (
                        <div className="relative w-40 h-40 md:w-60 md:h-60">
                          <Image
                            src={corporationImageUrl}
                            alt="Logo Corporación"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      )}

                      {[instituteImageUrl, thirdImageUrl]
                        .filter(Boolean)
                        .map((logoUrl, idx) => (
                          <div
                            key={idx}
                            className="relative w-32 h-32 md:w-28 md:h-28"
                          >
                            <Image
                              src={logoUrl || ""}
                              alt={`Logo ${idx + 2}`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="mt-6 text-red-400">Logos no disponibles</p>
                  )}
                </div>
              </div>
            </div>

            <p className="text-base text-gray-600 mb-2">
              Certificado verificado a nombre de:
            </p>
            <div className="font-semibold text-3xl text-gray-800 mb-6">
              {data?.fullName || "Nombre del participante no disponible"}
            </div>

            <p className="text-base text-gray-800 mb-4">
              Por culminar con éxito el{" "}
              {dataType === "course"
                ? "curso"
                : dataType === "module"
                ? "curso taller"
                : "diplomado"}
              :
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

            <div className="flex items-center text-gray-600 mt-6 space-x-2">
              <span className="flex items-center space-x-2">
                <ShieldCheck className="text-cyan-500" size={20} />
                <strong>Doc. de Identidad:</strong>&nbsp;
                {data?.documentNumber || "Código no disponible"}
              </span>
            </div>

            <div className="mt-4 text-gray-600 text-base space-y-3">
              <div className="flex items-center space-x-2">
                <LucideClock className="text-cyan-500" size={20} />
                <span>
                  <strong>Horas de capacitación:</strong> {hours}
                </span>
              </div>
              {dataType === "graduate" && (
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
