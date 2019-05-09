import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';

import CifrasBox from './CifrasBox/CifrasBox';
import ScrollList from '../ScrollList/ScrollList';
import ProyectoLey from './ProyectoLey/ProyectoLey';

export const mapProyectoDeLey = ({ id, boletin, resumen }) => (
  <ProyectoLey
    boletin={boletin}
    resumen={resumen}
    url={`/proyectos-ley/${id}`}
    key={uuid()}
  />
);

class Aprobados extends Component {
  state = {
    cifras: {
      aprobado: 0,
      tramitacion: 0,
      suspendido: 0,
      rechazado: 0,
    },
    proyectos: {
      aprobado: [],
      tramitacion: [],
      suspendido: [],
      rechazado: [],
    },
  };

  componentDidMount() {
    this.busy = this.fetchData();
  }

  fetchData = async () => {
    await this.fetchCifras();
    await this.fetchProyectos('aprobado');
    await this.fetchProyectos('tramitacion');
    await this.fetchProyectos('suspendido');
    await this.fetchProyectos('rechazado');
  };

  fetchProyectos = async tipo => {
    const {
      data: { proyectos },
    } = await axios.get(`/proyectos-ley/proyectos?estado=${tipo}`);

    this.setState(prevState => ({
      proyectos: {
        ...prevState.proyectos,
        [tipo]: proyectos,
      },
    }));
  };

  fetchCifras = async () => {
    const {
      data: { cifras },
    } = await axios.get('/proyectos-ley/cifras');
    this.setState({ cifras });
  };

  busy;

  render() {
    const { cifras, proyectos } = this.state;

    return (
      <div className="detalle-aprobados">
        <CifrasBox
          cifra={cifras.aprobado}
          label="Proyectos aprobados"
          estado="aprobado"
        />
        <CifrasBox
          cifra={cifras.tramitacion}
          label="Proyectos en tramitación"
          estado="tramitacion"
        />
        <CifrasBox
          cifra={cifras.suspendido}
          label="Proyectos suspendidos"
          estado="suspendido"
        />
        <CifrasBox
          cifra={cifras.rechazado}
          label="Proyectos rechazados"
          estado="rechazado"
        />
        <ScrollList items={proyectos.aprobado} mapFn={mapProyectoDeLey} />
        <ScrollList items={proyectos.tramitacion} mapFn={mapProyectoDeLey} />
        <ScrollList items={proyectos.suspendido} mapFn={mapProyectoDeLey} />
        <ScrollList items={proyectos.rechazado} mapFn={mapProyectoDeLey} />
      </div>
    );
  }
}

export default Aprobados;
