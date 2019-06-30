const KoaRouter = require('koa-router');
const dayjs = require('dayjs');
const sendUpdateEmail = require('../mailers/update');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const senador = await ctx.orm.Senador.findOne({ where: { id } });
  ctx.assert(senador, 404);
  ctx.state.senador = senador;
  return next();
});

router.get('senadores-show', '/:id', async ctx => {
  const { Senador, Comition, Assistance, Sequelize } = ctx.orm;

  /* Projects */
  const { senador } = ctx.state;
  const proyectos = await senador.getProyectos({
    order: [['fecha', 'DESC']],
  });

  /* Comitions */
  const comitions = (await Senador.findAll({
    include: {
      model: Comition,
      attributes: ['nombre'],
    },
    where: { id: senador.get('id') },
    attributes: [],
  }))[0]
    .get('Comitions')
    .map(com => com.get('nombre'));

  /* Assistances  */
  let assistances = await Assistance.findAll({
    group: ['sid'],
    include: { model: Senador, attributes: [], where: { id: senador.get('id') } },
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('asistencias')), 'total_asistencias'],
      [Sequelize.fn('SUM', Sequelize.col('inasistencias_just')), 'total_inasistencias'],
      [Sequelize.fn('SUM', Sequelize.col('inasistencias_no_just')), 'total_justif'],
    ],
  });

  if (assistances.length > 0) {
    assistances = assistances[0].dataValues;
    // eslint-disable-next-line no-return-assign
    Object.keys(assistances).forEach(key => (assistances[key] = +assistances[key]));
  } else {
    assistances = {};
  }

  /* Following */
  const userId = ctx.session.user ? ctx.session.user.id : null;
  const isFollowed = await senador.hasFollower(userId);
  const followers = await senador.getFollowers();

  return ctx.render('senadores/show', {
    senador,
    comitions,
    assistances,
    proyectos: proyectos.map(proyecto => ({
      ...proyecto.dataValues,
      fecha: dayjs(proyecto.fecha).format('DD, MMM YYYY'),
    })),
    user: ctx.session ? ctx.session.user : null,
    followSenador: userId
      ? ctx.router.url('follow-senador', {
          id: senador.id,
          user_id: userId,
        })
      : null,
    isFollowed,
    followers,
  });
});

router.post('follow-senador', '/:id/add_follower/:user_id', async ctx => {
  ctx.assert(ctx.session.user, 401);
  try {
    const { user } = ctx.session;
    const { senador } = ctx.state;
    await senador.addFollower(user.id);
    return await ctx.redirect(ctx.router.url('senadores-show', senador.id));
  } catch (error) {
    throw error;
  }
});

router.delete('unfollow-senador', '/:id/add_follower/:user_id', async ctx => {
  ctx.assert(ctx.session.user, 401);
  try {
    const { user } = ctx.session;
    const { senador } = ctx.state;
    await senador.removeFollower(user.id);
    return await ctx.redirect(ctx.router.url('senadores-show', senador.id));
  } catch (error) {
    throw error;
  }
});

router.post('update-followers', '/:id/update_followers', async ctx => {
  const { senador } = ctx.state;
  const followers = await senador.getFollowers();
  followers.forEach(follower => {
    sendUpdateEmail(ctx, {
      follower,
      senador,
      SenadorPath: `https://${ctx.host}${ctx.router.url('senadores-show', { id: senador.id })}`,
    });
  });
});

module.exports = router;
