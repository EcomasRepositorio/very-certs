import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";

emailjs.init("NC9YsKn3imoQXWdJE");

const ContactForm = () => {
  const [sending, setSending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Para resetear el formulario después de enviarlo
  } = useForm();

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (data: any) => {
    setSending(true);

    const serviceID = "service_i4bp5cn";
    const templateID = "template_jmk5t88";

    const form = formRef.current;
    if (form) {
      emailjs
        .sendForm(serviceID, templateID, form)
        .then(() => {
          setSending(false);
          setShowAlert(true);
          reset(); // Resetea el formulario
          setTimeout(() => setShowAlert(false), 4000);
        })
        .catch((err) => {
          setSending(false);
          alert(JSON.stringify(err));
        });
    }
  };

  return (
    <section id="contact">
      <div className="bg-transparent p-4 md:p-8 rounded-xl">
        <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-0">
          {/* Título */}
          <div className="text-center">
            <h2 className="text-center text-black dark:text-[#009FB2] text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase mb-6">
              ¡Contáctanos!
            </h2>
          </div>

          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            {/* Información de contacto */}
            <div className="bg-gradient-to-r from-[#e0f9f6] via-[#e0f9f6] to-[#e0f9f6] dark:from-[#0a0326] dark:via-[#1a0e4b] dark:to-[#0a0326] rounded-3xl text-black dark:text-white p-6 md:p-8 flex flex-col items-center md:items-start md:w-1/2">
              <p className="mb-2 text-center text-2xl md:text-left">correo</p>
              <p className="mb-6 text-center md:text-left">contacto@verycerts.com</p>
              <div className="mb-6 flex flex-col items-center md:items-start">
              <div className="mb-6 flex flex-col items-center md:items-start">
                  <img
                    src="/image/log-light.png"
                    alt="VERyCERTS Light"
                    className="w-40 h-40 mb-4 lg:ml-52 md:ml-[-40] sm:mr dark:hidden "
                  />

                  <img
                    src="/image/log-dark.png"
                    alt="VERyCERTS Dark"
                    className="w-40 h-40 mb-4 lg:ml-52 sm:ml-[-40] sm:mr hidden dark:block"
                  />
                 
                </div>
                <p className="font-semibold text-center md:text-left">
                  VeryCerts
                </p>
              </div>
              <p className="text-sm text-center md:text-left">
                Vericerts es una plataforma digital diseñada para la
                verificación y autenticación de certificados educativos de
                manera rápida, segura y confiable. Permite a las instituciones
                educativas emitir y gestionar certificados con códigos únicos o
                QR, mientras que empleadores y verificadores pueden validar su
                autenticidad en tiempo real desde cualquier lugar.
              </p>
            </div>

            {/* Formulario */}
            <div className="w-full md:w-1/2 p-6 md:p-8 bg-gradient-to-tl from-[#e0f9f6] via-[#e0f9f6] to-[#e0f9f6] dark:from-transparent dark:via-[#1a0e4b] dark:to-[#0a0326] rounded-lg">
              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-gray-700 dark:text-white font-medium">
                    Nombres
                  </label>
                  <input
                    {...register("nombres", { required: true })}
                    type="text"
                    className="w-full px-4 py-2 text-gray-800 dark:text-white bg-transparent border-2 border-[#009FB2] rounded-md focus:outline-none"
                    placeholder="Nombres completos"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-white font-medium">
                    N° Celular
                  </label>
                  <input
                    {...register("celular", {
                      required: true,
                      pattern: /^\d{9}$/,
                    })}
                    type="text"
                    className="w-full px-4 py-2 text-gray-800 dark:text-white bg-transparent border-2 border-[#009FB2] rounded-md focus:outline-none"
                    placeholder="999 999 999"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-white font-medium">
                    Email
                  </label>
                  <input
                    {...register("correo", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                    type="email"
                    className="w-full px-4 py-2 text-gray-800 dark:text-white bg-transparent border-2 border-[#009FB2] rounded-md focus:outline-none"
                    placeholder="Ej: contacto@vericerts.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-white font-medium">
                    Mensaje
                  </label>
                  <textarea
                    {...register("mensaje")}
                    className="w-full px-4 py-2 text-gray-800 dark:text-white bg-transparent border-2 border-[#009FB2] rounded-md focus:outline-none"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#009FB2] text-white py-2 rounded-md"
                >
                  {sending ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {showAlert && (
          <div className="mt-4 p-4 text-green-800 bg-green-100 border-l-4 border-green-500 rounded-lg">
            ¡Correo enviado con éxito!
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;

/* Vericerts es una plataforma digital diseñada para la verificación y autenticación de certificados educativos de manera rápida, segura y confiable. Permite a las instituciones educativas emitir y gestionar certificados con códigos únicos o QR, mientras que empleadores y verificadores pueden validar su autenticidad en tiempo real desde cualquier lugar.

 */

/* <div className="mb-6 flex flex-col items-center md:items-start">
                  /* Imagen para modo claro 
                  <img
                    src="/image/log-light.png"
                    alt="VERICERTS Light"
                    className="w-40 h-40 mb-4 lg:ml-52 md:ml-[-40] sm:mr dark:hidden "
                  />
                  /* Imagen para modo oscuro 
                  <img
                    src="/image/log-dark.png"
                    alt="VERICERTS Dark"
                    className="w-40 h-40 mb-4 lg:ml-52 sm:ml-[-40] sm:mr hidden dark:block"
                  />
                  <p className="font-semibold text-center md:text-left">
                    VERICERTS
                  </p>
                </div> */
