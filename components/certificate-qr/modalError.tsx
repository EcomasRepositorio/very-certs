import React from 'react'

const modalError = () => {
  return (
   <div className="absolute inset-0 flex items-center justify-center bg-black/60 bg-opacity-60">
             <div className="bg-gradient-to-br from-black via-[#001A6E] to-black bg-[length:200%] animate-gradient-move font-semibold rounded-2xl shadow p-5 transition-all max-w-md sm:w-full w-full text-center">
               <h2 className="text-2xl text-red-500 font-bold mb-4">Error</h2>
               <p className="text-white">
                 No se pudo encontrar la información asociada a este QR.
               </p>
             </div>
           </div>
  )
}

export default modalError