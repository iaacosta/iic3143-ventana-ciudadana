import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/Index/Index';
import ProyectosAprobados from './components/Aprobados/Aprobados';
import Dropdown from './components/Dropdown/Dropdown';

const indexAppContainer = document.getElementById('index-app');
if (indexAppContainer) {
  ReactDOM.render(<Index />, indexAppContainer);
}

const proyectosAprobadosContainer = document.getElementById('proyectos-aprobados-react');
if (proyectosAprobadosContainer) {
  ReactDOM.render(<ProyectosAprobados />, proyectosAprobadosContainer);
}

const dropdownContainer = document.getElementById('dropdown-react');
if (dropdownContainer) {
  ReactDOM.render(<Dropdown nombre={dropdownContainer.dataset.value} />, dropdownContainer);
}
