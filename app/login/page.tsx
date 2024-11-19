"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const SignIn: React.FC = () => {
  const [form, setForm] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [resErrors, setResErrors] = useState<{ message: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleFormData = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = target;
    setForm({ ...form, [field]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend.inalta.edu.pe/api/v1/user/login",
        form
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/student";
      }
    } catch (error) {
      setResErrors({ message: "Credenciales incorrectas" });
      setTimeout(() => setResErrors(null), 3000);
    }
  };

  const handleRegisterRedirect = () => {
    const message = encodeURIComponent(
      "Hola, me gustaría obtener información sobre el registro en su plataforma."
    );
    const phone = "123456789"; // Reemplaza este número con el número de WhatsApp al que deseas redirigir.
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center"
      style={{
        backgroundImage: "url('/image/espace.png')", // Cambia esta ruta por la de tu imagen
      }}
    >
      <div className="relative z-10 w-[400px] p-8 backdrop-blur-md bg-black/60 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-white text-center mb-4">
          Iniciar Sesión
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Mantén todo en orden y estarás bien
        </p>
        {resErrors && (
          <p className="text-center text-red-500 mb-4">{resErrors.message}</p>
        )}
        <form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
        >
          {/* Campo de Correo o Teléfono */}
          <div>
            <label className="text-sm text-gray-300">
              Correo o Teléfono
            </label>
            <input
              type="text"
              placeholder="Correo o Teléfono"
              className="bg-gray-800 text-white placeholder-gray-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              value={form.emailOrPhone}
              onChange={(e) => handleFormData(e, "emailOrPhone")}
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label className="text-sm text-gray-300">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Contraseña"
                className="bg-gray-800 text-white placeholder-gray-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                value={form.password}
                onChange={(e) => handleFormData(e, "password")}
                required
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-3 top-3 text-gray-400"
              >
                {isVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Enlace de Olvidó Contraseña */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-purple-400 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón de Inicio de Sesión */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            ¿Nuevo en Vericerts?{" "}
            <button
              onClick={handleRegisterRedirect}
              className="text-purple-400 hover:underline"
            >
              Regístrate ahora
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
