"use client";

import dynamic from "next/dynamic";

// Importa dinámicamente los componentes
const Principal = dynamic(() => import("@/components/institutos/principal"));
const Ecomas = dynamic(() => import("@/components/institutos/ecomas"));
const Carrusel = dynamic(() => import("@/components/institutos/carrusel"));
const Promas2 = dynamic(() => import("@/components/institutos/promas2"));
const Binex = dynamic(() => import("@/components/institutos/binex"));
const Cimade = dynamic(() => import("@/components/institutos/cimade"));
const Inalta = dynamic(() => import("@/components/institutos/inalta"));
/* const Sayan = dynamic(() => import("@/components/institutos/sayan"));
const Seveda = dynamic(() => import("@/components/institutos/seveda"));
const Rizo = dynamic(() => import("@/components/institutos/rizo"));
 */
// Función para mezclar aleatoriamente
const shuffleArray = (array: JSX.Element[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function Main() {
  // Array de los componentes restantes para orden aleatorio
  const remainingComponents = shuffleArray([
    <Binex key="binex" />,
    <Cimade key="cimade" />,
    <Inalta key="inalta" />,
   /*  <Sayan key="sayan" />,
    <Seveda key="seveda" />,
    <Rizo key="rizo" />, */
  ]);

  return (
    <main className="relative z-0 bg-[#e0f9f6] dark:bg-fondDark">
      {/* Principal */}
      <div className="bg-gradient-to-r from-cyan-450 to-blue-500 dark:bg-fondDark">
        <Principal />
      </div>

      {/* Ecomas */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 dark:bg-fondDark">
        <Ecomas />
      </div>

      {/* Promas */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 dark:bg-fondDark">
        <Carrusel />
      </div>
      <div className="bg-gradient-to-r from-red-500 to-red-600 dark:bg-fondDark">
        <Promas2 />
      </div>
      {/* Resto de los componentes en orden aleatorio */}
      {remainingComponents.map((Component) => (
        <div key={Component.key} className="dark:bg-fondDark">
          {Component}
        </div>
      ))}
    </main>
  );
}
