const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const senador = await ctx.orm.Senador.findById(ctx.params.id);
  ctx.assert(senador, 404);
  ctx.state.senador = senador;
  return next();
});

router.get('senadores-show', '/:id', async (ctx) => {
  const senador = ctx.state.senador;
  const proyectos = await senador.getProyectos();
  return await ctx.render(
    'senadores/show',
    {
      senador,
      proyectos,
    }
  )
});

module.exports = router;
