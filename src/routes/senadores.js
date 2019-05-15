const KoaRouter = require('koa-router');
const dayjs = require('dayjs');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const senador = await ctx.orm.Senador.findById(ctx.params.id);
  ctx.assert(senador, 404);
  ctx.state.senador = senador;
  return next();
});

router.get('senadores-show', '/:id', async ctx => {
  const { senador } = ctx.state;
  const proyectos = await senador.getProyectos({
    order: [['fecha', 'DESC']],
  });

  return ctx.render('senadores/show', {
    senador,
    proyectos: proyectos.map(proyecto => ({
      ...proyecto.dataValues,
      fecha: dayjs(proyecto.fecha).format('DD, MMM YYYY'),
    })),
  });
});

module.exports = router;
