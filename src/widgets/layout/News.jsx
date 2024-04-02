import React, {useEffect, useState} from 'react';
import PageTitle from "@/widgets/layout/page-title.jsx";
import {Card, Typography} from "@material-tailwind/react";
import axios from "axios";

const News = () => {

    const [data, setData] = useState([])
    
    useEffect(() => {
        loadDataNews()
    }, [data]);

    const loadDataNews = async () => {
        try {
            const response = await axios.get("https://nuevomern-7y1b.onrender.com/api/noticias");
            setData(response.data);
        } catch (error) {
            console.error("Error:", error.response.data);
        }
    }

    return (
        <>
            <section className="relative bg-white py-10 px-4">
                <div className="container mx-auto">
                    <PageTitle section="" heading=" Adolcentes desaparecidos ">
                        Los adolecentes publicados acontinuación se encuentran desaparecidas, si tienes
                        información comunicate con nosotros ó con el número de contacto en su respectiva
                        descripción.
                    </PageTitle>

                    <div
                        className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                        {data.map(({_id, nombre, descripcion, foto}) => (
                            //estaba icon aqui arriba
                            <Card
                                key={_id}
                                color="transparent"
                                shadow={false}
                                className="text-center text-blue-gray-900"
                            >

                                <img src={foto} className="w-full h-auto mb-2  "/>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {nombre}
                                </Typography>
                                <Typography className="font-normal text-blue-gray-500">
                                    {descripcion}
                                </Typography>

                               


                            </Card>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
};

export default News;