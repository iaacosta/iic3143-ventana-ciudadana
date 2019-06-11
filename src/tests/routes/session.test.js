const request = require('supertest');
const $ = require('jquery');
const { init } = require('../../../index');

const { User } = require('../../models');
const { users } = require('../helpers/fakeData');

describe('session / ruta', () => {
  let server;

  beforeAll(async () => {
    server = await init(4003);
    await Promise.all(users.map(user => User.create(user)));
  });

  describe('GET', () => {
    test('debe responder con status 200', async () => {
      const response = await request(server).get('/session');
      expect(response.status).toBe(200);
    });
  });

  describe('POST', () => {
    test('debe responder con status 302 si las credenciales son correctas', async () => {
      const response = await request(server)
        .post('/session')
        .send({
          username: 'cho19',
          password: 'cho19',
        });

      expect(response.status).toBe(302);
    });

    test('debe responder con status 401 si las credenciales no son correctas', async () => {
      const response = await request(server)
        .post('/session')
        .send({
          username: 'cho19',
          password: 'badPass',
        });

      expect(response.status).toBe(401);
    });

    test('debe redireccionar al index si las credenciales son correctas', async () => {
      const response = await request(server)
        .post('/session')
        .send({
          username: 'cho19',
          password: 'cho19',
        });

      expect(response.header.location).toBe('/');
    });

    test('debe setear cookies si las credenciales son correctas', async () => {
      const response = await request(server)
        .post('/session')
        .send({
          username: 'cho19',
          password: 'cho19',
        });

      expect(response.header['set-cookie']).not.toBeUndefined();
    });
  });

  describe('DELETE', () => {
    test('debe responder con status 303', async () => {
      const response = await request(server).delete('/session');
      expect(response.status).toBe(303);
    });

    test('debe borrar cookies', async () => {
      const response = await request(server).delete('/session');
      expect(response.header['set-cookie'][0].includes('koa:sess=;')).toBe(true);
    });
  });

  describe('view', () => {
    test('debe mostrar iniciar sesion en layout', async () => {
      const response = await request(server).get('/');
      document.body.innerHTML = response.text;
      expect($('.nav-items__item')[3].innerHTML).toBe('Iniciar sesión');
    });
  });
});
