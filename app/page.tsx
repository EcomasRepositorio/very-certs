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
const ComoVeri = dynamic(() => import("@/components/home/ComoVeri"));
const ContactForm = dynamic(() => import("@/components/home/ContactForm"));
const ScrollToBotButton = dynamic(() => import("@/components/home/bounceDown"));
const Whatveri = dynamic(() => import("@/components/home/Whatveri"));
/* const segSoport = dynamic(() => import("@/components/home/segSoport"));
 */
const QuienesSomos = dynamic(() => import("@/components/home/QuienesSomos"));
const LogosCarrousel = dynamic(
  () => import("@/components/home/logosCarrousel")
);

export default function Main() {
  return (
    <main className="relative z-0 bg-[#e0f9f6] dark:bg-[#140d2f]   ">
      {/* Botón para cambiar de tema */}
      <div className=" bg-gradient-to-r  from-cyan-450 to-blue-500  dark:bg-fondDark  ">
        <PrincipalHome />
      </div>
      {/* <div className=" dark:bg-fondDark ">
        <LogosCarrousel />
      </div> */}
      <div className=" dark:bg-[#140d2f]">
        <Whatveri />
      </div>
      <div className=" dark:bg-[#140d2f]">
        <ComoVeri />
      </div>
      <div className=" dark:bg-[#140d2f]">
        <VentajVeri />
      </div>
      <div className=" dark:bg-[#140d2f] ">
        <Beneficios />
      </div>
      {/* <div className=" dark:bg-fondDark ">
        <PorqueNosotros />
      </div> */}
      {/*   <div className="  dark:bg-fondDark ">
      <SegSoport />
      </div> */}
      <div className="  dark:bg-[#140d2f] ">
        <CarouselCursosDestacados />
      </div>
      <div className="dark:bg-[#140d2f] ">
        <QuienesSomos />
      </div>
      <div className=" dark:bg-[#140d2f] ">
        <ContactForm />
      </div>

      <div className=" dark:bg-[#140d2f]">
        <ScrollToBotButton />
      </div>
    </main>
  );
}


/* bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-black  */
