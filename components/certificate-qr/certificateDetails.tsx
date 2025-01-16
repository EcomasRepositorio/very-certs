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
import { format } from "date-fns";
import { CertificateDetailsProps } from "@/components/utils/format/types";

const CertificateDetails = ({ participantData }: CertificateDetailsProps) => {
  const [showModal, setShowModal] = useState(true);
  const [date, setDate] = useState(""); // Fecha dinámica en estado
  const router = useRouter();

  const API_BASE_URL = "https://backclassroom.ecomas.pe";

  console.log(participantData);

  const corpotationImageUrl = participantData.corporation?.[0]?.corporation
    ?.icon
    ? `${API_BASE_URL}${participantData.corporation[0].corporation.icon}`
    : null;

  useEffect(() => {
    // Establecer la fecha dinámica solo en el cliente
    setDate(new Date().toISOString());
  }, []);

  const graduateData = participantData.graduate?.[0]?.graduate || {
    name: "Información no disponible",
    corporation: [],
  };
  const formattedDate = participantData.endDate
    ? format(new Date(participantData.endDate), "dd/MM/yyyy")
    : "Fecha no disponible";

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/80 z-50">
      <div className="relative bg-slate-200 rounded-xl shadow-lg p-8 max-w-4xl w-full">
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

        {/* Logo de Very Certs posicionado en la esquina superior derecha */}
        <div className="hidden lg:flex absolute top-20 right-16 flex-col items-end space-y-2">
          {/* Logo para pantallas claras */}
          <Image
            src={"/certificate/logos/VERTICAL_COLOR.svg"}
            alt="Logo de Very Certs Light"
            width={200}
            height={200}
            className="h-24 w-auto object-contain hidden dark:hidden lg:block"
          />
        
          {/* <Image
            src={"/certificate/logos/VERTICAL_BLANCO.svg"}
            alt="Logo de Very Certs Dark"
            width={200}
            height={200}
            className="h-24 w-auto object-contain hidden dark:block lg:block"
          /> */}
        </div>

        <div className="flex">
          <div className="w-4 bg-cyan-500 rounded-l-xl"></div>
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  ORGANIZADO POR:
                </div>
                <div className="mt-6">
                  {corpotationImageUrl ? (
                    <Image
                      src={corpotationImageUrl}
                      alt="Logo de la corporación - graduates"
                      width={250}
                      height={250}
                      className=" object-cover"
                    />
                  ) : (
                    <p>Logo no disponible</p>
                  )}
                </div>
              </div>
            </div>

            <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
              Certificado verificado a nombre de:
            </p>

            <div className="font-semibold text-3xl text-gray-800 dark:text-gray-100 mb-6">
              {participantData?.fullName || "Nombre del participante"}
            </div>

            <p className="text-base text-gray-800 dark:text-gray-100 mb-4">
              Por culminar con éxito el Diplomado:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-cyan-500">
              <div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {graduateData?.name || "Nombre del curso no disponible"}
                </div>
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

            <div className="flex items-center text-gray-600 dark:text-gray-300 mt-6 space-x-2">
              <span className="flex items-center space-x-2">
                <ShieldCheck className="text-cyan-500" size={20} />
                <strong>Doc. de Identidad:</strong>&nbsp;
                {participantData?.documentNumber || "Código no disponible"}
              </span>
            </div>

            <div className="mt-4 text-gray-600 dark:text-gray-300 text-base space-y-3">
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
