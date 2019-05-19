const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('areas', '/', async ctx => {
  await ctx.render('proyectos-ley/areas');
});

router.get('test', '/test', async ctx => {
  const data = await ctx.orm.Senador.findAll({
    include: [
      {
        model: ctx.orm.Comition,
        attributes: ['nombre', 'email'],
        through: { attributes: [] },
      },
    ],
    attributes: ['nombre', 'apellido_paterno'],
    // where: { id: 6556 },
  });

  ctx.body = data;
});

module.exports = router;
