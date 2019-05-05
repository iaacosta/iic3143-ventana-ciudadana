const KoaRouter = require('koa-router');
const fakeData = require('../assets/fakeData/proyectosLey.json');

const router = new KoaRouter();

router.get('aprobados', '/', async (ctx) => {
  await ctx.render('proyectos-ley/index');
});

router.get('api-aprobados', '/aprobados', async (ctx) => {
  ctx.body = {
    proyectos: fakeData,
  };
});

module.exports = router;
