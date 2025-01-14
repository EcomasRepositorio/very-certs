import React, { Suspense } from "react";
import VideoBackground from "@/components/certificate-qr/VideoBackground";
import CertificateDetails from "@/components/certificate-qr/certificateDetails";
import CertificateDetailsCourse from "@/components/certificate-qr/certificateDetailsCourse";
import { ParticipantData, CourseData } from "@/components/utils/format/types";
import { ModalError }  from "@/components/certificate-qr/modalError";

interface CertPageProps {
  params: {
    uuid: string;
  };
}

// Función para validar el formato de un UUID
function isValidUUIDFormat(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export default async function CertPage({ params }: CertPageProps) {
  const { uuid } = params;

  // Validar el formato del UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(uuid)) {
    return (
      <section className="relative min-h-screen w-full">
        <VideoBackground />
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-gradient-to-br from-black via-[#001A6E] to-black bg-[length:200%] animate-gradient-move font-semibold rounded-2xl shadow p-5 max-w-md w-full text-center">
            <h2 className="text-2xl text-red-500 font-bold mb-4">Error</h2>
            <p className="text-white">
              El identificador ingresado no es válido. Por favor, verifica el QR.
            </p>
          </div>
        </div>
      </section>
    );
  }

  let participantData: ParticipantData | null = null;
  let courseData: CourseData | null = null;
  let isCourse = false;

  try {
    // Fetch participante
    const participantRes = await fetch(
      `https://backclassroom.ecomas.pe/api/v1/certificate/graduate/${uuid}`,
      { cache: "no-store" }
    );

    if (participantRes.ok) {
      const participantResponse: ParticipantData = await participantRes.json();
      // Validar que el UUID corresponde al participante
      if (participantResponse?.uuidCode === uuid) {
        participantData = participantResponse;
      }
    }

    // Fetch curso
    const courseRes = await fetch(
      `https://backclassroom.ecomas.pe/api/v1/certificate/course/${uuid}`,
      { cache: "no-store" }
    );

    if (courseRes.ok) {
      const courseResponse: CourseData = await courseRes.json();
      // Validar que el UUID corresponde al curso
      if (courseResponse?.uuidCode === uuid) {
        courseData = courseResponse;
        isCourse = true;
      }
    }

    // Si luego de ambas peticiones no hay datos válidos:
    if (!participantData && !courseData) {
      throw new Error("No se encontró información asociada a este QR");
    }

  } catch (error) {
    // Mostrar mensaje de error si ocurre un problema con las APIs o no se encuentran datos
    return (
      <section className="relative min-h-screen w-full">
        <VideoBackground />
        <div className="">
          <ModalError />
        </div>
      </section>
    );
  }

  // Renderizar el contenido apropiado
  return (
    <section className="relative min-h-screen w-full">
      <VideoBackground />
      <Suspense fallback={<p className="text-white">Cargando...</p>}>
        {isCourse && courseData ? (
          <CertificateDetailsCourse courseData={courseData} />
        ) : (
          participantData && <CertificateDetails participantData={participantData} />
        )}
      </Suspense>
    </section>
  );
}

