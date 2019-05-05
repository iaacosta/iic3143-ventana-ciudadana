import React from 'react';

const ProyectoLey = ({ boletin, resumen }) => (
  <li className="ley-item">
    <p className="ley-item__boletin">{boletin}</p>
    <p className="ley-item__resumen">
      {resumen.length > 80 ? `${resumen.slice(0, 80)}...` : resumen}
    </p>
    <a href={`/proyectos-ley/${boletin}`} className="ley-item__url">
      <i className="fas fa-external-link-alt" />
    </a>
  </li>
);

export default ProyectoLey;
