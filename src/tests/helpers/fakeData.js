const dayjs = require('dayjs');

const proyectos = [
  {
    boletin: '00000-1',
    resumen: 'Resumen 1 de test',
    fecha: '2010-01-01',
    estado: 'aprobado',
    url: 'http://www.test.com/0',
  },
  {
    boletin: '00000-2',
    resumen: 'Resumen 2 de test',
    fecha: '2010-01-02',
    estado: 'rechazado',
    url: 'http://www.test.com/1',
  },
  {
    boletin: '00000-3',
    resumen: 'Resumen 3 de test',
    fecha: '2010-01-03',
    estado: 'suspendido',
    url: 'http://www.test.com/2',
  },
  {
    boletin: '00000-4',
    resumen: 'Resumen 4 de test',
    fecha: '2010-01-04',
    estado: 'tramitacion',
    url: 'http://www.test.com/3',
  },
];

module.exports = {
  proyectos,
};
