import React, { useState } from "react";
import Image from "next/image";

const Contacto = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (question) => {
    setActiveQuestion(activeQuestion === question ? null : question);
  };

  return (
    <section className="bg-transparent py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Columna Izquierda */}
        <div className="space-y-6">
          <p className="text-red-500 font-bold uppercase">VERIFICACIÓN</p>

          {/* Acordeón */}
          <div className="space-y-4">
            {/* Pregunta 1 */}
            <div
              onClick={() => toggleQuestion(1)}
              className={`cursor-pointer p-4 border rounded-lg ${
                activeQuestion === 1
                  ? "bg-[#009FB2] dark:bg-[#1a0e4b] text-white"
                  : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">¿Cómo verificar un certificado?</h3>
                <span>
                  {activeQuestion === 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {activeQuestion === 1 && (
                <p className="mt-2">
                  1. Introduce el código de verificación:
                  <p className="mt-2">
                    Ingresa el código único del certificado en el campo de
                    búsqueda. o Ejemplo: "1234-5678-9101-ABCD"
                  </p>
                  <p className="mt-2">2. Escanea el código QR:</p>
                  <p className="mt-2">
                    Si el certificado tiene un código QR, puedes escanearlo con
                    tu smartphone para una verificación instantánea.
                  </p>
                  <p className="mt-2">3. Resultado de la verificación:</p>
                  <p className="mt-2">
                    Vericerts te mostrará la información del certificado:
                  </p>
                  <p className="mt-2">o Nombre del titular</p>
                  <p className="mt-2">o Nombre de la institución emisora</p>
                  <p className="mt-2">o Fecha de emisión</p>
                  <p className="mt-2">
                    o Tipo de certificación (curso, diplomado, etc.)
                  </p>
                </p>
              )}
            </div>

            {/* Pregunta 2 */}
            <div
              onClick={() => toggleQuestion(2)}
              className={`cursor-pointer p-4 border rounded-lg ${
                activeQuestion === 2
                  ? "bg-[#009FB2] dark:bg-[#1a0e4b] text-white"
                  : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Verificación en Tiempo Real</h3>
                <span>
                  {activeQuestion === 2 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {activeQuestion === 2 && (
                <p className="mt-2">
                  La verificación se realiza en tiempo real, lo que asegura que
                  cualquier consulta o verificación refleje la información más
                  actualizada y precisa. Este sistema ayuda a prevenir fraudes y
                  garantiza la validez de los certificados.
                </p>
              )}
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Preguntas Frecuentes (FAQ) <br />
            </h2>

            {/* Pregunta 3 */}
            <div
              onClick={() => toggleQuestion(3)}
              className={`cursor-pointer p-4 border rounded-lg ${
                activeQuestion === 3
                  ? "bg-[#009FB2] dark:bg-[#1a0e4b] text-white"
                  : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">
                  ¿Qué hago si no se puede verificar?
                </h3>
                <span>
                  {activeQuestion === 3 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {activeQuestion === 3 && (
                <p className="mt-2">
                  Si el certificado no aparece en nuestra plataforma o el código
                  es incorrecto, contacta a la institución emisora para
                  confirmar los detalles. También puedes contactar a nuestro
                  equipo de soporte para obtener asistencia.
                </p>
              )}
            </div>

            {/* Pregunta 4 */}
            <div
              onClick={() => toggleQuestion(4)}
              className={`cursor-pointer p-4 border rounded-lg ${
                activeQuestion === 4
                  ? "bg-[#009FB2] dark:bg-[#1a0e4b] text-white"
                  : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">
                  ¿Puedo verificar un certificado sin el código?
                </h3>
                <span>
                  {activeQuestion === 4 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {activeQuestion === 4 && (
                <p className="mt-2">
                  No, el código de verificación es necesario para asegurar la
                  autenticidad del certificado. Si no tienes el código, contacta
                  al titular del certificado o a la institución emisora{" "}
                </p>
              )}
            </div>

            {/* Pregunta 5 */}
            <div
              onClick={() => toggleQuestion(5)}
              className={`cursor-pointer p-4 border rounded-lg ${
                activeQuestion === 5
                  ? "bg-[#009FB2] dark:bg-[#1a0e4b] text-white"
                  : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">
                  ¿Quién puede verificar un certificado?
                </h3>
                <span>
                  {activeQuestion === 5 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {activeQuestion === 5 && (
                <p className="mt-2">
                  Cualquier persona o institución con acceso al código de
                  verificación puede comprobar la autenticidad del certificado a
                  través de nuestra plataforma{" "}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="relative">
          <Image
            src="/image/verifi.jpg"
            alt="Mechanic Image"
            width={500}
            height={500}
            className="rounded-lg shadow-lg object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white p-4 rounded-lg shadow-lg flex items-center">
            <div className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">250+</h3>
              <p className="text-sm text-gray-600">Servicios ofrecidos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
