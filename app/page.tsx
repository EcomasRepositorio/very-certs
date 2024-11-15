"use client";
import dynamic from "next/dynamic";
const PrincipalHome = dynamic(() => import("@/components/home/PrincipalHome"));
const PorqueNosotros = dynamic(
  () => import("@/components/home/PorqueNosotros")
);
const VentajVeri = dynamic(() => import("@/components/home/VentajVeri"));
const CarouselCursosDestacados = dynamic(
  () => import("@/components/home/SwiperCursosDestacados")
);
const Beneficios = dynamic(() => import("@/components/home/Beneficios"));
//const QuienesSomos = dynamic(() => import("@/components/home/QuienesSomos"));
const ComoVeri = dynamic(() => import("@/components/home/ComoVeri"));
const ContactForm = dynamic(() => import("@/components/home/ContactForm"));
const ScrollToBotButton = dynamic(() => import("@/components/home/bounceDown"));
const Whatveri = dynamic(() => import("@/components/home/Whatveri"));

export default function Main() {
  return (
    <main className="relative z-0 bg-gradient-to-r  from-[#e0f9f6] to-[#e0f9f6]  ">
      {/* Botón para cambiar de tema */}
      <div className=" bg-gradient-to-r  from-cyan-450 to-blue-500  dark:bg-fondDark  ">
        <PrincipalHome />
      </div>
      {/* <div className="bg-blue-500  dark:bg-fondDark ">
        <QuienesSomos />
      </div>  */}
      <div className=" dark:bg-fondDark">
        <Whatveri />
      </div>
      <div className=" dark:bg-fondDark">
        <ComoVeri />
      </div>
      <div className=" dark:bg-fondDark">
        <VentajVeri />
      </div>
      <div className=" dark:bg-fondDark ">
        <Beneficios />
      </div>
      <div className=" dark:bg-fondDark ">
        <PorqueNosotros />
      </div>
      <div className="  dark:bg-fondDark ">
        <CarouselCursosDestacados />
      </div>

      <div className=" dark:bg-fondDark ">
        <ContactForm />
      </div>

      <div className=" dark:bg-fondDark">
        <ScrollToBotButton />
      </div>
    </main>
  );
}
