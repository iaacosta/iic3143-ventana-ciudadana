const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('areas', '/', async ctx => {
  await ctx.render('proyectos-ley/areas');
});

module.exports = router;
