const Router = require('koa-router');
const {
  Senador
} = require('../sequelize');

const senadorRouter = new Router();

senadorRouter.get('/senador', async ctx => {
  const senador = await Senador.findOne({
    where: {
      nombre: 'Andrés'
    }
  })
  ctx.body = {
    nombreCompleto: `${senador.get('nombre')} ${senador.get('apellido_paterno')}`,
    partido: senador.get('partido_politico'),
    email: senador.get('email'),
  };
});

module.exports = senadorRouter;
