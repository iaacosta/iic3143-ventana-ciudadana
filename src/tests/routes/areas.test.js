const request = require('supertest');
const $ = require('jquery');

const { init } = require('../../../index');
const { Comition } = require('../../models');

describe('areas / ruta', () => {
  let server;
  const testComision = {
    nombre: 'test name',
    tipo: 'permanente',
    email: 'test@test.com',
    telefono: 'test',
  };

  beforeAll(async () => {
    server = await init(4002);
  });

  afterEach(async () => {
    await Comition.destroy({ where: {}, truncate: true });
  });

  test('/areas debe responder con statusCode 200', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  });

  test('/areas debe mostrar el nombre de la comisión', async () => {
    const com = await Comition.create(testComision);
    const response = await request(server).get('/areas');
    document.body.innerHTML = response.text;
    expect($('.areas__link h3').text()).toBe(com.get('nombre'));
  });

  test('/areas debe mostrar el path de imagen de la comisión', async () => {
    const com = await Comition.create(testComision);
    const response = await request(server).get('/areas');
    document.body.innerHTML = response.text;
    expect($('.areas__link img').attr('src')).toContain(`area${com.get('id')}.png`);
  });

  test('/areas debe mostrar multiples nombres', async () => {
    await Comition.create(testComision);
    await Comition.create({ ...testComision, nombre: 'test name 2' });
    const response = await request(server).get('/areas');
    document.body.innerHTML = response.text;
    expect($('.areas__link').length).toBe(2);
  });
});
