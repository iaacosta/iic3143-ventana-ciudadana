import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';

import CifrasBox from './CifrasBox/CifrasBox';
import ScrollList from '../ScrollList/ScrollList';
import ProyectoLey from './ProyectoLey/ProyectoLey';

export const mapProyectoDeLey = ({ id, boletin, resumen }) => (
  <ProyectoLey boletin={boletin} resumen={resumen} url={`/proyectos-ley/${id}`} key={uuid()} />
);

class Aprobados extends Component {
  state = {
    proyectos: [],
  };

  componentDidMount() {
    this.busy = this.fetchProyectos();
  }

  fetchProyectos = async () => {
    const {
      data: { proyectos },
    } = await axios.get('/proyectos-ley/aprobados');
    this.setState({ proyectos });
  };

  busy;

  render() {
    const { proyectos } = this.state;

    const aprobados = proyectos.filter(({ estado }) => estado === 'aprobado');
    const tramitacion = proyectos.filter(({ estado }) => estado === 'tramitacion');
    const suspendidos = proyectos.filter(({ estado }) => estado === 'suspendido');
    const rechazados = proyectos.filter(({ estado }) => estado === 'rechazado');

    return (
      <div className="detalle-aprobados">
        <CifrasBox
          cifra={aprobados.length}
          label="Proyectos aprobados"
          estado="aprobado"
        />
        <CifrasBox
          cifra={tramitacion.length}
          label="Proyectos en tramitación"
          estado="tramitacion"
        />
        <CifrasBox
          cifra={suspendidos.length}
          label="Proyectos suspendidos"
          estado="suspendidos"
        />
        <CifrasBox
          cifra={rechazados.length}
          label="Proyectos rechazados"
          estado="rechazado"
        />
        <ScrollList items={aprobados} mapFn={mapProyectoDeLey} />
        <ScrollList items={tramitacion} mapFn={mapProyectoDeLey} />
        <ScrollList items={suspendidos} mapFn={mapProyectoDeLey} />
        <ScrollList items={rechazados} mapFn={mapProyectoDeLey} />
      </div>
    );
  }
}

export default Aprobados;
