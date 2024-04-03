import React, { useState } from 'react';
import { PageTitle } from '@/widgets/layout';
import {
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
  Card // Importamos el componente Card
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import axios from "axios";

export function DesaparecidosUpload() {

  const [data, setData] = useState({
    nombre: "",
    foto: "",
    descripcion: "",
    aceptaTerminos: false // Nuevo estado para el checkbox
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.nombre ||
      !data.foto ||
      !data.descripcion ||
      !data.aceptaTerminos // Verificamos que el usuario haya aceptado los términos
    ) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await axios.post("https://nuevomern-7y1b.onrender.com/api/noticias", data);
      console.log(response.data);
      const toastId = toast.success("Tu publicación está en proceso de revisión por el administrador.");
      setTimeout(() => {
        toast.dismiss(toastId);
        setData({
          nombre: "",
          foto: "",
          descripcion: "",
          aceptaTerminos: false // Restablecemos el estado del checkbox
        })
      }, 20000);

    } catch (error) {
      console.error("Error:", error);
      toast.error("Error en el reporte.");
    }

  };


  return (
    <div className="p-10" >
       
        <PageTitle section="Reportar Desaparecido" heading="Envia los datos del menor desaparecido">
          Completa los campos para realizar tu reporte
        </PageTitle>
   
      <Card className="mx-auto w-full mt-4 lg:w-5/12 p-1"> {/* Envolver el formulario en una Card */}
        <form onSubmit={handleSubmit}>

          <div className="my-4 flex gap-8">
            <Input
              variant="outlined" size="sm"
              label="Nombre completo del menor"
              value={data.nombre}
              onChange={(e) => setData({ ...data, nombre: e.target.value })} />
          </div>

          <div className="my-4 flex gap-8">
            <Input type="text" name="foto" variant="outlined" size="sm" label="Foto del menor"
              value={data.foto}
              onChange={(e) => setData({ ...data, foto: e.target.value })} />
          </div>

          <Textarea variant="outlined" size="sm"
            label="Descripcion y donde fue visto por última vez. (También agrega un número de contacto)"
            rows={5}
            value={data.descripcion}
            onChange={(e) => setData({ ...data, descripcion: e.target.value })} />

          {/* Agregamos el campo de Checkbox */}
          <div className="mt-0 flex items-center gap-1">
            <Checkbox
              checked={data.aceptaTerminos}
              onChange={(e) => setData({ ...data, aceptaTerminos: e.target.checked })}
            />
            <Typography
              variant="small"
              color="gray"
              className="flex items-center justify-start font-medium"
            >
              Aceptas &nbsp;
              <a
                href="#"
                className="font-normal text-black transition-colors hover:text-gray-900 underline"
              >
                Términos y condiciones
              </a>
            </Typography>
          </div>

          <Button type="submit" variant="gradient" size="lg" className="mt-1 "  fullWidth style={{ background: "#4D5AA6", color: "#ffffff" }}>
            Enviar reporte
          </Button>
        </form>
      </Card>
    </div>
  )
}

DesaparecidosUpload.displayName = "/src/widgets/layout/desaparecidosUpload.jsx";

export default DesaparecidosUpload;
