const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('login', '/', async ctx => {
  if (ctx.session.user) ctx.redirect('/');
  else await ctx.render('login', { user: null, wrongCredentials: false });
});

router.post('/', async ctx => {
  if (!ctx.session.isNew) ctx.redirect('/');

  try {
    const { username, password } = ctx.request.body;
    const user = await ctx.orm.User.authenticate(username, password);
    ctx.session.user = user;
    ctx.redirect('/');
  } catch ({ message }) {
    ctx.session = null;
    if (message) {
      ctx.status = 401;
      await ctx.render('login', { user: null, wrongCredentials: true });
    } else ctx.status = 500;
  }
});

router.delete('/', ctx => {
  ctx.session = null;
  ctx.body = { success: true };
  ctx.status = 303;
  if (!ctx.request.path === '/') ctx.redirect('/');
});

module.exports = router;
