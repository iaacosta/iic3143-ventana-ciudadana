const KoaRouter = require('koa-router');

const router = new KoaRouter();

// async function loadUser(ctx, next) {
//   ctx.state.user = await ctx.orm.user.findById(ctx.params.id);
//   return next();
// }


router.get('user.profile', '/', async (ctx) => {
  const { current_user } = ctx.state;
await ctx.render('users/profile', {
  user: ctx.session ? ctx.session.user : null,
});
});

module.exports = router;
