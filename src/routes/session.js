const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.post('/', async ctx => {
  if (!ctx.session.isNew) ctx.redirect('/');

  try {
    const { username, password } = JSON.parse(ctx.request.body);
    const id = await ctx.orm.User.authenticate(username, password);
    ctx.session.id = id;
    ctx.redirect('/');
  } catch ({ message }) {
    ctx.session = null;
    if (message) ctx.status = 401;
    else ctx.status = 500;
  }
});

router.delete('/', async ctx => {
  ctx.session = null;
  ctx.redirect('/');
});

module.exports = router;
