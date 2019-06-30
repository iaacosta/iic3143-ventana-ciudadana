/* eslint-disable consistent-return */
const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('user.profile', '/', async ctx => {
  if (!ctx.session.user) return ctx.redirect('/');

  const { User } = ctx.orm;
  const user = await User.findOne({ where: { id: ctx.session.user.id } });
  const followees = await user.getFollowees();

  await ctx.render('users/profile', {
    userObject: user.dataValues,
    followees,
    user: ctx.session ? ctx.session.user : null,
  });
});

module.exports = router;
