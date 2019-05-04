import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Cifras from './Cifras/Cifras';

export const fetchData = async () => {
  const { data: { proyectos } } = await axios.get('/proyectos-ley/aprobados');
  return proyectos;
};

export const Aprobados = () => {
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
      <Cifras aprobados={totalAprobados} noAprobados={totalNoAprobados} />
    </div>
  );
};

export default Aprobados;
