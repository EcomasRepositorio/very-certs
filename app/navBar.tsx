// Navbar.js
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserCog } from "react-icons/fa";
import ThemeSwitcher from "../components/ThemeSwitcher"; // Asegúrate de que la ruta sea correcta

function Navbar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <div className="">
      <nav className="w-full h-44 top-0 left-0 right-0 z-50 bg-primaryBlue/10 backdrop-blur-md fixed bg-black/10 ">
        {" "}
        {/* Cambiado a 'fixed' */}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-0.5">
          <div className="md:text-right text-center font-semibold w-full border-b border-[#00dbb8] py-1 mb-4">
            <Link
              href="/login"
              className="mr-3 p-2 hover:bg-testCian/20 hover:text-white rounded-sm font-extralight"
            >
              Iniciar sesion
            </Link>
          </div>
        </div>
        <div className="justify-between px-2 lg:px-0 mx-auto lg:max-w-7xl md:items-center md:flex">
          <div>
            <div className="items-center inline-flex justify-between py-0 md:py- lg:py- md:block">
              {/* LOGO */}
              <Link href="/">
                {/* Logo para modo claro */}
                <Image
                  src="/certificate/logos/HORIZONTAL_BLANCO.svg"
                  width={900}
                  height={900}
                  alt="logo_claro"
                  className="w-36 h-36 dark:hidden" // Visible solo en modo claro
                  priority={true}
                />
                {/* Logo para modo oscuro */}
                <Image
                  src="/certificate/logos/HORIZONTAL_COLOR.svg"
                  width={900}
                  height={900}
                  alt="logo_oscuro"
                  className="w-36 h-36 hidden dark:block" // Visible solo en modo oscuro
                  priority={true}
                />
              </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden ml-44 ">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image
                      src="/icons/close.png"
                      width={30}
                      height={30}
                      alt="logo"
                      className="text-white"
                      priority={true}
                    />
                  ) : (
                    <Image
                      src="/icons/menu.png"
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                      priority={true}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Contenido para dispositivos de escritorio */}
          <div className={`hidden md:block ${navbar ? "block" : "hidden"}`}>
            <div className="flex-1 justify-self-center rounded-lg pb-3 mt-2">
              <ul className="h-screen md:h-12 lg:text-sm md:text-sm text-xl items-center justify-center md:flex">
                {/* Enlaces del menú */}
                {/* Agrega el contenido de los enlaces aquí */}
                <li className="font-extralight text-xl text-black dark:text-gray-100 lg:mb-0 ml- md:mb-0 mb-6 py-1 px-6 text-center border border-transparent hover:border-testCian hover:bg-white/15 rounded transition-transform transform hover:scale-125">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Inicio
                  </Link>
                </li>
                <li className="font-extralight text-xl text-black dark:text-gray-100 lg:mb-0 md:mb-0 mb-6 py-1 px-6 text-center border border-transparent hover:border-testCian hover:bg-white/15 rounded transition-transform transform hover:scale-125">
                  <Link href="/#servicios" onClick={() => setNavbar(!navbar)}>
                    Servicios
                  </Link>
                </li>
                <li className="font-extralight text-xl text-black dark:text-gray-100 lg:mb-0 md:mb-0 mb-6 py-1 px-6 text-center border border-transparent hover:border-testCian hover:bg-white/15 rounded transition-transform transform hover:scale-125">
                  <Link href="/#nosotros" onClick={() => setNavbar(!navbar)}>
                    Nosotros
                  </Link>
                </li>
                <li className="font-extralight text-xl text-black dark:text-gray-100 lg:mb-0 md:mb-0 mb-6 py-1 px-6 text-center border border-transparent hover:border-testCian hover:bg-white/15 rounded transition-transform transform hover:scale-125">
                  <Link href="/certs" onClick={() => setNavbar(!navbar)}>
                    Validación de certificados
                  </Link>
                </li>
                <li className="font-extralight text-xl text-black dark:text-gray-100 lg:mb-0 md:mb-0 mb-6 py-1 px-6 text-center border border-transparent hover:border-testCian hover:bg-white/15 rounded transition-transform transform hover:scale-125">
                  <Link href="/#contact" onClick={() => setNavbar(!navbar)}>
                    Contáctanos
                  </Link>
                </li>

                <div className="flex justify-end pr-4 ml-40">
                  <ThemeSwitcher />
                </div>
              </ul>
            </div>
          </div>
          <div className={`md:hidden ${navbar ? "block" : "hidden"}`}>
            <ul>
              {/* Mobile menu links */}
              <li className="font-extralight text-xl text-black dark:text-gray-100 mb-6 py-1 px-6 text-center border border-transparent hover:border-testCian hover:bg-white/15 rounded transition-transform transform hover:scale-125">
                <Link href="/" onClick={() => setNavbar(!navbar)}>
                  Inicio
                </Link>
              </li>
              <li className="font-extralight text-xl text-black dark:text-gray-100 mb-6 py-1 px-6 text-center border border-transparent hover:border-testCian hover:bg-white/15 rounded transition-transform transform hover:scale-125">
                <Link href="/#servicios" onClick={() => setNavbar(!navbar)}>
                  Servicios
                </Link>
              </li>
              <li className="font-extralight text-xl text-black dark:text-gray-100 mb-6 py-1 px-6 text-center border border-transparent hover:border-testCian hover:bg-white/15 rounded transition-transform transform hover:scale-125">
                <Link href="/graduate" onClick={() => setNavbar(!navbar)}>
                  Nosotros
                </Link>
              </li>
              <li className="font-extralight text-xl text-black dark:text-gray-100 mb-6 py-1 px-6 text-center border border-transparent hover:border-testCian hover:bg-white/15 rounded transition-transform transform hover:scale-125">
                <Link href="/certs" onClick={() => setNavbar(!navbar)}>
                  Validación de certificados
                </Link>
              </li>
              <li className="font-extralight text-xl text-black dark:text-gray-100 mb-6 py-1 px-6 text-center border border-transparent hover:border-testCian hover:bg-white/15 rounded transition-transform transform hover:scale-125">
                <Link href="/#contact" onClick={() => setNavbar(!navbar)}>
                  Contactanos
                </Link>
              </li>

              {/* Centered ThemeSwitcher */}
              <div className="flex justify-center mt-4">
                <div className="cursor-pointer">
                  <ThemeSwitcher />
                </div>
              </div>
            </ul>
          </div>

          {/* Agregar el ThemeSwitcher al final de la barra de navegación */}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
