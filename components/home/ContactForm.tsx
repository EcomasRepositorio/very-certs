import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
emailjs.init("otPoItuF57fbneCfZ");

const ContactForm = () => {
  const [sending, setSending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = () => {
    setSending(true);

    const serviceID = "service_g5u0i0w";
    const templateID = "template_l1rb6uk";

    const form = formRef.current;
    if (form) {
      emailjs
        .sendForm(serviceID, templateID, form)
        .then(() => {
          setSending(false);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 4000);
        })
        .catch((err) => {
          setSending(false);
          alert(JSON.stringify(err));
        });
    }
  };

  const keyframesStyle = `
    @keyframes gradientAnimation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <section id="contacto" className="bg-transparent p-4 md:p-8 rounded-xl">
        <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-0">
          {/* Título */}
          <div className="text-center">
            <h2 className="text-center text-black dark:text-[#009FB2] text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase mb-6">
              ¡Contáctanos!
            </h2>
          </div>

          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            {/* Left Side - Contact Information */}
            <div className="animated-gradient bg-gradient-to-r from-[#e0f9f6] via-[#e0f9f6] to-[#e0f9f6] dark:from-[#0a0326] dark:via-[#1a0e4b] dark:to-fondDark rounded-3xl text-black dark:text-white p-6 md:p-8 flex flex-col items-center md:items-start md:w-1/2">
              <p className="mb-2 text-center md:text-left">#################</p>
              <p className="mb-6 text-center md:text-left">### ### ### ###</p>
              <div className="mb-6 flex flex-col items-center md:items-start">
                {/* Imagen para modo claro */}
                <img
                  src="/image/log-light.png"
                  alt="VERICERTS Light"
                  className="w-40 h-40 mb-4 dark:hidden ml-40"
                />
                {/* Imagen para modo oscuro */}
                <img
                  src="/image/log-dark.png"
                  alt="VERICERTS Dark"
                  className="w-40 h-40 mb-4 lg:ml-52 sm:ml-1 hidden dark:block"
                />
                <p className="font-semibold text-center md:text-left">VERICERTS</p>
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

            {/* Right Side - Contact Form */}
            <div className="animated-gradient w-full md:w-1/2 p-6 md:p-8 bg-gradient-to-tl from-[#e0f9f6] via-[#e0f9f6] to-[#e0f9f6] dark:from-transparent dark:via-[#1a0e4b] dark:to-[#0a0326] rounded-lg border-none">
              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-4 w-full">
                  <div>
                    <label className="block text-gray-700 dark:text-white font-medium">
                      Nombres
                    </label>
                    <input
                      {...register("nombres", { required: true })}
                      type="text"
                      className="w-full px-4 py-2 text-gray-800 dark:text-white bg-transparent border-2 border-[#009FB2] rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-500"
                      placeholder="Nombres completos"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-white bg-transparent font-medium">
                      N° Celular
                    </label>
                    <input
                      {...register("celular", {
                        required: true,
                        pattern: /^\d{9}$/,
                      })}
                      type="text"
                      className="w-full px-4 py-2 text-gray-800 dark:text-white bg-transparent border-2 border-[#009FB2] rounded-md shadow-md focus:outline-none focus:ring focus:ring-[#009FB2]"
                      placeholder="999 999 999"
                    />
                  </div>
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
                    className="w-full px-4 py-2 text-gray-800 bg-transparent border-2 border-blue-500 rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Ej: ejemplo@gmail.com"
                  />
                  {errors.correo && (
                    <span className="text-red-500 text-sm">
                      Introduce un correo electrónico válido
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-white font-medium">
                    Mensaje
                  </label>
                  <textarea
                    {...register("mensaje")}
                    className="w-full h-24 md:h-32 px-4 py-2 text-gray-800 bg-transparent border-2 border-blue-500 rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-transparent border-2 border-[#009FB2]  text-white py-2 rounded-md hover:bg-[#009FB2]"
                >
                  {sending ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {showAlert && (
          <div
            className="mt-4 p-4 text-green-800 bg-green-100 border-l-4 border-green-500 rounded-lg"
            role="alert"
          >
            ¡Correo enviado con éxito!
          </div>
        )}
      </section>
    </>
  );
};

export default ContactForm;
