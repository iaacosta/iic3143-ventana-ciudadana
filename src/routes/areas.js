const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('areas', '/', async ctx => {
  const areas = await ctx.orm.Area.findAll({
    attributes: ['id', 'name'],
  });

  await ctx.render('proyectos-ley/areas', {
    user: ctx.session ? ctx.session.user : null,
    areas,
  });
});

module.exports = router;
