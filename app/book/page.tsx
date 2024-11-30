"use client";
import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BiWorld } from "react-icons/bi";
import { HiIdentification } from "react-icons/hi2";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
import { BsFillHouseUpFill, BsBank2, BsFillEnvelopeAtFill, BsBuildingsFill, BsFillPersonBadgeFill, BsFillTelephoneFill } from "react-icons/bs";

const Book = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [sending, setSending] = useState(false);

    const [reclamoChecked, setReclamoChecked] = useState(false);
    const [sugerenciaChecked, setSugerenciaChecked] = useState(false);

    const handleReclamoChange = () => {
        setReclamoChecked(!reclamoChecked);
        setSugerenciaChecked(false);
    };

    const handleSugerenciaChange = () => {
        setSugerenciaChecked(!sugerenciaChecked);
        setReclamoChecked(false);
    };

    const refForm = useRef<HTMLFormElement>(null);
    const onSubmit: SubmitHandler<any> = async (data, event) => {
        event?.preventDefault();
        console.log(data);
        setSending(true);
        const serviceID = "service_o9ktlro";
        const templateID = "template_lq24omc";
        const apiKey = "NC9YsKn3imoQXWdJE";
        if (refForm.current) {
            try {
                await emailjs.sendForm(serviceID, templateID, refForm.current, apiKey);
                alert('¡Mensaje Enviado!');
            } catch (err) {
                alert(JSON.stringify(err));
            } finally {
                setSending(false);
            }
        }
    }

    const validateCheckbox = () => {
        if (!reclamoChecked && !sugerenciaChecked) {
            return "Selecciona al menos una opción";
        }
        return true;
    };
//dark:bg-[#1a0e4b]
    return (
        <section className='mt-0 bg-[#e0f9f6] dark:bg-[#140d2f]  dark:bg-fondDark'>
            <div className='max-w-screen-lg mx-auto'>
                <div className='p-2 '>
                    <h1 className='uppercase dark:text-[#00E8AE] text-[#009FB2] text-center md:text-3xl text-2xl font-extrabold mt-40'>Hoja de Reclamación</h1>
                    <p className='text-center mb-2 dark:text-[#00E8AE] text-[#009FB2] '>VERYCERTS</p>
                    <h2 className='bg-[#009FB2] dark:bg-[#1a0e4b] p-3 text-normal font-normal  text-gray-50 rounded-xl'>Identificación del consumidor</h2>
                </div>
                <form ref={refForm} onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-0 p-2'>
                    <div className='text-blackblue '>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            Apellido paterno:
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <FaUserPlus />
                            </div>
                            <input
                                type="text" {...register('lastName', { required: true })}
                                id='apellidoPaterno'
                                name='lastName'
                                //autoFocus
                                className=" bg-blue-50 dark:bg-blackblue2 dark:border-transparent  border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5" placeholder="" />
                        </div>
                    </div>

                    <div className='text-blackblue '>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            Apellido materno:
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <FaUserPlus />
                            </div>
                            <input
                                type="text" {...register('motherName', { required: true })}
                                id='apellidoMaterno'
                                name='motherName'
                                //autoFocus
                                className="bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5" placeholder="" />
                        </div>
                    </div>

                    <div className='text-blackblue'>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            Nombres:
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <BsFillPersonBadgeFill />
                            </div>
                            <input
                                type="text" {...register('name', { required: true })}
                                id='nombres'
                                name='name'
                                //autoFocus
                                className="bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5" placeholder="" />
                        </div>
                        {errors.nombres && <p>El campo nombre es obligatorio</p>}
                        {errors.nombres && <p>El campo nombre debe contener menos de 20 caracteres</p>}
                    </div>

                    <div className='text-blackblue'>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            Teléfono:
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <BsFillTelephoneFill />
                            </div>
                            <input
                                type="text" {...register('phone', { required: true })}
                                id='telefono'
                                name='phone'
                                //autoFocus
                                className="bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5" placeholder="" />
                        </div>
                    </div>

                    <div className='text-blackblue'>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            Tipo de documento:
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <PiIdentificationBadgeFill />
                            </div>
                            <select {...register('typeDocument', { required: true })} name='typeDocument'
                                className="bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5">
                                <option value="dni">DNI</option>
                                <option value="ce">Carnet de extranjeria</option>
                                <option value="pass">Pasaporte</option>
                            </select>
                        </div>
                    </div>

                    <div className='text-blackblue'>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            N° de documento:
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <HiIdentification />
                            </div>
                            <input
                                type="text" {...register('numberDocument', { required: true })}
                                id='numeroDocumentoInput'
                                name='numberDocument'
                                //autoFocus
                                className="bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5" placeholder="" />
                        </div>
                    </div>

                    <div className='text-blackblue'>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            Departamento:
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <SiHomeassistantcommunitystore />
                            </div>
                            <input
                                type="text" {...register('department', { required: true })}
                                id='departamento'
                                name='department'
                                //autoFocus
                                className="bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5" placeholder="" />
                        </div>
                    </div>

                    <div className='text-blackblue'>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            Provincia:
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <BsBank2 />
                            </div>
                            <input
                                type="text" {...register('province', { required: true })}
                                id='provincia'
                                name='province'
                                //autoFocus
                                className="bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5" placeholder="" />
                        </div>
                    </div>

                    <div className='text-blackblue'>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            Distrito:
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <BsBuildingsFill />
                            </div>
                            <input
                                type="text" {...register('district', { required: true })}
                                id='distrito'
                                name='district'
                                //autoFocus
                                className="bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5" placeholder="" />
                        </div>
                    </div>

                    <div className='text-blackblue'>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            Dirección:
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <BsFillHouseUpFill />
                            </div>
                            <input
                                type="text" {...register('address', { required: true })}
                                id='direccion'
                                name='address'
                                //autoFocus
                                className="bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5" placeholder="" />
                        </div>
                    </div>

                    <div className='text-blackblue'>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            Email:
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <BsFillEnvelopeAtFill />
                            </div>
                            <input
                                type="text" {...register('email', { required: true })}
                                id='email'
                                name='email'
                                //autoFocus
                                className="bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5" placeholder="" />
                        </div>
                    </div>

                    <div className='text-blackblue mb-6'>
                        <label
                            className=' absolute text-lg duration-500 scale-75 origin-[0] dark:text-white'>
                            Pais:
                        </label>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none dark:text-white">
                                <BiWorld />
                            </div>
                            <select {...register('country', { required: true })} name='country'
                                className="bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-1 mt-6 border-gray-300 text-gray-600 dark:text-white text-sm rounded-lg block w-full ps-8 p-2.5">
                                <option value="pe">Perú</option>
                                <option value="ar">Argentina</option>
                                <option value="bo">Bolivia</option>
                                <option value="ec">Ecuador</option>
                                <option value="co">Colombia</option>
                                <option value="ve">Venezuela</option>
                                <option value="ch">Chile</option>
                            </select>
                        </div>
                    </div>

                    <div className='md:col-span-2'>
                        <h2 className='bg-[#009FB2] dark:bg-[#1a0e4b] p-3 text-normal text-gray-50 rounded-xl'>Detalle de la reclamación y pedido del consumidor</h2>

                        <div className='grid grid-cols-2 gap-4 mt-4 mb-2 p-3 '>
                            <div className="flex flex-row items-center">
                                <input
                                    id="purple-checkbox-reclamo"
                                    type="checkbox"
                                    //{...register('reclamo', {required: true})}
                                    {...register('reclamo', { validate: validateCheckbox })}
                                    name='reclamo'
                                    checked={reclamoChecked}
                                    onChange={handleReclamoChange}
                                    className=" w-6 h-6 text-primaryblue bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-blue-100 rounded-full focus:primaryblue dark:focus:primaryblue dark:ring-offset-primaryblue focus:ring-2  dark:border-gray-600"
                                />
                                <label htmlFor="purple-checkbox-reclamo" className="ms-2  text-gray-600 dark:text-white ">Reclamo</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input
                                    id="purple-checkbox-sugerencia"
                                    type="checkbox"
                                    //{...register('sugerencia', {required: true})}
                                    {...register('sugerencia', { validate: validateCheckbox })}
                                    name='sugerencia'
                                    checked={sugerenciaChecked}
                                    onChange={handleSugerenciaChange}
                                    className="w-6 h-6 text-primaryblue bg-blue-50 dark:bg-blackblue2 dark:border-transparent border-blue-100 rounded focus:primaryblue dark:focus:primaryblue dark:ring-offset-primaryblue focus:ring-2 dark:border-gray-600"
                                />
                                <label htmlFor="purple-checkbox-sugerencia" className="ms-2  text-gray-600 dark:text-white ">Sugerencia</label>
                            </div>
                        </div>

                        {/* <label className=' absolute text-gray-600 dark:text-white text-lg duration-500 scale-75 origin-[0]'>
            Mensaje:
          </label>
          <div className='relative'>
            <textarea id="message" rows={10} className="block mt-12 p-2.5 w-full text-gray-900 bg-blue-50 dark:bg-blackblue2 dark:border-transparent rounded-lg border-1 border-gray-300"
              placeholder="Mensaje">
            </textarea>
          </div> */}

                        <label className=' absolute text-gray-600 dark:text-white text-lg duration-500 '>
                            Mensaje:
                        </label>
                        <div className='relative mb-4'>
                            <textarea
                                id="mensaje"
                                rows={10}
                                {...register('message', { required: true })}
                                name='message'
                                className="h-24 block mt-12 p-2.5 w-full text-gray-900 bg-blue-50 dark:bg-blackblue2 dark:border-transparent rounded-lg border-1 border-gray-300"
                                placeholder={reclamoChecked ? "Mensaje de reclamo" : sugerenciaChecked ? "Mensaje de sugerencia" : "Mensaje"}
                            >
                            </textarea>
                        </div>
                    </div>
                    <input type="submit" value={sending ? 'Enviando...' : 'Enviar'} className='hover:scale-105  p-2 mb-6 rounded-xl bg-[#009FB2] dark:bg-[#1a0e4b] text-gray-100 text-normal cursor-pointer' />
                </form>
            </div>
        </section>
    )
}

export default Book