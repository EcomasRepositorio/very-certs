import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Modal from "../share/ModalCerti"; // Asegúrate de importar el componente Modal correctamente
import { v5 as uuidv5 } from "uuid";

// Namespace fijo utilizado para generar los UUIDs
const NAMESPACE = "2b9e55dd-9398-44d9-9646-2b4ecf96144c";

// Función para derivar el código del participante desde el UUID
const findParticipantCode = (uuid: string): string | null => {
  const start = 2000000; // Rango inicial de IDs
  const end = 3000000; // Rango final de IDs
  for (let code = start; code <= end; code++) {
    if (uuidv5(code.toString(), NAMESPACE) === uuid) {
      return code.toString();
    }
  }
  return null; // Retorna null si no encuentra el código
};

interface ParticipantData {
  fullName: string;
  courseName: string;
  hours: number;
  date: string;
}

const SearchQR: React.FC = () => {
  const router = useRouter();
  const { uuid } = router.query; // Obtiene el UUID desde la URL
  const [loading, setLoading] = useState(true);
  const [participantData, setParticipantData] = useState<ParticipantData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!uuid) return;

      setLoading(true);
      try {
        // Deriva el código del participante desde el UUID
        const participantCode = findParticipantCode(uuid as string);
        if (!participantCode) {
          throw new Error("No se pudo derivar el código del participante desde el UUID.");
        }

        console.log(participantCode);

        // Realiza la consulta a la API con el código del participante
        const response = await axios.get(
          `https://backclassroom.ecomas.pe/api/v1/certificate/graduate/${participantCode}`
        );
        if (response.data) {
          setParticipantData(response.data);
        } else {
          throw new Error("No se encontraron datos.");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
        setModalOpen(true); // Abre el modal incluso en caso de error
      }
    };

    fetchData();
  }, [uuid]);

  return (
    <>
      {loading && <p>Cargando...</p>}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {participantData ? (
          <div>
            <h2>Certificado de {participantData.fullName}</h2>
            <p>Curso: {participantData.courseName}</p>
            <p>Horas: {participantData.hours}</p>
            <p>Fecha: {participantData.date}</p>
          </div>
        ) : (
          <div>
            <h2>Error</h2>
            <p>No se encontraron datos para este código.</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default SearchQR;
