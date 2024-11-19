import React from 'react';
import Image from 'next/image';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DashboardSkeleton = dynamic(() => import('@/components/home/skeletons'));

interface CursoProps {
  curso: {
    id: string;
    area: string;
    titulo: string;
    imagen: string;
    fechaInicio: string;
    modalidad: string;
    duracion: string;
    horas: string;
    descripcion: string;
    modulos: string[];
  };
}

const Curso: React.FC<CursoProps> = ({ curso }) => {
  function toRoman(num : number) {
    const romanNumerals = [
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' }
    ];

    let result = '';

    for (const pair of romanNumerals) {
      while (num >= pair.value) {
        result += pair.numeral;
        num -= pair.value;
      }
    }

    return result;
  }



  return (
    <div className="text-gray-600 body-font overflow-hidden mb-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <Suspense fallback={<DashboardSkeleton />}>
            <Image
              src={curso.imagen}
              alt="ecommerce"
              width={600}
              height={600}
              className="lg:w-[550px] ml-0 lg:ml-40 lg:h-auto object-cover object-center rounded-lg"
            />
          </Suspense>
          <div className="lg:w-1/2 lg:pl-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 dark:text-white tracking-widest mt-4 sm:mt-2 md:mt-2 lg:mt-0">{curso.area}</h2>
            <h1 className="text-primaryblue text-3xl title-font font-medium mb-4">{curso.titulo}</h1>
            <Accordion defaultExpandedKeys={["1"]}>
              <AccordionItem key="1" aria-label="Accordion 1" subtitle=""
                title={
                  <h2 className='text-blackblue dark:text-white'>Detalles del diplomado</h2>
                }>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-blackblue dark:text-white">Fecha de inicio: <span className="font-normal dark:text-white">{curso.fechaInicio}</span></p>
                  </div>
                  <div>
                    <p className="font-bold text-blackblue dark:text-white">Modalidad: <span className="font-normal dark:text-white">{curso.modalidad}</span></p>
                  </div>
                  <div>
                    <p className="font-bold text-blackblue dark:text-white">Tiempo de duración: <span className="font-normal dark:text-white">{curso.duracion}</span></p>
                  </div>
                  <div>
                    <p className="font-bold text-blackblue dark:text-white">Horas del curso: <span className="font-normal dark:text-white">{curso.horas}</span></p>
                  </div>
                </div>

                <div className="mt-4 flex  ">
                  <a href="https://wa.me/" target="_blank">
                    <button className="hover:bg-[#25D344]  flex items-center justify-center px-4 py-2 bg-[#25D366] text-white rounded-md mb-2 mr-2">
                      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="512" height="512" x="0" y="0" fill="white" enableBackground="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" > <path fillRule="evenodd" d="M436.535 74.406C388.635 26.449 324.933.028 257.063 0 117.222 0 3.407 113.807 3.352 253.692c-.019 44.716 11.664 88.362 33.866 126.838L1.225 512l134.496-35.281c37.057 20.213 78.78 30.866 121.242 30.881h.105c139.827 0 253.652-113.818 253.708-253.706.026-67.791-26.34-131.534-74.241-179.488zM257.066 464.752h-.086c-37.839-.014-74.952-10.181-107.328-29.394l-7.7-4.57-79.812 20.937 21.303-77.816-5.014-7.979c-21.109-33.574-32.258-72.378-32.241-112.223C46.234 137.441 140.833 42.85 257.15 42.85c56.324.019 109.27 21.983 149.084 61.842 39.813 39.858 61.726 92.84 61.705 149.185-.048 116.276-94.645 210.875-210.873 210.875zm115.668-157.933c-6.339-3.173-37.506-18.507-43.318-20.625-5.81-2.115-10.037-3.172-14.263 3.172-4.225 6.346-16.374 20.626-20.073 24.857-3.697 4.229-7.395 4.761-13.734 1.586-6.34-3.173-26.766-9.866-50.979-31.465-18.846-16.81-31.568-37.569-35.266-43.916-3.698-6.346-.394-9.776 2.779-12.937 2.852-2.841 6.34-7.405 9.509-11.106 3.17-3.701 4.226-6.347 6.339-10.575 2.113-4.232 1.057-7.934-.528-11.106-1.585-3.173-14.263-34.377-19.545-47.071-5.146-12.359-10.372-10.686-14.263-10.882-3.693-.184-7.924-.223-12.15-.223s-11.094 1.586-16.905 7.932c-5.811 6.347-22.187 21.684-22.187 52.885 0 31.204 22.715 61.348 25.885 65.579 3.169 4.232 44.701 68.262 108.294 95.722 15.124 6.532 26.933 10.432 36.139 13.353 15.186 4.826 29.006 4.145 39.929 2.512 12.18-1.819 37.506-15.334 42.789-30.142 5.281-14.811 5.281-27.503 3.697-30.146-1.583-2.643-5.81-4.23-12.149-7.404z" clipRule="evenodd" ></path> </svg>

                      Inscribirse
                    </button>
                  </a>
                  <a href="https://wa.me/" target="_blank">
                  <button className="hover:bg-[#0060dd] flex items-center justify-center px-4 py-2 bg-primaryblue text-white rounded-md mb-2 mr-2">
                      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" x="0" y="0" enableBackground="new 0 0 482.14 482.14" version="1.1" fill="white" viewBox="0 0 482.14 482.14" xmlSpace="preserve" > <path d="M142.024 310.194c0-8.007-5.556-12.782-15.359-12.782-4.003 0-6.714.395-8.132.773v25.69c1.679.378 3.743.504 6.588.504 10.449 0 16.903-5.279 16.903-14.185zM202.709 297.681c-4.39 0-7.227.379-8.905.772v56.896c1.679.394 4.39.394 6.841.394 17.809.126 29.424-9.677 29.424-30.449.126-18.063-10.458-27.613-27.36-27.613z"></path> <path d="M315.458 0H121.811c-28.29 0-51.315 23.041-51.315 51.315v189.754h-5.012c-11.418 0-20.678 9.251-20.678 20.679v125.404c0 11.427 9.259 20.677 20.678 20.677h5.012v22.995c0 28.305 23.025 51.315 51.315 51.315h264.223c28.272 0 51.3-23.011 51.3-51.315V121.449L315.458 0zM99.053 284.379c6.06-1.024 14.578-1.796 26.579-1.796 12.128 0 20.772 2.315 26.58 6.965 5.548 4.382 9.292 11.615 9.292 20.127 0 8.51-2.837 15.745-7.999 20.646-6.714 6.32-16.643 9.157-28.258 9.157-2.585 0-4.902-.128-6.714-.379v31.096h-19.48v-85.816zm286.981 166.334H121.811c-10.954 0-19.874-8.92-19.874-19.889v-22.995h246.31c11.42 0 20.679-9.25 20.679-20.677V261.748c0-11.428-9.259-20.679-20.679-20.679h-246.31V51.315c0-10.938 8.921-19.858 19.874-19.858l181.89-.19V98.5c0 19.638 15.934 35.587 35.587 35.587l65.862-.189.741 296.925c0 10.97-8.904 19.89-19.857 19.89zm-211.969-80.912v-85.422c7.225-1.15 16.642-1.796 26.58-1.796 16.516 0 27.226 2.963 35.618 9.282 9.031 6.714 14.704 17.416 14.704 32.781 0 16.643-6.06 28.133-14.453 35.224-9.157 7.612-23.096 11.222-40.125 11.222-10.198 0-17.423-.646-22.324-1.291zm140.827-50.575v15.996h-31.23v34.973h-19.74v-86.966h53.16v16.122h-33.42v19.875h31.23z"></path> </svg>

                      Plan de estudios
                  </button>
                </a>
              </div>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              subtitle={
                <span>

                </span>
              }
              title={
                <h2 className='text-blackblue dark:text-white'>¿A quiénes está dirigido este diplomado?</h2>
              }
            >
              <div className='text-gray-800 dark:text-white'>
                {curso.descripcion}
              </div>
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" subtitle=""
              title={
                <h2 className='text-blackblue dark:text-white'>¿Con qué módulos cuenta el diplomado?</h2>
              }>
              <ul className="list-disc pl-5 text-gray-800 dark:text-white">
                {curso.modulos.map((modulo, moduloIndex) => (
                  <li key={moduloIndex}>
                    <span className='font-bold'>MÓDULO {toRoman(moduloIndex + 1)}: </span>{modulo}
                  </li>
                ))}
              </ul>

            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
    </div >
  );
};

export default Curso;
