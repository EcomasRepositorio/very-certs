import React from 'react';
import PropTypes from 'prop-types';

interface CustomTooltipProps {
  text: string;
  children: React.ReactNode;
  colorClass: string; // Color dinámico para los estilos
}

const CustomTooltipBase: React.FC<CustomTooltipProps> = ({ text, children, colorClass }) => {
  return (
    <div className="relative inline-block group">
      <div
        className={`font-bold opacity-0 pointer-events-none group-hover:opacity-100 ${colorClass} text-xs p-2 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-1 transition-all duration-1000`}
      >
        {text}
      </div>
      {children}
    </div>
  );
};

CustomTooltipBase.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired, // Cambiado de `PropTypes.node` a `PropTypes.any`
  colorClass: PropTypes.string.isRequired,
};


// Componentes específicos reutilizando el componente base
export const CustomToolEdit: React.FC<Omit<CustomTooltipProps, 'colorClass'>> = ({ text, children }) => (
  <CustomTooltipBase text={text} children={children} colorClass="text-green-500" />
);

export const CustomToolDelete: React.FC<Omit<CustomTooltipProps, 'colorClass'>> = ({ text, children }) => (
  <CustomTooltipBase text={text} children={children} colorClass="text-red-500" />
);

export const CustomLogout: React.FC<Omit<CustomTooltipProps, 'colorClass'>> = ({ text, children }) => (
  <CustomTooltipBase text={text} children={children} colorClass="text-red-500" />
);

export const CustomRegister: React.FC<Omit<CustomTooltipProps, 'colorClass'>> = ({ text, children }) => (
  <CustomTooltipBase text={text} children={children} colorClass="text-yellow-500" />
);
