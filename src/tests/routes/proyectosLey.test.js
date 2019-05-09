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

  test('debe devolver index', async () => {
    const response = await request(server).get('/proyectos-ley');

    expect(response.status).toBe(200);
  });
});
