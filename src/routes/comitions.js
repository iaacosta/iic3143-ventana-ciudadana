const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('comitions', '/', async ctx => {
  const coms = await ctx.orm.Comition.findAll();

  await ctx.render('comitions/index', {
    user: ctx.session ? ctx.session.user : null,
    coms,
  });
});

router.get('comitions', '/show/:id', async ctx => {
  const comition = await ctx.orm.Comition.findOne({ where: { id: ctx.params.id } });
  const include = [
    {
      model: ctx.orm.Comition,
      attributes: [],
      where: { id: ctx.params.id },
      through: { attributes: [], raw: true },
      raw: true,
    },
  ];

  const senadores = await ctx.orm.Senador.findAll({ include });
  const proyectos = await ctx.orm.Proyecto.findAll({ include });

  senadores.forEach((senador, i) => {
    if (!senador.url_foto)
      senadores[i].url_foto =
        'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png';
  });

  const query = `SELECT "partido_politico", COUNT(*) FROM "Senadors", "SenatorComitions" WHERE sid = id AND cid = ${
    comition.id
  } GROUP BY "partido_politico";`;

  const partidos = (await ctx.orm.sequelize.query(query))[0].reduce(
    // eslint-disable-next-line camelcase
    (accum, { partido_politico, count }) =>
      Object.assign(accum, { [partido_politico]: parseInt(count, 10) }),
    {},
  );
  await ctx.render('comitions/show', {
    comition,
    senadores,
    proyectos,
    partidos,
    user: ctx.session ? ctx.session.user : null,
  });
});

module.exports = router;
