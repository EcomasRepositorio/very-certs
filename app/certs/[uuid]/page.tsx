import React, { Suspense } from "react";
import VideoBackground from "@/components/certificate-qr/VideoBackground";
import CertificateDetails from "@/components/certificate-qr/certificateDetails";
import CertificateDetailsCourse from "@/components/certificate-qr/certificateDetailsCourse";
import CertificateDetailsModule from "@/components/certificate-qr/certificateDetailsModule";
import {
  ParticipantData,
  CourseData,
  ModuleData,
} from "@/components/utils/format/types";
import { ModalError } from "@/components/certificate-qr/modalError";

interface CertPageProps {
  params: {
    uuid: string;
  };
}

function isValidUUIDFormat(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export default async function CertPage({ params }: CertPageProps) {
  const { uuid } = params;

  if (!isValidUUIDFormat(uuid)) {
    return (
      <section className="relative min-h-screen w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed dark:hidden"
          style={{
            backgroundImage: "url(/certificate/image/blue_bg_5.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Imagen para modo Dark */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed hidden dark:block"
          style={{
            backgroundImage: "url(/certificate/image/test_bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <ModalError />
      </section>
    );
  }

  let participantData: ParticipantData | null = null;
  let courseData: CourseData | null = null;
  let moduleData: ModuleData | null = null;
  let isCourse = false;
  let isModule = false;

  try {
    const participantRes = await fetch(
      `https://backclassroom.ecomas.pe/api/v1/certificate/graduate/${uuid}`,
      { cache: "no-store" }
    );
    if (participantRes.ok) {
      const participantResponse: ParticipantData = await participantRes.json();
      if (participantResponse?.uuidCode === uuid) {
        participantData = participantResponse;
      }
    }

    const courseRes = await fetch(
      `https://backclassroom.ecomas.pe/api/v1/certificate/course/${uuid}`,
      { cache: "no-store" }
    );
    if (courseRes.ok) {
      const courseResponse: CourseData = await courseRes.json();
      if (courseResponse?.uuidCode === uuid) {
        courseData = courseResponse;
        isCourse = true;
      }
    }

    const moduleRes = await fetch(
      `https://backclassroom.ecomas.pe/api/v1/certificate/module/${uuid}`,
      { cache: "no-store" }
    );
    if (moduleRes.ok) {
      const moduleResponse: ModuleData = await moduleRes.json();
      if (moduleResponse?.uuidCode === uuid) {
        moduleData = moduleResponse;
        isModule = true;
      }
    }

    if (!participantData && !courseData && !moduleData) {
      throw new Error("No se encontró información asociada a este QR");
    }
  } catch (error) {
    return (
      <section className="relative min-h-screen w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed dark:hidden"
          style={{
            backgroundImage: "url(/certificate/image/blue_bg_5.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Imagen para modo Dark */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed hidden dark:block"
          style={{
            backgroundImage: "url(/certificate/image/test_bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <ModalError />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed dark:hidden"
        style={{
          backgroundImage: "url(/certificate/image/blue_bg_5.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Imagen para modo Dark */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed hidden dark:block"
        style={{
          backgroundImage: "url(/certificate/image/test_bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <Suspense fallback={<p className="text-white">Cargando...</p>}>
        {isModule && moduleData ? (
          <CertificateDetailsModule corporation={moduleData} />
        ) : isCourse && courseData ? (
          <CertificateDetailsCourse courseData={courseData} />
        ) : (
          participantData && (
            <CertificateDetails participantData={participantData} />
          )
        )}
      </Suspense>
    </section>
  );
}
