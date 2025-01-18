"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserCog } from "react-icons/fa";
import ThemeSwitcher from "../components/ThemeSwitcher"; // Asegúrate de que la ruta sea correcta
import { useTheme } from "next-themes";
import NavLinks from "./nav-links";
import { PiUserCircleFill } from "react-icons/pi";
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

const Header = () => {
  const { theme, resolvedTheme } = useTheme();
  const [imageSrc, setImageSrc] = useState("/certificate/logos/HORIZONTAL_COLOR.svg"); // imagen por defecto

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
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Servicios",
      href: "/#servicios",
    },
    {
      name: "Validación de certificados",
      href: "/certs",
    },
    {
      name: "Contáctanos",
      href: "/#contact",
    },
  ];

  return (
    <>
      <Navbar
        shouldHideOnScroll
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth={"full"}
        position="sticky"
        className="z-0 hidden md:block   bg-white dark:bg-blackblue"
      >
        <Link href="/">
          <Image
            src={imageSrc}
            alt="Imagen banner"
            width={150}
            height={150}
            className="hidden md:block "
          />
        </Link>
        <NavbarContent justify="center">
          <NavbarItem>
            <Link href="/login" passHref legacyBehavior>
              <Button className="bg-customBlue dark:bg-blackblue2 border-blue-200 border text-white hover:scale-105">
                Iniciar Sesión
                <PiUserCircleFill className="text-2xl text-customWhiteOcean hover:text-customOrange dark:hover:text-customOrange dark:text-customWhiteOcean" />
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="z-20  bg-customGreen dark:bg-blackblue2 "
        position="sticky"
      >
        <NavbarContent className="sm:hidden w-full" justify="center">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <NavbarBrand>
            <div className="flex items-center justify-between w-full">
              <Link href="/">
                {/* Logo para modo claro */}
                <Image
                  src="/certificate/logos/HORIZONTAL_COLOR.svg"
                  width={900}
                  height={900}
                  alt="logo_claro"
                  className="w-32 h-32 dark:hidden" // Visible solo en modo claro
                  priority={true}
                />
                {/* Logo para modo oscuro */}
                <Image
                  src="/certificate/logos/HORIZONTAL_BLANCO.svg"
                  width={900}
                  height={900}
                  alt="logo_oscuro"
                  className="w-36 h-36 hidden dark:block" // Visible solo en modo oscuro
                  priority={true}
                />
              </Link>
              <div>
                <Link href="/certs">
                  <Button className="bg-customBlue dark:bg-blackblue2 border-blue-200 border text-white hover:scale-105">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
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
                <button className=" w-full bg-customBlue dark:bg-customDark border border-customGreenm dark:border-white text-white  py-2 px-6 rounded-2xl">
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
