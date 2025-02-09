"use client";
import React, { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa"
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { Book } from "lucide-react";

// Tipos para los enlaces y menús
type SocialLink = {
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
};

type MenuLink = {
  href: string;
  label: string;
};

// Definición de los enlaces de redes sociales y menús
const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/profile.php?id=61567708557735",
    icon: FaFacebookF,
  },
  { href: "https://www.instagram.com", icon: FaInstagram },
  { href: "https://wa.me/", icon: FaWhatsapp, disabled: false },
  {
    href: "https://www.tiktok.com/@verycerts",
    icon: FaTiktok,
    disabled: false,
  },
  { href: "https://www.youtube.com", icon: FaYoutube, disabled: true },
];

const menuLinks: MenuLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/diplomados", label: "Diplomados" },
  { href: "/certs", label: "Certificados" },
  { href: "/aula-virtual", label: "Aula Virtual" },
];

// Componente para manejar enlaces de redes sociales
const SocialLink: React.FC<{
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
}> = ({ href, icon: Icon, disabled }) => {
  const [showMessage, setShowMessage] = useState(false); // Estado para mostrar mensaje

  return (
    <div className="relative">
      <Link
        href={disabled ? "#" : href} // Previene la navegación si está deshabilitado
        target={disabled ? undefined : "_blank"}
        className={`p-2 rounded-full transition-transform transform hover:scale-150 shadow-xl ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={disabled ? (e) => e.preventDefault() : undefined} // Previene la acción si está deshabilitado
        onMouseEnter={() => disabled && setShowMessage(true)} // Muestra mensaje al pasar el cursor
        onMouseLeave={() => disabled && setShowMessage(false)} // Oculta mensaje al quitar el cursor
      >
        <Icon size={24} />
      </Link>
      {/* Mensaje de indisponibilidad */}
      {disabled && showMessage && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-red-500 text-sm">
          Aún no disponible
        </div>
      )}
    </div>
  );
};

const Footer: React.FC = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const { theme } = useTheme(); // Obtén el tema actual

  const openTermsModal = () => setShowTermsModal(true);
  const closeTermsModal = () => setShowTermsModal(false);

  const openPrivacyModal = () => setShowPrivacyModal(true);
  const closePrivacyModal = () => setShowPrivacyModal(false);

  // Define las imágenes del logo para modo oscuro y claro
  const logoImages = {
    light: "/image/log_cert.png", // Reemplaza con la ruta del logo claro
    dark: "/image/log-blank.png", // Reemplaza con la ruta del logo oscuro
  };

  const currentLogo = theme === "dark" ? logoImages.dark : logoImages.light;

  return (
    <footer className="bg-customGreen dark:bg-[#140d2f] text-black dark:text-white py-16 px-6 w-full">
      <div className="container mx-auto">
        {/* Redes Sociales */}
        <div className="flex justify-center lg:justify-between items-center mb-12">
          <p className="text-center lg:text-left">
            Síguenos en nuestras redes sociales
          </p>
          <div className="flex justify-center lg:justify-end space-x-4 mt-4 lg:mt-0">
            {socialLinks.map(({ href, icon: Icon, disabled }, idx) => (
              <Link
                key={idx}
                href={disabled ? "#" : href}
                target={disabled ? undefined : "_blank"}
                className={`p-2 rounded-full transition-transform transform hover:scale-150 shadow-xl ${
                  disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Icon size={24} />
              </Link>
            ))}
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="border-t border-white/40 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logotipo y descripción */}
            <div className="flex flex-col items-center md:items-start">
              <Image
                src={currentLogo}
                alt="Logo Verycerts"
                width={180}
                height={60}
                priority
              />
              <p className="mt-2 text-sm text-center md:text-left">
                Confiabilidad y seguridad en la gestión de certificados para el
                mundo digital. "Construya un entorno de confianza con VeryCerts,
                la plataforma líder en verificación de certificados. Verifique y
                valide cada certificado de manera eficiente y segura".
              </p>
              <Link href="/book">
                <div className="mt-2 text-sm text-black dark:text-white hover:underline flex items-center">
                  <Book className="w-5 h-5 mr-2 text-black dark:text-white" />
                  Libro de Reclamaciones
                </div>
              </Link>
            </div>

            {/* Nuestra Empresa */}
            <div>
              <div className="mb-4 font-bold uppercase tracking-widest text-darkblue dark:text-white">
                Nuestra Empresa
              </div>

              <nav className="flex flex-col gap-4">
                <div>
                  <Link
                    href="/"
                    className="text-darkblue dark:text-white dark:hover:text-blue-100 transition duration-100 hover:text-primaryblue active:text-primaryblue"
                  >
                    Inicio
                  </Link>
                </div>

                <div>
                  <Link
                    href="/#servicios"
                    className="text-darkblue dark:text-white dark:hover:text-blue-100 transition duration-100 hover:text-primaryblue active:text-primaryblue"
                  >
                    Servicios
                  </Link>
                </div>

                <div>
                  <Link
                    href="/#nosotros"
                    className="text-darkblue dark:text-white dark:hover:text-blue-100 transition duration-100 hover:text-primaryblue active:text-primaryblue"
                  >
                    Nosotros
                  </Link>
                </div>
                <div>
                  <Link
                    href="/"
                    className="text-darkblue dark:text-white dark:hover:text-blue-100 transition duration-100 hover:text-primaryblue active:text-primaryblue"
                  >
                    certificados
                  </Link>
                </div>
              </nav>
            </div>

            {/* Legalidad */}
            <div className="md:col-span-1 flex flex-col">
              <h3 className="mb-4 font-bold uppercase tracking-widest">
                Legalidad
              </h3>
              <nav className="flex flex-col gap-2">
                <button
                  onClick={openTermsModal}
                  className="text-darkblue dark:text-white dark:hover:text-blue-100 transition duration-100 hover:text-primaryblue active:text-primaryblue text-left"
                >
                  Términos de servicio
                </button>
                <button
                  onClick={openPrivacyModal}
                  className="text-darkblue dark:text-white dark:hover:text-blue-100 transition duration-100 hover:text-primaryblue active:text-primaryblue text-left"
                >
                  Política de privacidad
                </button>
              </nav>
            </div>

            {/* Contacto */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-4">CONTACTO</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <HiOutlineMail size={20} className="mr-2" />
                  <Link href="gerencia@verycerts.com">
                    {/* colocar correo */}
                    <span className="hover:underline">
                      {" "}
                      contacto@verycerts.com
                    </span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <HiOutlinePhone size={20} className="mr-2" />
                  <Link href="tel:+51">
                    <span className="hover:underline">
                      {/* aqui va el numero  */}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      {showTermsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            // Cierra el modal solo si el clic ocurre fuera del contenido del modal
            if (e.target === e.currentTarget) {
              closeTermsModal();
            }
          }}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el modal
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Terminos y condiciones
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              1. <strong>Introducción</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Bienvenido a Vericerts. Al utilizar nuestra plataforma para emitir
              o verificar certificados digitales, aceptas cumplir con los
              siguientes términos y condiciones. Si no estás de acuerdo con
              alguno de estos términos, te pedimos que no utilices la
              plataforma.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              2. <strong>Definiciones</strong>
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 list-disc pl-5">
              <li>
                <strong>Plataforma:</strong> El sitio web y los servicios
                ofrecidos por Vericerts.
              </li>
              <li>
                <strong>Usuario:</strong> Cualquier persona que use Vericerts
                para emitir o verificar certificados.
              </li>
              <li>
                <strong>Institución:</strong> Las entidades académicas o
                profesionales que emiten certificados a través de Vericerts.
              </li>
              <li>
                <strong>Certificado:</strong> Documento digital emitido por una
                Institución y registrado en la plataforma.
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              3. <strong>Registro y Uso de la Plataforma</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 ">
              Para utilizar Vericerts como institución emisora, debes registrar
              una cuenta proporcionando información precisa y veraz. Nos
              reservamos el derecho de suspender o cancelar cuentas que no
              cumplan con estos requisitos.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              4. <strong>Emisión de Certificados</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Las instituciones son responsables de la veracidad de la
              información contenida en los certificados emitidos. Vericerts no
              se hace responsable de certificados que contengan información
              incorrecta o inexacta proporcionada por la institución.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              5. <strong>Verificación de Certificados</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Los usuarios pueden verificar la autenticidad de un certificado
              utilizando el código único proporcionado en el documento.
              Vericerts no es responsable de la autenticidad de los datos si la
              institución emisora ha ingresado información incorrecta.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              6. <strong>Propiedad Intelectual</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Todo el contenido, diseño y tecnología de Vericerts es propiedad
              de la plataforma. No se permite la copia, modificación o
              distribución de nuestros servicios sin autorización expresa.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              7. <strong>Protección de Datos y Privacidad</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Vericerts protege los datos personales de acuerdo con la normativa
              vigente. Para más detalles, consulta nuestra Política de
              Privacidad
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              8. <strong>Limitación de Responsabilidad</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Vericerts no será responsable por interrupciones en el servicio,
              errores técnicos o inexactitudes en los certificados emitidos por
              las instituciones.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              9. <strong>Suspensión y Terminación de Cuenta</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Vericerts se reserva el derecho de suspender o cancelar cuentas
              que no cumplan con los términos aquí descritos o que utilicen la
              plataforma de manera fraudulenta.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              10. <strong>Modificaciones</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nos reservamos el derecho de modificar estos términos en cualquier
              momento. Las modificaciones serán notificadas a los usuarios,
              quienes deberán aceptarlas para continuar utilizando la
              plataforma.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              11. <strong>Ley Aplicable</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Estos términos se regirán por las leyes de [país], y cualquier
              disputa será resuelta en los tribunales de [jurisdicción].
            </p>
            <button
              onClick={closeTermsModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            // Si se hace clic fuera del contenido del modal, se cierra
            if (e.target === e.currentTarget) {
              closePrivacyModal();
            }
          }}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Política de Privacidad
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              1. <strong>Introducción</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              En Vericerts, respetamos tu privacidad y estamos comprometidos a
              proteger los datos personales que nos proporcionas al usar nuestra
              plataforma. Esta Política de Privacidad describe cómo recopilamos,
              utilizamos, y protegemos tus datos personales, así como tus
              derechos sobre esta información. Al utilizar nuestra plataforma,
              aceptas los términos de esta política.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              2. <strong>Información Recopilada</strong>
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 list-disc pl-5">
              <li>
                <strong>Datos Personales:</strong> Recopilamos información
                personal cuando te registras en Vericerts, como tu nombre,
                dirección de correo electrónico, número de teléfono y otros
                datos necesarios para utilizar nuestros servicios.
              </li>
              <li>
                <strong>Datos Institucionales:</strong> Cuando una institución
                utiliza Vericerts para emitir certificados, recopilamos
                información relevante de la institución y los certificados
                emitidos.
              </li>
              <li>
                <strong>Datos Automáticos:</strong> También recopilamos
                información automáticamente cuando accedes a nuestra plataforma,
                como tu dirección IP, el tipo de dispositivo que utilizas, y
                cookies que nos permiten mejorar tu experiencia en Vericerts.
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              3. <strong>Uso de la Información</strong>
            </p>
            <ul className="text-gray-700 dark:text-gray-300 mb-4 list-disc pl-5">
              <li>Emitir y verificar certificados.</li>
              <li>
                Mejorar nuestros servicios y la funcionalidad de la plataforma.
              </li>
              <li>
                Comunicarnos contigo sobre actualizaciones y promociones (con tu
                consentimiento).
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              4. <strong>Compartición de Información</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Tu información personal solo será compartida con terceros cuando
              sea necesario para prestar nuestros servicios, como proveedores de
              hosting y servicios técnicos, o cuando sea requerido por la ley.
              Vericerts nunca venderá tus datos a terceros.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              5. <strong>Protección de los Datos</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Tomamos medidas de seguridad técnicas y organizativas para
              proteger tus datos personales contra accesos no autorizados,
              pérdida, o alteración. Estas medidas incluyen el uso de
              encriptación y el acceso restringido a la información.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              6. <strong>Derechos de los Usuarios</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Tienes el derecho de acceder, corregir o eliminar tus datos
              personales en cualquier momento. Si deseas ejercer cualquiera de
              estos derechos, contáctanos a través de{" "}
              <strong>soporte@vericerts.com</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              7. <strong>Uso de Cookies</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Utilizamos cookies para mejorar tu experiencia en nuestra
              plataforma. Puedes aceptar o rechazar el uso de cookies a través
              de la configuración de tu navegador.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              8. <strong>Cambios a la Política de Privacidad</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nos reservamos el derecho de actualizar esta Política de
              Privacidad en cualquier momento. Te notificaremos sobre cualquier
              cambio importante a través de nuestro sitio web o por correo
              electrónico.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              9. <strong>Contacto</strong>
            </p>

            <button
              onClick={closePrivacyModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="relative mt-8 text-center text-sm text-black dark:text-gray-300">
        <p>© 2024 Copyright: VERYCERTS</p>
        <p className="opacity-0 text-gray-300">
          página protegida por gorko el dios astuto pero brutal
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
