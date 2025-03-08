"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./Style.css";
import Image from "next/image";
import animationData from "../../public/certificate/qr/animation/check-animation.json";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  GraduationCap as LucideGraduationCap,
  Clock3 as LucideClock,
  CalendarDays as LucideCalendarDays,
  ShieldCheck,
  X,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { CertificateDetailsProps } from "@/components/utils/format/types";

const CertificateDetails = ({ participantData }: any) => {
  const [showModal, setShowModal] = useState(true);
  const [date, setDate] = useState(""); 
  const router = useRouter();

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://backclassroom.ecomas.pe";

   

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

  const corpotationImageUrl = participantData.corporation?.[0]?.corporation
    ?.icon
    ? `${API_BASE_URL}${participantData.corporation[0].corporation.icon}`
    : null;

    const instituteImageUrl = participantData.corporation?.[0]?.corporation?.graduate[0].corporation?.graduate[0]?.institute?.image
    ? `${API_BASE_URL}${participantData.corporation?.[0]?.corporation?.graduate[0].corporation?.graduate[0]?.institute?.image}`
    : null;



  const logos = [corpotationImageUrl, instituteImageUrl].filter(Boolean);

  useEffect(() => {
    // Establecer la fecha dinámica solo en el cliente
    setDate(new Date().toISOString());
  }, []);

  const graduateData = participantData.graduate?.[0]?.graduate || {
    name: "Información no disponible",
    corporation: [],
  };
  const formattedDate = participantData.endDate
    ? getFormattedDate(participantData.endDate)
    : "Fecha no disponible";

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/80 z-50">
      <div className="relative bg-slate-200 dark:bg-slate-200 rounded-xl shadow-lg p-8 max-w-4xl w-full">
        <button
          aria-label="Cerrar modal"
          onClick={() => {
            setShowModal(false);
            setTimeout(() => router.push("/certs/"), 300);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-700 dark:hover:text-gray-900"
        >
          <X size={24} />
        </button>


        <div className="flex">
          <div className="w-4 bg-cyan-500 rounded-l-xl"></div>
          <div className="flex-1 p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="block md:hidden ">
                  <div className="text-xl font-bold text-gray-800 mb-2">
                    ORGANIZADO POR:
                  </div>
                  {corpotationImageUrl || instituteImageUrl ? (
                    <div className="flex flex-col items-center gap-4">
                      {/* Logo Corporación (móvil) */}
                      {corpotationImageUrl && (
                        <div className="relative w-60 h-20">
                          <Image
                            src={corpotationImageUrl}
                            alt="Logo Corporación"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      )}

                      {/* Otros logos (móvil) */}
                      {[instituteImageUrl]
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
              </div>
            </div>

            {/* VISTA ESCRITORIO */}
            <div className="hidden md:block">
              <div className="text-xl font-bold text-gray-800 mb-2">
                ORGANIZADO POR:
              </div>
              {corpotationImageUrl || instituteImageUrl ? (
                <div className="flex flex-row items-center gap-6 -my-14">
                  {/* Logo Corporación (escritorio) */}
                  {corpotationImageUrl && (
                    <div className="relative w-40 h-40 md:w-60 md:h-60">
                      <Image
                        src={corpotationImageUrl}
                        alt="Logo Corporación"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  )}

                  {/* Otros logos (escritorio) */}
                  {[instituteImageUrl].filter(Boolean).map((logoUrl, idx) => (
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

            <p className="text-base text-gray-600 dark:text-gray-600 mb-2">
              Certificado verificado a nombre de:
            </p>

            <div className="font-semibold text-3xl text-gray-800 dark:text-gray-800 mb-6">
              {participantData?.fullName || "Nombre del participante"}
            </div>

            <p className="text-base text-gray-800 dark:text-gray-800 mb-4">
              Por culminar con éxito el Diplomado:
            </p>
            <div className="bg-gray-100 dark:bg-gray-100 rounded-lg p-4 border-l-4 border-cyan-500">
              <div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-800">
                  {graduateData?.name || "Nombre del curso no disponible"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-600 flex items-center">
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

            <div className="flex items-center text-gray-600 dark:text-gray-600 mt-6 space-x-2">
              <span className="flex items-center space-x-2">
                <ShieldCheck className="text-cyan-500" size={20} />
                <strong>Doc. de Identidad:</strong>&nbsp;
                {participantData?.documentNumber || "Código no disponible"}
              </span>
            </div>

            <div className="mt-4 text-gray-600 dark:text-gray-600 text-base space-y-3">
              <div className="flex items-center space-x-2">
                <LucideClock className="text-cyan-500" size={20} />
                <span>
                  <strong>Horas de capacitación:</strong>{" "}
                  {participantData.corporation?.[0]?.corporation?.graduate?.[0]
                    ?.hours || "0"}{" "}
                  horas
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <LucideGraduationCap className="text-cyan-500" size={20} />
                <span>
                  <strong>Créditos:</strong>{" "}
                  {participantData.corporation?.[0]?.corporation?.graduate?.[0]
                    ?.credits || "0"}{" "}
                  créditos
                </span>
              </div>

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

export default CertificateDetails;
