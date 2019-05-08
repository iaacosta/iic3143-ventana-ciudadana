const KoaRouter = require('koa-router');
const { Proyecto } = require('../models');

const router = new KoaRouter();

router.get('aprobados', '/', async ctx => {
  await ctx.render('proyectos-ley/index');
});

router.get('api-aprobados', '/aprobados', async ctx => {
  ctx.body = {
    proyectos: await Proyecto.findAll({
      attributes: ['id', 'boletin', 'resumen', 'estado'],
    }),
  };
});

module.exports = router;
