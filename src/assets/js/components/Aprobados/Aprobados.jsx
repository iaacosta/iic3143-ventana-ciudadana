import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Cifras from './Cifras/Cifras';
import ScrollList from '../ScrollList/ScrollList';
import ProyectoLey from './ProyectoLey/ProyectoLey';

export const fetchData = async () => {
  const { data: { proyectos } } = await axios.get('/proyectos-ley/aprobados');
  return proyectos;
};

export const mapProyectoDeLey = ({ boletin, resumen, url }) => (
  <ProyectoLey boletin={boletin} resumen={resumen} url={url} />
);

export const Aprobados = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    fetchData()
      .then(res => setProyectos(res))
      .catch(() => null);
  }, []);

  const aprobados = proyectos.filter(({ aprobado }) => aprobado);
  const noAprobados = proyectos.filter(({ aprobado }) => !aprobado);

  return (
    <div className="detalle-aprobados">
      <Cifras aprobados={aprobados.length} noAprobados={noAprobados.length} />
      <ScrollList items={aprobados} height="20rem" mapFn={mapProyectoDeLey} />
      <ScrollList items={noAprobados} height="20rem" mapFn={mapProyectoDeLey} />
    </div>
  );
};

export default Aprobados;
