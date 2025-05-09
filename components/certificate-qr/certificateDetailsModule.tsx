"use client";

import { useState } from "react";
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
import { CertificateDetailsPropsModule } from "@/components/utils/format/types";

const isValidDate = (date: any) => date && !isNaN(new Date(date).getTime());

const CertificateDetails = ({ corporation }: CertificateDetailsPropsModule) => {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const corpotationImageUrl = corporation.studentGraduate.corporation[0]
    .corporation.icon
    ? `${API_BASE_URL}${corporation.studentGraduate.corporation[0].corporation.icon}`
    : null;

  const getFormattedDate = (dateString: any) => {
    if (!isValidDate(dateString)) return "Fecha no disponible";

    // Convertir la fecha desde la API sin ajustar la zona horaria
    const utcDate = parseISO(dateString);

    // Forzar que la fecha se mantenga en UTC sin modificar
    return format(
      new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate()
      ),
      "dd/MM/yyyy"
    );
  };

  const formattedDate = corporation
      ? getFormattedDate(corporation?.endDate)
      : "Fecha no disponible";

  const moduleNames =
    corporation?.nameModule || "Nombre del modulo no disponible";

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/80 z-50">
      <div className="relative bg-slate-200 dark:bg-slate-200 rounded-xl shadow-lg p-8 max-w-4xl w-full">
        {/* Botón para cerrar el modal */}
        <button
          aria-label="Cerrar modal"
          onClick={() => {
            setShowModal(false);
            setTimeout(() => router.push("/certs/"), 300);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700  dark:hover:text-gray-400"
        >
          <X size={24} />
        </button>

        {/* Logo de Very Certs alineado en la esquina superior derecha */}
        <div className="hidden lg:flex absolute top-20 right-16  flex-col items-end space-y-2">
          <Image
            src={"/certificate/logos/VERTICAL_COLOR.svg"}
            alt="Logo de Very Certs claro"
            width={200}
            height={200}
            className="h-24 w-auto object-contain hidden dark:hidden lg:block"
          />
          {/* <Image
            src={"/certificate/logos/VERTICAL_BLANCO.svg"}
            alt="Logo de Very Certs oscuro"
            width={200}
            height={200}
            className="h-24 w-auto object-contain hidden dark:block lg:block"
          /> */}
        </div>

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
                      alt="Logo de la corporación - courses"
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
            <p className="text-base text-gray-600  mb-2">
              Certificado verificado a nombre de:
            </p>

            {/* Nombre del participante */}
            <div className="font-semibold text-3xl text-gray-800  mb-6">
              {corporation.fullName || "Nombre del participante no disponible"}
            </div>

            {/* Curso */}
            <p className="text-base text-gray-800  mb-4">
              Por culminar con éxito el curso taller:
            </p>
            <div className="bg-gray-100 dark:bg-gray-100 rounded-lg p-4 border-l-4 border-cyan-500">
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {moduleNames}
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
            <div className="flex items-center text-gray-600  mt-6 space-x-2">
              <span className="flex items-center space-x-2">
                <ShieldCheck className="text-cyan-500" size={20} />
                <strong>Doc. de Identidad: </strong>&nbsp;
                {corporation.documentNumber || "Código no disponible"}
              </span>
            </div>

            <div className="mt-4 text-gray-600  text-base space-y-3">
              <div className="flex items-center space-x-2">
                <LucideClock className="text-cyan-500" size={20} />
                <span>
                  <strong>Horas de capacitación:</strong>{" "}
                  {"20 horas"}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <LucideCalendarDays className="text-cyan-500" size={20} />
                <span>
                  <strong>Fecha de emisión: </strong> {formattedDate}
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
