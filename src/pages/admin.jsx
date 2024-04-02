import React, { useState } from 'react';
import { PageTitle } from "@/widgets/layout/index.js";
import { teamData } from "@/data/index.js";
import { TeamCard } from "@/widgets/cards/index.js";
import Modal from "@/pages/modal.jsx";
import '../styles/modal.css';

const Admin = () => {
    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);
    // Estado para almacenar los datos del miembro del equipo seleccionado
    const [selectedMember, setSelectedMember] = useState(null);

    // Función para manejar el clic en "Ver datos" y mostrar el modal con los datos del miembro seleccionado
    const handleShowModal = (member) => {
        setSelectedMember(member);
        setShowModal(true);
    };

    return (
        <>
            <section className="px-4 pt-20 pb-48">
                <div className="container mx-auto">
                    <PageTitle section="PADRES/TUTORES REGISTRADOS">
                        Administrador tienes la opción de aceptar o rechazar padres/tutores registrados, aceptando que
                        los padres/tutores ingresaron todos sus datos correctamente.
                    </PageTitle>
                    <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
                        {teamData.map(({ img, name, position, socials }) => (
                            <TeamCard
                                key={name}
                                img={img}
                                name={name}
                                position={
                                    <button
                                        onClick={() => handleShowModal({ img, name, position, socials })}
                                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        Ver datos
                                    </button>
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Renderizado condicional del modal */}
            {showModal && (
                <Modal
                    cerrarModal={() => setShowModal(false)}
                    img={selectedMember.img}
                    name={selectedMember.name}
                    position={selectedMember.position}
                    socials={selectedMember.socials}
                    // Aquí puedes pasar datos adicionales si los necesitas
                />
            )}
        </>
    );
};

export default Admin;