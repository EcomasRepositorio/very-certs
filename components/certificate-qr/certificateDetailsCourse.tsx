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
import { CertificateDetailsPropsCourse } from "@/components/utils/format/types";

const isValidDate = (date: any) => date && !isNaN(new Date(date).getTime());

const CertificateDetails = ({ courseData }: any) => {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const STATIC_IMAGE = "/certificate/fundee.png";

  // Logo corporación
  const corporationImageUrl = courseData?.corporation?.[0]?.corporation?.icon
    ? `${API_BASE_URL}${courseData.corporation[0].corporation.icon}`
    : null;

  // 2. Logo del instituto
  const instituteImageUrl = courseData?.module?.[0]?.module?.corporation?.[0]
    ?.institute?.image
    ? `${API_BASE_URL}${courseData.module[0].module.corporation[0].institute.image}`
    : null;

  const cuotas = courseData?.quota || [];
  const coutasPagadas = cuotas.filter((cuota: any) => cuota.state).length;
  const unicaCuota = cuotas.length === 1 ? parseFloat(cuotas[0].price) : 0;

  const logos = [];

  if (
    coutasPagadas === cuotas.length ||
    (cuotas.length === 1 && unicaCuota >= 55)
  ) {
    if (corporationImageUrl) logos.push(corporationImageUrl);
    if (instituteImageUrl) logos.push(instituteImageUrl);
    logos.push(STATIC_IMAGE);
  }

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

  const formattedDate = courseData?.module?.[0]?.module?.endDate
    ? getFormattedDate(courseData.module[0].module.endDate)
    : "Fecha no disponible";

  const moduleNames =
    courseData?.module
      ?.map((mod: { module: { name: string } }) => mod.module.name)
      .join(", ") || "Nombre del curso no disponible";

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/80 z-50">
      <div
        className="relative bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full z-50 overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        {/* Botón para cerrar el modal */}
        <button
          aria-label="Cerrar modal"
          onClick={() => {
            setShowModal(false);
            setTimeout(() => router.push("/certs/"), 300);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
        >
          <X size={24} />
        </button>

        {/* Contenido principal */}
        <div className="flex">
          <div className="w-4 bg-cyan-500 rounded-l-xl"></div>

          <div className="flex-1 p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="">
                  <div className="text-xl font-bold text-gray-800 mb-2">
                    ORGANIZADO POR:
                  </div>
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
                  {/* VISTA ESCRITORIO */}
                  <div className="hidden md:flex flex-row items-center justify-center gap-6">
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
                </div>
              </div>
            </div>

            <p className="text-base text-gray-600 mb-2">
              Certificado verificado a nombre de:
            </p>
            <div className="font-semibold text-3xl text-gray-800 mb-6">
              {courseData?.fullName || "Nombre del participante no disponible"}
            </div>

            <p className="text-base text-gray-800 mb-4">
              Por culminar con éxito el curso:
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

            <div className="flex items-center text-gray-600 mt-6 space-x-2">
              <span className="flex items-center space-x-2">
                <ShieldCheck className="text-cyan-500" size={20} />
                <strong>Doc. de Identidad:</strong>&nbsp;
                {courseData?.documentNumber || "Código no disponible"}
              </span>
            </div>

            <div className="mt-4 text-gray-600 text-base space-y-3">
              <div className="flex items-center space-x-2">
                <LucideClock className="text-cyan-500" size={20} />
                <span>
                  <strong>Horas de capacitación:</strong> 50 horas
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
