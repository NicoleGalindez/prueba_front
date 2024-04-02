import { Input, Avatar, Typography, Button, Card } from "@material-tailwind/react";
import {
    MapPinIcon, BriefcaseIcon, BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer, DesaparecidosUpload } from "@/widgets/layout";
import { contactData } from "@/data";
import { PageTitle } from "@/widgets/layout";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import News from "@/widgets/layout/News.jsx";
import ModalMenor from "@/pages/modalmenor";
import '../styles/modalmenor.css';

export function Profile() {
    const [showChildModal, setShowChildModal] = useState(false);
    const [showRegistroModal, setShowRegistroModal] = useState(false);
    const [selectedChild, setSelectedChild] = useState({});// Nuevo estado para controlar el modal del menor

    const openChildModal = (menor) => {
        setSelectedChild(menor);
        setShowChildModal(true);
    };

    const dataUsers = localStorage.getItem("user")
    const idTutor = JSON.parse(dataUsers)

    const [data, setData] = useState({})
    const [menores, setMenores] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        tipoIdentificacion: "",
        numeroIdentificacion: "",
        edad: "",
        telefono: "",
        correo: "",
        idTutor: idTutor.id
    });

    const closeChildModal = () => {
        setShowChildModal(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.nombres ||
            !formData.apellidos ||
            !formData.tipoIdentificacion ||
            !formData.numeroIdentificacion ||
            !formData.edad ||
            !formData.telefono ||
            !formData.correo
        ) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await axios.post("https://nuevomern-7y1b.onrender.com/api/menor", formData);
            console.log(response.data);

            const toastId = toast.success("Registro menor exitoso.");
            setTimeout(() => {
                setFormData({
                    nombres: "",
                    apellidos: "",
                    tipoIdentificacion: "",
                    numeroIdentificacion: "",
                    edad: "",
                    telefono: "",
                    correo: "",
                    idTutor: ""
                })
                toast.dismiss(toastId); // Ocultar el toast después de 3 segundos
                setShowModal(false)
                loadDataUser()
            }, 1000);

        } catch (error) {
            console.error("Error:", error);
            toast.error("Error en el registro.");
        }

    };

    useEffect(() => {
        loadDataUser()
    }, []);

    const loadDataUser = async () => {
        try {
            const storedUserData = localStorage.getItem("user");
            const userData = JSON.parse(storedUserData);

            const response = await axios.get("https://nuevomern-7y1b.onrender.com/api/profile", {
                headers: {
                    Authorization: userData.token
                }
            });

            const responseMinMenores = await axios.get(`https://nuevomern-7y1b.onrender.com/api/menores/${idTutor.id}`);
            setMenores(responseMinMenores.data);
            setData(response.data);

        } catch (error) {
            console.error("Error:", error.response.data);
        }
    }

    return (<>


        <section className="relative block h-[50vh]">
            <Toaster />
            <div
                className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
            <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        </section>
        <section className="relative bg-white py-16">
            <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between">
                        <div className="relative flex gap-6 items-start">
                            <div className="-mt-20 w-40">
                                <Avatar
                                    src="/img/perfil.png"
                                    alt="Profile picture"
                                    variant="circular"
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="flex flex-col mt-2">
                                <Typography variant="h4" color="blue-gray">
                                    {data.nombres} {data.apellidos}
                                </Typography>
                                <Typography variant="paragraph" color="gray"
                                    className="!mt-0 font-normal">{data.email}</Typography>

                                <div className="flex items-center gap-2">
                                    <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                                    <Typography className="font-medium text-blue-gray-500">
                                        Tel: {data.telefono}
                                    </Typography>

                                </div>




                            </div>


                        </div>

                        <div
                            className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                            <Button
                                className="bg-gray-900 w-fit lg:ml-auto"
                                type="button"
                                onClick={() => setShowModal(true)}>
                                Agregar un menor
                            </Button>

                            <div className="mr-4 p-3 text-center">
                                <Typography
                                    variant="lead"
                                    color="blue-gray"
                                    className="font-bold uppercase"
                                >
                                    Menor (es) a Cargo:
                                </Typography>
                                <div>
                                    {menores.map((menor) => (
                                        <a href="#" style={{ textDecoration: 'underline' }} onClick={() => openChildModal(menor)}>
                                            <Typography
                                                key={menor._id}
                                                variant="small"
                                                className="font-normal text-blue-gray-500">
                                                {menor.nombres} ({menor.edad} años)
                                            </Typography>
                                        </a>
                                    ))}
                                </div>


                                {showChildModal && (
                                    <ModalMenor
                                        onClose={closeChildModal}
                                        childInfo={selectedChild}
                                    />
                                )}
                            </div>




                            <div className="mr-4 p-3 text-center">
                            </div>
                            {/* <div className="p-3 text-center lg:mr-4">
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold uppercase"
                                        >
                                            10
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            className="font-normal text-blue-gray-500"
                                        >
                                            Rutas realizadas
                                        </Typography>
                                    </div> */}
                        </div>

                    </div>
                </div>
                <div className="-mt-4 container space-y-2">
                    {/* <div className="flex items-center gap-2">
                                <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500"/>
                                <Typography className="font-medium text-blue-gray-500">
                                    Tel: {data.telefono}
                                </Typography>
                            </div> */}
                </div>
                <div className="mb-10 py-6">

                </div>

            </div>





            <div className="my-2 py-6">


                <DesaparecidosUpload />
                <News />

            </div>
        </section>


        <div className="bg-white">
            <Footer />
        </div>
        {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div
                    className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true">&#8203;</span>
                    <div
                        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <Typography variant="h5" className="font-bold mb-4">
                                    Registro Menor
                                </Typography>
                                <div className="grid grid-cols-1 gap-4">
                                    <Input
                                        type="text"
                                        size="regular"
                                        placeholder="Nombre"
                                        value={formData.nombres}
                                        onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                                    />

                                    <Input
                                        type="text"
                                        size="regular"
                                        placeholder="Apellidos"
                                        value={formData.apellidos}
                                        onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                                    />

                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                        Tipo de identificación
                                    </Typography>
                                    <select
                                        value={formData.tipoIdentificacion}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            tipoIdentificacion: e.target.value
                                        })}
                                        className="border-t border-blue-gray-200 focus:border-gray-900 px-4 py-2 rounded-md"
                                    >
                                        <option value="">
                                            Selecciona tu tipo de identificación
                                        </option>
                                        <option value="tarjeta de identidad">Tarjeta de identidad</option>
                                        <option value="registro">Registro</option>
                                    </select>

                                    <Input
                                        type="number"
                                        size="regular"
                                        placeholder="Número de identificación"
                                        value={formData.numeroIdentificacion}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            numeroIdentificacion: e.target.value
                                        })}
                                    />
                                    <Input
                                        type="number"
                                        size="regular"
                                        placeholder="Edad"
                                        value={formData.edad}
                                        onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                                    />
                                    <Input
                                        type="number"
                                        size="regular"
                                        placeholder="Teléfono"
                                        value={formData.telefono}
                                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                    />
                                    <Input
                                        type="email"
                                        size="regular"
                                        placeholder="Correo electrónico"
                                        value={formData.correo}
                                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <Button
                                    type="submit"
                                    color="blue"
                                    buttonType="filled"
                                    size="regular"
                                    block={false}
                                    iconOnly={false}
                                    ripple="light"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Registrar menor
                                </Button>
                                <Button
                                    color="gray"
                                    buttonType="filled"
                                    size="regular"
                                    block={false}
                                    iconOnly={false}
                                    ripple="light"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </>
    )
};

export default Profile;
