"use client";

import React from "react";

const TestimonialsSection = () => {
  return (
    <div className="bg-white py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        SEE HOW WE HAVE HELPED OTHERS.
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center">
          <img
            src="/images/product-1.jpg"
            alt="Product 1"
            className="w-full h-auto mb-4 rounded-lg"
          />
          <h3 className="text-xl font-bold">HOTCAKES</h3>
          <p>Delicious hotcakes without compromising on taste.</p>
        </div>
        <div className="text-center">
          <img
            src="/images/product-2.jpg"
            alt="Product 2"
            className="w-full h-auto mb-4 rounded-lg"
          />
          <h3 className="text-xl font-bold">NOT MILK BARISTA</h3>
          <p>Perfect for coffee, crafted for sustainability.</p>
        </div>
        <div className="text-center">
          <img
            src="/images/product-3.jpg"
            alt="Product 3"
            className="w-full h-auto mb-4 rounded-lg"
          />
          <h3 className="text-xl font-bold">MYNOTCOOP</h3>
          <p>
            A platform for collaboration and idea-sharing among the best minds
            in the industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
