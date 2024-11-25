"use client";

import React from "react";

const InnovationSection = () => {
  return (
    <div className="bg-black text-white py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        THE INNOVATION ENGINE DRIVING IT ALL FORWARD. ONLY FROM NOTCO.
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center">
          <img
            src="/images/ai-engine.png"
            alt="AI Engine"
            className="w-full h-auto mb-4"
          />
          <h3 className="text-xl font-bold">GIUSEPPE</h3>
          <p>
            Our patented AI platform that accelerates product development and
            brings bold ideas to life.
          </p>
        </div>
        <div className="text-center">
          <img
            src="/images/rd-team.png"
            alt="R&D Team"
            className="w-full h-auto mb-4"
          />
          <h3 className="text-xl font-bold">SCIENCE AND R&D</h3>
          <p>
            Industry experts working to ensure every product is the best it can
            be.
          </p>
        </div>
        <div className="text-center">
          <img
            src="/images/solutions.png"
            alt="Solutions"
            className="w-full h-auto mb-4"
          />
          <h3 className="text-xl font-bold">REAL-WORLD SOLUTIONS</h3>
          <p>
            Turning challenges into opportunities for sustainable innovation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InnovationSection;
