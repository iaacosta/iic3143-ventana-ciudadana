const KoaRouter = require('koa-router');
const dayjs = require('dayjs');

const router = new KoaRouter();

router.get('/', async ctx => {
  let diff;
  let suffix;

  const lastUpdate = await ctx.orm.Update.max('createdAt');
  if (lastUpdate) {
    const diffFactory = unit => Math.abs(dayjs(lastUpdate).diff(dayjs(), unit));
    diff = diffFactory('hour');
    suffix = diff !== 1 ? 'horas' : 'hora';

    if (diff > 24) {
      diff = diffFactory('day');
      suffix = diff !== 1 ? 'días' : 'día';
    } else if (diff < 1) {
      diff = diffFactory('minute');
      suffix = diff !== 1 ? 'minutos' : 'minuto';
    }

    if (diff === 0 && suffix === 'minutos') {
      diff = '';
      suffix = 'unos instantes';
    }
  } else {
    diff = '2';
    suffix = 'dias';
  }

  await ctx.render('index', {
    tiempo: `${diff} ${suffix}`,
    user: ctx.session ? ctx.session.user : null,
  });
});

module.exports = router;
