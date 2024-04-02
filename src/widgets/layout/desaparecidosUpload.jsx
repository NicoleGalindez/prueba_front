import React, {useState} from 'react'
import {PageTitle} from '@/widgets/layout'
import {
    Typography,
    Button,
    Input,
    Textarea,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import axios from "axios";

export function DesaparecidosUpload() {

    const [data, setData] = useState({
        nombre: "",
        foto: "",
        descripcion: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !data.nombre ||
            !data.foto ||
            !data.descripcion
        ) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await axios.post("https://nuevomern-7y1b.onrender.com/api/noticias", data);
            console.log(response.data);
            const toastId = toast.success("Reporte exitoso.");
            setTimeout(() => {
                toast.dismiss(toastId);
                setData({
                    nombre: "",
                    foto: "",
                    descripcion: ""
                })
            }, 1000);

        } catch (error) {
            console.error("Error:", error);
            toast.error("Error en el reporte.");
        }

    };


    return (
        <>
            <div className="p-10">
                <PageTitle section="Reportar Desaparecido" heading="Envia los datos del desaparecido">
                    Completa los campos para realizar tu reporte
                </PageTitle>
                <form onSubmit={handleSubmit} className="mx-auto w-full mt-12 lg:w-5/12">

                    <div className="my-4 flex gap-8">
                        <Input
                            variant="outlined" size="lg"
                            label="Nombre completo del menor"
                            value={data.nombre}
                            onChange={(e) => setData({...data, nombre: e.target.value})}/>
                    </div>

                    <div className="my-4 flex gap-8">
                        <Input type="text" name="foto" variant="outlined" size="lg" label="Foto del menor"
                               value={data.foto}
                               onChange={(e) => setData({...data, foto: e.target.value})}/>
                    </div>

                    <Textarea variant="outlined" size="lg"
                              label="Descripcion y donde fué visto por última vez. (Tambien agrega un número de contacto)"
                              rows={10}
                              value={data.descripcion}
                              onChange={(e) => setData({...data, descripcion: e.target.value})}/>

                              

                    <Button type="submit" variant="gradient" size="lg" className="mt-8" fullWidth>
                        Enviar reporte
                    </Button>
                </form>
            </div>
        </>
    )
}

DesaparecidosUpload.displayName = "/src/widgets/layout/desaparecidosUpload.jsx";

export default DesaparecidosUpload;

