const KoaRouter = require('koa-router');
const dayjs = require('dayjs');

const router = new KoaRouter();

router.get('/', async ctx => {
  const lastUpdate = await ctx.orm.Update.max('createdAt');
  let diff = Math.abs(dayjs(lastUpdate).diff(dayjs(), 'hour'));
  let suffix = diff > 1 ? 'horas' : 'hora';

  if (diff > 24) {
    diff = Math.abs(dayjs(lastUpdate).diff(dayjs(), 'day'));
    suffix = diff > 1 ? 'días' : 'día';
  } else if (diff < 0) {
    diff = '';
    suffix = 'unos instantes';
  }

  await ctx.render('index', { tiempo: `${diff} ${suffix}` });
});

module.exports = router;
