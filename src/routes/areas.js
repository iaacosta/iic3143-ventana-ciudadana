const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('areas', '/', async ctx => {
  const comisiones = await ctx.orm.Comition.findAll({
    attributes: ['id', 'nombre'],
    where: { tipo: 'permanente' },
  });

  await ctx.render('proyectos-ley/areas', {
    user: ctx.session ? ctx.session.user : null,
    comisiones,
  });
});

module.exports = router;
