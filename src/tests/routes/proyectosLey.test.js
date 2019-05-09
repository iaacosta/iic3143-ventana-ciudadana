const request = require('supertest');
const { server } = require('../../../index');

const { Proyecto } = require('../../models');
const { proyectos } = require('../helpers/fakeData');
const migration = require('../helpers/migration');

describe('proyectos de ley / ruta', () => {
  beforeAll(async () => {
    await migration.setUp();
    await Promise.all(proyectos.map(proyecto => Proyecto.create(proyecto)));
  });

  afterAll(async () => {
    await migration.cleanUp();
  });

  test('"/proyectos-ley" debe responder la con status 200', async () => {
    const response = await request(server).get('/proyectos-ley');
    expect(response.status).toBe(200);
  });

  test('"/proyectos-ley/cifras" debe responder con las cifras', async () => {
    const response = await request(server).get('/proyectos-ley/cifras');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.cifras.aprobado).toBe(1);
    expect(response.body.cifras.rechazado).toBe(1);
    expect(response.body.cifras.suspendido).toBe(1);
    expect(response.body.cifras.tramitacion).toBe(1);
  });

  test('"/proyectos-ley/proyectos?tipo=..." debe responder con los proyectos correctos', () => {
    const estados = ['aprobado', 'rechazado', 'suspendido', 'tramitacion'];

    estados.forEach(async (estado, index) => {
      const response = await request(server).get(
        `/proyectos-ley/proyectos?estado=${estado}`,
      );
      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body.proyectos[0].boletin).toBe(proyectos[index].boletin);
      expect(response.body.proyectos[0].estado).toBe(proyectos[index].estado);
      expect(response.body.proyectos[0].resumen).toBe(proyectos[index].resumen);
    });
  });
});
