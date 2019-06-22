const KoaRouter = require('koa-router');
const dayjs = require('dayjs');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const senador = await ctx.orm.Senador.findOne({
    where: { id: ctx.params.id },
  });
  ctx.assert(senador, 404);
  ctx.state.senador = senador;
  return next();
});

router.get('senadores-show', '/:id', async ctx => {
  const { senador } = ctx.state;
  const proyectos = await senador.getProyectos({
    order: [['fecha', 'DESC']],
  });

  const { Senador, Comition } = ctx.orm;
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

  return ctx.render('senadores/show', {
    senador,
    comitions,
    proyectos: proyectos.map(proyecto => ({
      ...proyecto.dataValues,
      fecha: dayjs(proyecto.fecha).format('DD, MMM YYYY'),
    })),
    user: ctx.session ? ctx.session.user : null,
  });
});

module.exports = router;
