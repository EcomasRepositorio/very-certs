// app/certs/[uuid]/page.tsx
import React, { Suspense } from "react";
import VideoBackground from "@/components/certificate-qr/VideoBackground";
import CertificateDetails from "@/components/certificate-qr/certificateDetails"; // Modal para diplomado
import CertificateDetailsCourse from "@/components/certificate-qr/certificateDetailsCourse"; // Modal para curso

interface CertPageProps {
  params: {
    uuid: string; // /certs/[uuid]
  };
}

// Server Component
export default async function CertPage({ params }: CertPageProps) {
  const { uuid } = params;

  let participantData: any = null;
  let courseData: any = null;
  let isCourse = false;

  try {
    // Fetch datos del participante (primera API - Diplomado)
    const participantRes = await fetch(
      `https://backclassroom.ecomas.pe/api/v1/certificate/graduate/${uuid}`,
      {
        cache: "no-store",
      }
    );

    if (participantRes.ok) {
      participantData = await participantRes.json();
    }

    // Fetch datos del curso (segunda API - Curso)
    const courseRes = await fetch(
      `https://backclassroom.ecomas.pe/api/v1/certificate/course/${uuid}`, // Filtra por el UID
      {
        cache: "no-store",
      }
    );

    if (courseRes.ok) {
      const courseResponse = await courseRes.json();
      if (courseResponse && courseResponse.uuidCode === uuid) {
        // Verifica que el UID coincida con los datos del curso
        courseData = courseResponse;
        isCourse = true;
      }
    }

    // Si ambas APIs fallan, lanzar un error
    if (!participantData && !courseData) {
      throw new Error("No se encontró información asociada a este QR");
    }
  } catch (error) {
    return (
      <section className="relative min-h-screen w-full">
        <VideoBackground />
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 bg-opacity-60">
          <div className="bg-gradient-to-br from-black via-[#001A6E] to-black bg-[length:200%] animate-gradient-move font-semibold rounded-2xl shadow p-5 transition-all max-w-md sm:w-full w-full text-center">
            <h2 className="text-2xl text-red-500 font-bold mb-4">Error</h2>
            <p className="text-white">
              No se pudo recuperar la información asociada a este QR.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full">
      <VideoBackground />
      <Suspense fallback={<p className="text-white">Cargando...</p>}>
        {/* Renderiza el componente apropiado dependiendo del tipo */}
        {isCourse ? (
          <CertificateDetailsCourse courseData={courseData} />
        ) : (
          <CertificateDetails participantData={participantData} />
        )}
      </Suspense>
    </section>
  );
}
