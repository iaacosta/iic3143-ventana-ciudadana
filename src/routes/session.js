const KoaRouter = require('koa-router');
const sendUpdateEmail = require('../mailers/update');

const router = new KoaRouter();

router.get('/', async ctx => {
  if (ctx.session.user) ctx.redirect('/');
  else await ctx.render('login', { user: null });
});

router.post('/', async ctx => {
  if (!ctx.session.isNew) ctx.redirect('/');

  try {
    const { username, password } = ctx.request.body;
    const user = await ctx.orm.User.authenticate(username, password);
    ctx.session.user = user;
    sendUpdateEmail(ctx, {user});
    ctx.redirect('/');
  } catch ({ message }) {
    ctx.session = null;
    if (message) ctx.status = 401;
    else ctx.status = 500;
  }
});

router.delete('/', ctx => {
  ctx.session = null;
  ctx.body = { success: true };
  ctx.status = 303;
  if (!ctx.request.path === '/') ctx.redirect('back');
});

module.exports = router;
