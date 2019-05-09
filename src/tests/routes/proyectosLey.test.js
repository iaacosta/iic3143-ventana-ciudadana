const { Proyecto } = require('../../models');
const { proyectos } = require('../helpers/fakeData');
const { migrate } = require('../helpers/migration');

migrate();

describe('proyectos de ley / ruta', () => {
  beforeAll(async () => {
    await Promise.all(proyectos.map(proyecto => Proyecto.create(proyecto)));
  });

  test('debe true', async () => {
    expect(true).toBe(true);
  });
});
