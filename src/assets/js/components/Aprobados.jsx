import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchData = async () => {
  const { data: { proyectos } } = await axios.get('/proyectos-ley/aprobados');
  return proyectos;
};

const Aprobados = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    fetchData()
      .then(res => setProyectos(res))
      .catch(() => null);
  }, []);

  const totalAprobados = proyectos.reduce((ac, { aprobado }) => (aprobado ? ac + 1 : ac), 0);
  const totalNoAprobados = proyectos.length - totalAprobados;

  return (
    <div className="detalle-aprobados">
      <div className="detalle-aprobados__box">
        <p className="detalle-aprobados__cifra detalle-aprobados__cifra--aprobado">{totalAprobados}</p>
        <p className="detalle-aprobados__box-label">Proyectos aprobados</p>
      </div>
      <div className="detalle-aprobados__box">
        <p className="detalle-aprobados__cifra detalle-aprobados__cifra--no-aprobado">{totalNoAprobados}</p>
        <p className="detalle-aprobados__box-label">Proyectos no aprobados</p>
      </div>
    </div>
  );
};

export default Aprobados;
