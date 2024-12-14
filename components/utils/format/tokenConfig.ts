export const tokenConfig = (value: string) => {
  return {
    headers: { Authorization: `Bearer ${value}` },
  };
};

// Primera API
export const URL = () => "https://backend.verycerts.com/api/v1";

// Segunda API
export const getURL = () => "https://backend.ecomas.pe/api/v1";

export default tokenConfig;




 

 /* export const tokenConfig = (value: string) => {
  return {
    headers: { Authorization: `Bearer ${value}` },
  };
};

// URL base para el backend principal
export const BASE_URL = "http://localhost:8000/api/v1";

// URL base para otro backend (si lo necesitas)
export const SECONDARY_BASE_URL = "http://localhost:9000/api/v2";

// Función para obtener dinámicamente una URL base
export const getURL = (service: "main" | "secondary") => {
  if (service === "main") {
    return BASE_URL;
  }
  if (service === "secondary") {
    return SECONDARY_BASE_URL;
  }
  throw new Error("Invalid service type");
};

export default tokenConfig;
 */