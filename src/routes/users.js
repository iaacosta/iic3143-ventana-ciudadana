const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('user.profile', '/', async ctx => {
  ctx.assert(ctx.session.user, 401);

  const { User } = ctx.orm;
  const user = await User.findAll({ where: { id: ctx.session.user.id } });
  await ctx.render('users/profile', {
    userObject: user[0].dataValues,
    user: ctx.session ? ctx.session.user : null,
  });
});

module.exports = router;
