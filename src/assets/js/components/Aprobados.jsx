import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchData = async () => {
  const { data: { proyectos } } = await axios.get('/proyectos-ley/api/aprobados');
  return proyectos;
};

const Aprobados = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    fetchData()
      .then(res => setProyectos(res))
      .catch(() => null);
  }, []);

  console.log(proyectos);
  return (
    <h2>Proyectos aprobados</h2>
  );
};

export default Aprobados;
