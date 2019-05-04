import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/Index';
import Aprobados from './components/Aprobados';

const indexAppContainer = document.getElementById('index-app');
const proyectosAprobadosContainer = document.getElementById('proyectos-aprobados-react');

if (indexAppContainer) {
  ReactDOM.render(<Index />, indexAppContainer);
} else if (proyectosAprobadosContainer) {
  ReactDOM.render(<Aprobados />, proyectosAprobadosContainer);
}
