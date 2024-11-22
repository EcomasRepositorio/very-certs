import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/solid";

const pricingPlans = [
  {
    name: "Basico",
    price: 99,
    features: [
      "Registro de hasta 100 certificados al mes.",
      "10GB de espacio en disco para almacenamiento de certificados.",
      "Acceso a informes básicos de verificación.",
      "Soporte técnico por correo electrónico.",
      "Integración básica con sistemas LMS como Moodle o Blackboard.",
    ],
    icon: CheckCircleIcon,
  },
  {
    name: "Normal",
    price: 199,
    features: [
      "Registro de hasta 1000 certificados al mes.",
      "100GB de espacio en disco.",
      "100 consultas de verificación al mes.",
      "Soporte técnico avanzado por chat y correo electrónico.",
      "Informes detallados sobre la verificación y emisión de certificados.",
      "Personalización del certificado con logotipos y sellos digitales de la institución.",
    ],
    icon: CheckCircleIcon,
  },
  {
    name: "Premium",
    price: 299,
    features: [
      "Registro ilimitado de certificados.",
      "500GB de espacio en disco para almacenamiento seguro.",
      "Verificaciones ilimitadas.",
      "Soporte prioritario por teléfono, chat y correo electrónico.",
      "Acceso a API para integración completa con sistemas LMS.",
      "Informes avanzados de uso y verificaciones.",
      "Opciones de personalización avanzada de certificados, incluyendo diseños exclusivos.",
    ],
    icon: CheckCircleIcon,
  },
];

const PorqueNosotros = () => {
  return (
    <section className="bg-transparent py-16 px-4 text-teal-400 dark:text-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-lg font-semibold text-teal-400">Nuestros Planes</p>
        <h2 className="text-4xl font-bold">
          Encuentra el mejor plan que necesites
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} plan={plan} delay={index * 0.2} />
        ))}
      </div>
    </section>
  );
};

const PricingCard = ({ plan, delay }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounting();
        } else {
          setCount(0);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [plan.price]);

  const startCounting = () => {
    const increment = plan.price / 100;
    let currentCount = 0;

    const counterInterval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= plan.price) {
        setCount(plan.price);
        clearInterval(counterInterval);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, 20);
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-[#16213e] p-8 rounded-2xl shadow-lg flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
    >
      <div className="w-16 h-16 bg-teal-400 rounded-full flex items-center justify-center mb-4">
        <plan.icon className="w-8 h-8 text-[#0e1b35]" />
      </div>
      <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
      <ul className="text-sm space-y-2 mb-6">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center justify-center space-x-2">
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {/* Contenedor para el precio y el botón */}
      <div className="flex flex-col justify-between items-center mt-auto">
        {/* Precio */}
        <div className="min-h-[4rem] flex items-center justify-center">
          <p className="text-4xl font-bold">${count}/mo</p>
        </div>
        {/* Botón */}
        <div className="mt-4">
          <button className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold">
            PURCHASE NOW
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PorqueNosotros;
