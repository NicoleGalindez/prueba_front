import React from 'react';

const Modal = ({ data, cerrarModal }) => {
  return (
    <div className="modal">
      <div className="modal-contenido">
        <img src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg" alt={data.data} style={{ maxWidth: '200px' }} /> {/* Establecer el maxWidth según tus preferencias */}
        <h2><span className="font-bold my-1">Nombre: </span>{data.nombres} {data.apellidos}</h2>
        <p><span className="font-bold my-1">Rol: </span>{data.rol}</p>
        <p><span className="font-bold my-1">Telefono: </span>{data.telefono}</p>
        <p><span className="font-bold my-1">Correo: </span>{data.email}</p>
        <p className="font-bold my-1">{data.tipoIdentificacion}</p>
        <p><span className="font-bold my-1">Identificacion: </span>{data.numerodeIdentificacion}</p>
        <button onClick={cerrarModal} className="modal-cerrar">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
