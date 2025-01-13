// app/certs/[uuid]/page.tsx
import React, { Suspense } from "react";
import VideoBackground from "@/components/certificate-qr/VideoBackground";
import CertificateDetails from "@/components/certificate-qr/certificateDetails";
import CertificateDetailsCourse from "@/components/certificate-qr/certificateDetailsCourse";
import { ParticipantData, CourseData } from "@/components/utils/format/types";

interface CertPageProps {
  params: {
    uuid: string;
  };
}

export default async function CertPage({ params }: CertPageProps) {
  const { uuid } = params;

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
      // Opcionalmente, podrías validar que el objeto realmente coincida con el uuid
      // si tu API retorna un campo distintivo. Por ejemplo:
      // if (participantResponse?.uuidParticipant === uuid) {
      //   participantData = participantResponse;
      // }
      participantData = participantResponse;
    }

    // Fetch curso
    const courseRes = await fetch(
      `https://backclassroom.ecomas.pe/api/v1/certificate/course/${uuid}`,
      { cache: "no-store" }
    );

    if (courseRes.ok) {
      const courseResponse: CourseData = await courseRes.json();
      // Lo mismo que arriba: valida si coincide con el uuid
      // if (courseResponse?.uuidCode === uuid) {
      //   courseData = courseResponse;
      //   isCourse = true;
      // }
      courseData = courseResponse;
      // Revisamos si devuelven algo que indique que efectivamente es un curso
      if (courseData?.uuidCode === uuid) {
        isCourse = true;
      }
    }

    // Si luego de ambas peticiones no tenemos datos de participante ni de curso:
    if (!participantData && !courseData) {
      throw new Error("No se encontró información asociada a este QR");
    }

  } catch (error) {
    // Cualquier error (o falta de datos) nos lleva directo al "modal de error"
    return (
      <section className="relative min-h-screen w-full">
        <VideoBackground />
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-gradient-to-br from-black via-[#001A6E] to-black bg-[length:200%] animate-gradient-move font-semibold rounded-2xl shadow p-5 max-w-md w-full text-center">
            <h2 className="text-2xl text-red-500 font-bold mb-4">Error</h2>
            <p className="text-white">
              No se pudo encontrar la información asociada a este QR.
            </p>
          </div>
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
