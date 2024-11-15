import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { Button } from "@nextui-org/react";
emailjs.init('UgIciLgmKy6Akg6-Z');

const ContactForm = () => {
  const [sending, setSending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formRef = useRef(null);

  const onSubmit = () => {
    setSending(true);

    const serviceID = 'service_94bs7oi';
    const templateID = 'template_sryp9ce';

    const form = formRef.current;
    if (form) {
      emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
          setSending(false);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 4000);
        })
        .catch((err) => {
          setSending(false);
          alert(JSON.stringify(err));
        });
    }
  };

  return (
    <section id="contacto" className="flex flex-col md:flex-row items-stretch">
      {/* Sección de Información de Contacto */}
      <div className="bg-blue-800 text-white p-8 flex flex-col items-start md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
        <p className="mb-2">info@novicommarketinggroup.com</p>
        <p className="mb-6">+34 608 18 04 98</p>
        <div className="mb-6">
          <img src="/logo.png" alt="Novicom Marketing Group" className="w-20 h-20 mb-4" />
          <p className="font-semibold">novicom marketing group</p>
        </div>
        <p className="text-sm">
          Novicom Marketing Group es puntuada 10 sobre 10 en base a 
          <a href="#" className="underline ml-1">47 comentarios.</a>
        </p>
      </div>

      {/* Sección del Formulario */}
      <div className="flex-1 bg-white flex flex-col justify-center p-8 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Cómo podemos ayudarte?</h3>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-800 uppercase text-sm font-medium">Nombre</label>
              <input {...register('nombres', { required: true })} type="text" className="w-full border-b-2 border-gray-200 p-2 focus:outline-none focus:border-blue-800" placeholder="Nombre completo" />
              {errors.nombres && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <div>
              <label className="block text-gray-800 uppercase text-sm font-medium">Email</label>
              <input {...register('correo', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} type="email" className="w-full border-b-2 border-gray-200 p-2 focus:outline-none focus:border-blue-800" placeholder="ejemplo@correo.com" />
              {errors.correo && <span className="text-red-500 text-sm">Correo inválido</span>}
            </div>
          </div>
          <div>
            <label className="block text-gray-800 uppercase text-sm font-medium">Mensaje</label>
            <textarea {...register('mensaje')} className="w-full border-b-2 border-gray-200 p-2 focus:outline-none focus:border-blue-800" placeholder="Escribe tu mensaje aquí"></textarea>
          </div>
          <div>
            <label className="block text-gray-800 uppercase text-sm font-medium">Teléfono</label>
            <input {...register('telefono', { required: true, pattern: /^\d{9}$/ })} type="tel" className="w-full border-b-2 border-gray-200 p-2 focus:outline-none focus:border-blue-800" placeholder="999 999 999" />
            {errors.telefono && <span className="text-red-500 text-sm">Número inválido</span>}
          </div>
          <Button type="submit" color="primary" className="w-full mt-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700">
            {sending ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>

        {showAlert && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 border-l-4 border-green-500">
            ¡Correo enviado con éxito!
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
