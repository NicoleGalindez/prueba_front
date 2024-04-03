import React, { useState } from 'react';
import { PageTitle } from "@/widgets/layout/index.js";
import { teamData } from "@/data/index.js";
import { TeamCard } from "@/widgets/cards/index.js";
import Modal from "@/pages/modal.jsx";
import '../styles/modal.css';
import '../styles/eliminadas.css';
import '../styles/menu.css';
import '../styles/aceptadas.css';
import '../styles/verificar.css';
const Admin = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [registeredUsers, setRegisteredUsers] = useState(teamData);
    const [deletedPosts, setDeletedPosts] = useState([]);
    const [showDeletedPosts, setShowDeletedPosts] = useState(false);
    const [showAcceptedPosts, setShowAcceptedPosts] = useState(false);
    const [showUserManagement, setShowUserManagement] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showPublications, setShowPublications] = useState(false);

    const handleShowModal = (member) => {
        setSelectedMember(member);
        setShowModal(true);
    };

    const handleAcceptUser = () => {
        const updatedUsers = registeredUsers.filter(user => user.name !== selectedMember.name);
        setRegisteredUsers(updatedUsers);
        setShowModal(false);
    };

    const handleDeleteUser = () => {
        const updatedUsers = registeredUsers.filter(user => user.name !== selectedMember.name);
        setRegisteredUsers(updatedUsers);
        setShowModal(false);
    };

    const handleShowDeletedPosts = () => {
        setShowDeletedPosts(true);
        setShowAcceptedPosts(false);
        setShowUserManagement(false);
        setShowPublications(false);
        // Filtrar las publicaciones eliminadas
        const deleted = registeredUsers.filter(user => user.deleted);
        setDeletedPosts(deleted);
    };

    const handleShowAcceptedPosts = () => {
        setShowAcceptedPosts(true);
        setShowDeletedPosts(false);
        setShowUserManagement(false);
        setShowPublications(false);
    };

    const handleShowUserManagement = () => {
        setShowUserManagement(true);
        setShowDeletedPosts(false);
        setShowAcceptedPosts(false);
        setShowPublications(false);
    };

    const handleShowPublications = () => {
        setShowPublications(true);
        setShowDeletedPosts(false);
        setShowAcceptedPosts(false);
        setShowUserManagement(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPosts = registeredUsers.filter((user) =>
        user.accepted && user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openDetailsModal = (post) => {
        setSelectedPost(post);
        setShowDetailsModal(true);
    };
      
    const closeDetailsModal = () => {
        setSelectedPost(null);
        setShowDetailsModal(false);
    };

    return (
        <div className="flex">
            <aside className="menu bg-gray-200 w-1/5 p-4 fixed h-full overflow-y-auto">
                <h2 className="menu-title text-lg font-semibold mb-4">Menú Administrador</h2>
                <ul className="space-y-2">
                    <li className="menu-item">
                        <button className="menu-button" onClick={handleShowDeletedPosts}>Publicaciones Eliminadas</button>
                    </li>
                    <li className="menu-item">
                        <button className="menu-button" onClick={handleShowAcceptedPosts}>Publicaciones Aceptadas</button>
                    </li>
                    <li className="menu-item">
                        <button className="menu-button" onClick={handleShowUserManagement}>Gestión de Usuarios</button>
                    </li>
                    <li className="menu-item">
                        <button className="menu-button" onClick={handleShowPublications}>Publicaciones</button>
                    </li>
                </ul>
            </aside>
            <section className="flex-1 p-4 ml-32">
                <PageTitle section="BIENVENIDO ADMINISTRADOR">
                    GESTIONA TODA LA INFORMACION NECESARIA
                </PageTitle>
                <div className="mt-8 grid grid-cols-1 gap-6" style={{ marginLeft: "20%", width: "80%" }}>
                    {showUserManagement && registeredUsers.map(({ img, name, position, socials }) => (
                        <div key={name} className="flex items-center bg-white rounded-lg overflow-hidden shadow-md">
                            <img src={img} alt={name} className="w-24 h-24 object-cover object-center" />
                            <div className="flex-grow p-4">
                                <h3 className="text-lg font-semibold mb-2">{name}</h3>
                                <p className="text-gray-600 mb-2">{position}</p>
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => handleShowModal({ img, name, position, socials })}
                                        className="text-blue-500 hover:underline focus:outline-none"
                                    >
                                        Ver Datos
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(name)}
                                        className="text-red-500 hover:underline focus:outline-none"
                                    >
                                        Eliminar este usuario
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showDeletedPosts && (
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4 text-center">Publicaciones Rechazadas</h2>
                        <div className="deleted-posts-container">
                            <div className="deleted-post">
                                <div className="post-info">
                                    <h3>Nombre de Usuario</h3>
                                    <p>ID: 123456</p>
                                </div>
                            </div>
                            <div className="deleted-post">
                                <div className="post-info">
                                    <h3>Nombre de Usuario</h3>
                                    <p>ID: 789012</p>
                                </div>
                            </div>
                            <div className="deleted-post">
                                <div className="post-info">
                                    <h3>Nombre de Usuario</h3>
                                    <p>ID: 345678</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showAcceptedPosts && (
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4 text-center">Publicaciones Aceptadas</h2>
                        <div className="flex justify-center mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Buscar por nombre..."
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>
                        <div className="accepted-posts-container">
                            <div className="accepted-post">
                                <img src="/placeholder-image.jpg" alt="Publicacion" className="accepted-post-image" />
                                <div className="accepted-post-info">
                                    <h3>Nombre de Usuario</h3>
                                    <p>ID: 123456</p>
                                    <p>Post:</p>
                                </div>
                                <button className="view-details-button">Ver detalles</button>
                            </div>
                            <div className="accepted-post">
                                <img src="/placeholder-image.jpg" alt="Publicacion" className="accepted-post-image" />
                                <div className="accepted-post-info">
                                    <h3>Nombre de Usuario</h3>
                                    <p>ID: 789012</p>
                                    <p>Post:</p>
                                </div>
                                <button className="view-details-button">Ver detalles</button>
                            </div>
                            <div className="accepted-post">
                                <img src="/placeholder-image.jpg" alt="Publicacion" className="accepted-post-image" />
                                <div className="accepted-post-info">
                                    <h3>Nombre de Usuario</h3>
                                    <p>ID: 345678</p>
                                    <p>Post:</p>
                                </div>
                                <button className="view-details-button">Ver detalles</button>
                            </div>
                        </div>
                    </div>
                )}

{showPublications && (
    <div className="mt-8 grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg overflow-hidden shadow-md publication-card flex">
            <div className="relative w-1/3">
                <img src="/placeholder-image.jpg" alt="Placeholder" className="w-full h-40 object-cover object-center" />
                <div className="absolute top-0 right-0 bg-yellow-500 px-2 py-1 rounded-bl-lg">
                    <span className="text-white font-semibold">NUEVO</span>
                </div>
            </div>
            <div className="p-4 w-2/3">
                <h3 className="text-lg font-semibold mb-2">Título de la Publicación</h3>
                <p className="text-gray-600 mb-2">Contenido de la publicación.</p>
                <div className="flex justify-between items-center">
                    <button className="text-blue-500 hover:underline focus:outline-none">
                        Ver Detalles
                    </button>
                    <div>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2">
                            Aceptar
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                            Rechazar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-md publication-card flex">
            <div className="relative w-1/3">
                <img src="/placeholder-image.jpg" alt="Placeholder" className="w-full h-40 object-cover object-center" />
                <div className="absolute top-0 right-0 bg-yellow-500 px-2 py-1 rounded-bl-lg">
                    <span className="text-white font-semibold">NUEVO</span>
                </div>
            </div>
            <div className="p-4 w-2/3">
                <h3 className="text-lg font-semibold mb-2">Título de la Publicación</h3>
                <p className="text-gray-600 mb-2">Contenido de la publicación.</p>
                <div className="flex justify-between items-center">
                    <button className="text-blue-500 hover:underline focus:outline-none">
                        Ver Detalles
                    </button>
                    <div>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2">
                            Aceptar
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                            Rechazar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {/* Agrega más publicaciones aquí si es necesario */}
    </div>
)}



            </section>

            {showModal && (
                <Modal
                    cerrarModal={() => setShowModal(false)}
                    img={selectedMember.img}
                    name={selectedMember.name}
                    position={selectedMember.position}
                    socials={selectedMember.socials}
                >
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleAcceptUser}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mr-2"
                        >
                            Aceptar
                        </button>
                        <button
                            onClick={handleDeleteUser}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                        >
                            Eliminar
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Admin;