"use client";

import { useState, useEffect, useMemo } from "react";
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
  const router = useRouter();

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ;
  const STATIC_IMAGE = "/certificate/fundee.png";

  const isValidDate = (date: any) => date && !isNaN(new Date(date).getTime());
  const getFormattedDate = (dateString: any) => {
    if (!isValidDate(dateString)) return "Fecha no disponible";
    return format(parseISO(dateString), "dd/MM/yyyy");
  };

  const corporationImageUrl = participantData.corporation?.[0]?.corporation?.icon
    ? `${API_BASE_URL}${participantData.corporation[0].corporation.icon}`
    : null;

  const instituteImageUrl = participantData.corporation?.[0]?.corporation?.graduate?.[0]?.corporation?.graduate?.[0]?.institute?.image
    ? `${API_BASE_URL}${participantData.corporation?.[0]?.corporation?.graduate?.[0]?.corporation?.graduate?.[0]?.institute?.image}`
    : null;

  const logos = useMemo(() => {
    const list = [];
    if (corporationImageUrl) list.push(corporationImageUrl);
    if (instituteImageUrl) {
      list.push(instituteImageUrl);
      list.push(STATIC_IMAGE); // Agregar logo estático si existe instituteImageUrl
    }
    return list;
  }, [corporationImageUrl, instituteImageUrl]);

  const graduateData = participantData.graduate?.[0]?.graduate || {
    name: "Información no disponible",
    corporation: [],
  };

  const formattedDate = participantData.endDate
    ? getFormattedDate(participantData.endDate)
    : "Fecha no disponible";

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/80 z-50">
      <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full z-50 overflow-y-auto" style={{ maxHeight: "90vh" }}>
        <button
          aria-label="Cerrar modal"
          onClick={() => {
            setShowModal(false);
            setTimeout(() => router.push("/certs/"), 300);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-900"
        >
          <X size={24} />
        </button>

        <div className="flex">
          <div className="w-4 bg-cyan-500 rounded-l-xl"></div>
          <div className="flex-1 p-6">
            {/* Contenedor de logos */}
            <div className="text-xl font-bold text-gray-800 mb-2">ORGANIZADO POR:</div>

            {/* Vista móvil */}
            <div className="block md:hidden flex flex-col items-center gap-4 -mt-8">
              {logos.length > 0 && (
                <div className="relative w-48 h-40 -mb-10">
                  <Image
                    src={logos[0]}
                    alt="Logo principal"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              )}
              <div className="flex flex-row items-center gap-4 mb-6">
                {logos.slice(1).map((logoUrl, idx) => (
                  <div key={idx} className="relative w-24 h-24">
                    <Image
                      src={logoUrl}
                      alt={`Logo ${idx + 2}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Vista escritorio */}
            <div className="hidden md:flex flex-row items-center justify-start gap-6">
              {logos.length > 0 && (
                <div className="relative w-60 h-24">
                  <Image
                    src={logos[0]}
                    alt="Logo principal"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              )}
              <div className="flex flex-row items-center gap-4 mb-6">
                {logos.slice(1).map((logoUrl, idx) => (
                  <div key={idx} className="relative w-24 h-24">
                    <Image
                      src={logoUrl}
                      alt={`Logo ${idx + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            <p className="text-base text-gray-600 mt-6">Certificado verificado a nombre de:</p>
            <div className="font-semibold text-3xl text-gray-800">{participantData?.fullName || "Nombre del participante"}</div>

            <p className="text-base text-gray-800 mt-4">Por culminar con éxito el Diplomado:</p>
            <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-cyan-500">
              <div className="text-lg font-semibold text-gray-800">{graduateData?.name || "Nombre del curso no disponible"}</div>
            </div>

            <div className="mt-6 text-gray-600 text-base space-y-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="text-cyan-500" size={20} />
                <strong>Doc. de Identidad:</strong> {participantData?.documentNumber || "Código no disponible"}
              </div>
              <div className="flex items-center space-x-2">
                <LucideClock className="text-cyan-500" size={20} />
                <span><strong>Horas de capacitación:</strong> {participantData.corporation?.[0]?.corporation?.graduate?.[0]?.hours || "0"} horas</span>
              </div>
              <div className="flex items-center space-x-2">
                <LucideGraduationCap className="text-cyan-500" size={20} />
                <span><strong>Créditos:</strong> {participantData.corporation?.[0]?.corporation?.graduate?.[0]?.credits || "0"} créditos</span>
              </div>
              <div className="flex items-center space-x-2">
                <LucideCalendarDays className="text-cyan-500" size={20} />
                <span><strong>Fecha de emisión:</strong> {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CertificateDetails;
