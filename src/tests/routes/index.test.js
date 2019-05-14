const request = require('supertest');
const $ = require('jquery');
const dayjs = require('dayjs');

const { init } = require('../../../index');
const { Update } = require('../../models');

describe('proyectos de ley / ruta', () => {
  let server;

  beforeAll(async () => {
    server = await init(4001);
  });

  afterEach(async () => {
    await Update.destroy({ where: {}, truncate: true });
  });

  test('/ debe responder con statusCode 200', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  });

  test('/ debe mostrar que la actualización fue hace 1 hora', async () => {
    await Update.create({ createdAt: dayjs().subtract(1, 'hour') });

    const response = await request(server).get('/');
    document.body.innerHTML = response.text;
    expect($('.updates__value').text()).toBe('hace 1 hora');
  });

  test('/ si la actualización fue hace menos de una hora, debe mostrar minutos', async () => {
    await Update.create({ createdAt: dayjs().subtract(30, 'minute') });

    const response = await request(server).get('/');
    document.body.innerHTML = response.text;
    expect($('.updates__value').text()).toBe('hace 30 minutos');
  });

  test('/ si la actualización fue hace mas de una hora, debe mostrar horas en plural', async () => {
    await Update.create({ createdAt: dayjs().subtract(2, 'hour') });

    const response = await request(server).get('/');
    document.body.innerHTML = response.text;
    expect($('.updates__value').text()).toBe('hace 2 horas');
  });

  test('/ si la actualización fue hace menos de un minuto, debe mostrar hace unos instantes', async () => {
    await Update.create({ createdAt: dayjs().subtract(1, 'second') });

    const response = await request(server).get('/');
    document.body.innerHTML = response.text;
    expect($('.updates__value').text()).toBe('hace  unos instantes');
  });
});
