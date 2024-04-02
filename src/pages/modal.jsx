import React from 'react';

const Modal = ({ img, name, position, socials, cerrarModal }) => {
  return (
    <div className="modal">
      <div className="modal-contenido">
        {/* Aplicar estilos directamente a la imagen */}
        <img src={img} alt={name} style={{ maxWidth: '200px' }} /> {/* Establecer el maxWidth según tus preferencias */}
        <h2>{name}</h2>
        <p>{position}</p>
        {/* Renderizar información adicional aquí */}
        <ul>
          {socials.map((social, index) => (
            <li key={index}>
              <a href={social.url}>{social.name}</a>
            </li>
          ))}
        </ul>
        <button onClick={cerrarModal} className="modal-cerrar">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
