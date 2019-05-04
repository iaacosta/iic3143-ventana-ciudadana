import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/Index';
import Aprobados from './components/Aprobados';

const indexAppContainer = document.getElementById('index-app');
if (indexAppContainer) {
  ReactDOM.render(<Index />, indexAppContainer);
} 

const proyectosAprobadosContainer = document.getElementById('proyectos-aprobados-react');
if (proyectosAprobadosContainer) {
  ReactDOM.render(<Aprobados />, proyectosAprobadosContainer);
}
