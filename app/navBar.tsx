"use client";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useTheme } from "next-themes";
import NavLinks from "./nav-links";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/solid";
import { PiUserCircleFill } from "react-icons/pi";
const Header = () => {
  const { theme, resolvedTheme } = useTheme();
  const [imageSrc, setImageSrc] = useState(
    "/certificate/logos/HORIZONTAL_COLOR.svg"
  ); // imagen por defecto

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  useEffect(() => {
    // actualiza la imagen cuando el tema cambia
    setImageSrc(
      resolvedTheme === "dark"
        ? "/certificate/logos/HORIZONTAL_BLANCO.svg"
        : "/certificate/logos/HORIZONTAL_COLOR.svg"
    );
  }, [resolvedTheme]);
  const handleMenuItemClick = () => {
    // Cierra el menú al hacer clic en un elemento
    setIsMenuOpen(false);
  };
  const menuItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/#servicios" },
    { name: "Validación de certificados", href: "/certs" },
    { name: "Contáctanos", href: "/#contact" },
  ];

  return (
    <>
      <Navbar
        shouldHideOnScroll
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth={"full"}
        position="sticky"
        className="z-0 hidden md:block bg-customGreen dark:bg-customDark"
      >
        <Link href="/" passHref>
          <Image
            src={imageSrc}
            alt="Logo"
            width={150}
            height={50}
            className="hidden md:block"
            priority // Mejora el rendimiento
          />
        </Link>
        <NavbarContent justify="center">
          <NavbarItem>
            <Link href="/login" passHref>
              <Button className="bg-customBlue dark:bg-customDark border-blue-200 border text-white hover:scale-105">
                Iniciar Sesión
                <PiUserCircleFill className="text-2xl ml-2 text-customWhiteOcean hover:text-customOrange dark:text-customWhiteOcean" />
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="z-20  bg-white dark:bg-[#0f0a23] "
        position="sticky"
      >
        <NavbarContent className="sm:hidden w-full" justify="center">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <NavbarBrand>
            <div className="flex items-center justify-between w-full">
              <Link href="/" passHref>
                <Image
                  src="/certificate/logos/HORIZONTAL_COLOR.svg"
                  alt="Logo Claro"
                  width={120}
                  height={40}
                  className="dark:hidden" // Visible en tema claro
                />
                <Image
                  src="/certificate/logos/HORIZONTAL_BLANCO.svg"
                  alt="Logo Oscuro"
                  width={120}
                  height={40}
                  className="hidden dark:block" // Visible en tema oscuro
                />
              </Link>
              {/* Botón de inicio de sesión */}
              <NavbarItem>
                <Link href="/login/" passHref>
                  <Button className="bg-customBlue dark:bg-customDark border-blue-200 border text-white hover:scale-105">
                    Iniciar Sesión
                  </Button>
                </Link>
              </NavbarItem>
            </div>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4 " justify="end">
          <NavLinks />
          <NavbarContent justify="end">
            <ThemeSwitcher />
          </NavbarContent>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((link, index) => (
            <NavbarMenuItem key={index}>
              <Link
                color="primary"
                href={link.href}
                className="text-lg mr-4"
                onClick={handleMenuItemClick} // Agrega un manejador de clic para cerrar el menú
              >
                <button className="w-full bg-customBlue dark:bg-customDark border border-customGreenm dark:border-white text-white py-2 px-6 rounded-2xl">
                  {link.name}
                </button>
              </Link>
            </NavbarMenuItem>
          ))}
          <div className="flex justify-center mt-4">
            <ThemeSwitcher />
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default Header;
