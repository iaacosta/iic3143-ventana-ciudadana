const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('areas', '/',async (ctx) => {
  await ctx.render('areas', { appVersion: pkg.version });
});

module.exports = router;
