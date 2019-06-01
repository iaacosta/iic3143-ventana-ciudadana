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

  const coms_id = await ctx.orm.SenatorComition.findAll({
    where: { sid: senador.id },
  });

  var comitions = [];
  for (i = 0; i < coms_id.length; i++) {
    const com = await ctx.orm.Comition.findOne({
      where: { id: coms_id[i].cid },
    });
    if (com != null) {
      comitions.push(com);
    }
  }

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
