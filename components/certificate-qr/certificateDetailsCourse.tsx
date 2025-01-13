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

interface CertificateDetailsProps {
  courseData: {
    id: number;
    fullName: string; // Nombre completo del participante
    code: string; // Código del certificado
    uuidCode: string; // Código único del certificado
    quota: {
      id: number;
      name: string; // Nombre de la cuota
      code: string; // Código de la cuota
      dateReceipt: string; // Fecha de recibo
      hourReceipt: string; // Hora de recibo
      price: string; // Precio de la cuota
      state: boolean; // Estado de la cuota (pagado o no)
      date: string; // Fecha de vencimiento de la cuota
      observation: string; // Observaciones
      observationOption: string; // Opción de observación
      moduleId: number; // ID del módulo relacionado
      createdAt: string; // Fecha de creación
      updatedAt: string; // Fecha de actualización
      studentCourseId: number; // ID del curso del estudiante
    }[];
    module: {
      module: {
        id: number; // ID del módulo
        name: string; // Nombre del módulo
        endDate: string; // Fecha de fin del módulo
        corporation: {
          institute: string | null; // Instituto relacionado (puede ser nulo)
        }[];
      };
    }[];
    corporation: {
      corporation: {
        id: number; // ID de la corporación
        name: string; // Nombre de la corporación
        icon: string; // URL del icono de la corporación
        image: string; // URL de la imagen de la corporación
      };
    }[];
  };
}

const CertificateDetails = ({ courseData }: CertificateDetailsProps) => {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  const corporationData = courseData?.corporation?.[0]?.corporation || {
    name: "Corporación no disponible",
    icon: "",
    image: "",
  };

  const formattedDate = courseData?.module[0].module.endDate
  ? format(new Date(courseData?.module[0].module.endDate), "dd/MM/yyyy")
  : "Fecha no disponible";


  const moduleNames =
    courseData?.module?.map((mod) => mod.module.name).join(", ") ||
    "Nombre del curso no disponible";

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/80 z-50">
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-4xl w-full">
        {/* Botón para cerrar el modal */}
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

        {/* Barra lateral azul */}
        <div className="flex">
          <div className="w-4 bg-cyan-500 rounded-l-xl"></div>
          <div className="flex-1 p-6">
            {/* Encabezado con logo */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  ORGANIZADO POR:
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                  VERY CERTS
                </p>
              </div>
              <div>
                <Image
                  src={"/certificate/qr/log-light.png"}
                  alt="Logo de Very Certs claro"
                  width={200}
                  height={200}
                  className="h-32 w-auto object-contain block dark:hidden"
                />
                <Image
                  src={"/certificate/qr/log-dark.png"}
                  alt="Logo de Very Certs oscuro"
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
              {courseData?.fullName || "Nombre del participante no disponible"}
            </div>

            {/* Curso */}
            <p className="text-base text-gray-800 dark:text-gray-100 mb-4">
              Por culminar con éxito el curso:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-cyan-500">
              <div>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {moduleNames}
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

            {/* ID del certificado */}
            <div className="flex items-center text-gray-600 dark:text-gray-300 mt-6 space-x-2">
              <span className="flex items-center space-x-2">
                <ShieldCheck className="text-cyan-500" size={20} />
                <strong>ID del certificado: </strong>{" "}
                {courseData?.code || "Código no disponible"}
              </span>
            </div>

            <div className="mt-4 text-gray-600 dark:text-gray-300 text-base space-y-3">
              <div className="flex items-center space-x-2">
                <LucideClock className="text-cyan-500" size={20} />
                <span>
                  <strong>Horas de capacitación:</strong>{" "}
                 50 horas
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
