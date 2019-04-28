const Router = require('koa-router');

const mainRouter = new Router();

mainRouter.get('/main', async ctx => {
  ctx.body = {
    message: 'Ventana ciudadana'
  };
});

module.exports = mainRouter;
