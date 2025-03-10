"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

interface BackendConfig {
  name: string;
  url: string;
  active: boolean;
}

const SignIn: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [resErrors, setResErrors] = useState<{ message: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentBackend, setCurrentBackend] = useState<string>(""); // Indica el backend en progreso

  // Lista de backends configurados
  const backends: BackendConfig[] = [
    {
      name: "VeryCerts",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user/login`,
      active: true,
    },
    {
      name: "Prueba",
      url: "http://localhost:8000/api/v1/user/login",
      active: true,
    },
    {
      name: "AnotherBackend",
      url: "http://localhost:9000/api/v1/user/login",
      active: false,
    },
  ];

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
    setLoading(true);
    setResErrors(null);
    setCurrentBackend("");

    // Iterar sobre los backends activos
    for (const backend of backends) {
      if (backend.active) {
        try {
          setCurrentBackend(backend.name); // Mostrar en qué backend está procesando
          const response = await axios.post(backend.url, form);

          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("backendURL", backend.url); // Guardar la URL del backend
            localStorage.setItem("backendName", backend.name); // Guardar el nombre del backend
            window.location.href = "/student";

            return; // Detener el proceso si la autenticación es exitosa
          }
        } catch (error: any) {
          console.warn(`Error en el backend ${backend.name}:`, error.message);
        }
      }
    }

    // Si ningún backend valida las credenciales
    setResErrors({ message: "Credenciales inválidas o cuenta no encontrada." });
    setLoading(false);
    setCurrentBackend("");
  };

  const handleRegisterRedirect = () => {
    const message = encodeURIComponent(
      "Hola, me gustaría obtener información sobre el registro en su plataforma."
    );
    const phone = "123456789"; // Cambia este número con el WhatsApp correcto.
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Imagen para modo Light */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed dark:hidden"
        style={{
          backgroundImage: "url(/certificate/image/blue_bg_4.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Imagen para modo Dark */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed hidden dark:block"
        style={{
          backgroundImage: "url(/certificate/image/dark.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="relative z-10 w-[400px] p-8 backdrop-blur-md bg-black/30 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-white text-center mb-4">
          Iniciar Sesión
        </h1>
        <p className="text-sm text-gray-100 text-center mb-6">
          Ingresa tu Correo y Contraseña
        </p>

        {/* Errores */}
        {resErrors && (
          <p className="text-center text-red-500 mb-4">{resErrors.message}</p>
        )}

        {/* Indicador de Backend */}
        {loading && (
          <p className="text-center text-blue-500 mb-4">
            Verificando en <span className="font-bold">{currentBackend}</span>
            ...
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Campo de Email */}
          <div>
            <label className="text-sm text-gray-200">Correo</label>
            <input
              type="email"
              placeholder="Correo"
              className="bg-gray-800 text-white placeholder-gray-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customCian dark:focus:ring-gray-300 w-full"
              value={form.email}
              onChange={(e) => handleFormData(e, "email")}
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label className="text-sm text-gray-200">Contraseña</label>
            <div className="relative">
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Contraseña"
                className="bg-gray-800 text-white placeholder-gray-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customCian dark:focus:ring-gray-300 w-full"
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

          {/* Botón de Inicio de Sesión */}
          <button
            type="submit"
            className="w-full py-3 border border-gray-100/50 bg-customBlue dark:bg-customDark text-white font-semibold rounded-md hover:bg-purple-950/20 transition"
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-100">
            ¿Nuevo en la plataforma?{" "}
            <button
              onClick={handleRegisterRedirect}
              className="text-customCian hover:underline"
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
