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

  /* Aqui creo un diccionario/objeto de la forma { partido1: total, partido2: total } */
  const partidos = (await ctx.orm.sequelize.query(query))[0].reduce(
    // eslint-disable-next-line camelcase
    (accum, { partido_politico, count }) =>
      Object.assign(accum, { [partido_politico]: parseInt(count, 10) }),
    {},
  );

  /* const senadoresId = await ctx.orm.SenatorComition.findAll({;
    where: {
      cid: ctx.params.id,
    },
  });
  const proyectosId = await ctx.orm.ProjectComition.findAll({
    where: {
      cid: ctx.params.id,
    },
  });

  // Ahora a buscar la info particular de senadores y proyectos
  const senadores = [];
  const fotos = [];
  const partidos = {};
  const partidosPorcentajes = [];

  for (let i = 0; i < senadoresId.length; i += 1) {
    const sen = await ctx.orm.Senador.findOne({
      where: {
        id: senadoresId[i].sid,
      },
    });

    if (sen.url_foto == null)
      fotos.push(
        'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png',
      );
    else fotos.push(sen.url_foto);
    senadores.push(sen);

    // Calcular porcentaje de partidos
    if (sen.partido_politico != null) {
      if (!(sen.partido_politico in partidos)) {
        partidos[sen.partido_politico] = 1;
      } else {
        partidos[sen.partido_politico] = 1 + partidos[sen.partido_politico];
      }
    }
  }

  partidos_nombre = Object.keys(partidos);

  var partidos_cantidad = [];
  for (i = 0; i < partidos_nombre.length; i ++) {
    const cant = partidos[partidos_nombre[i]];
    partidos_cantidad.push(cant);
  }

  partidos_cantidad = JSON.strinfigy(partidos_cantidad);

  for (i = 0; i < partidos_nombre.length; i++) {
    const total = partidos_nombre.length;
    porcentaje = partidos[partidos_nombre[i]] / total;
    porcentaje = porcentaje * 100;
    partidos_porcentajes.push(porcentaje);
  }

  var proyectos = [];
  for (i = 0; i < proyectos_id.length; i++) {
    const proy = await ctx.orm.Proyecto.findOne({
      where: {
        id: proyectosId[i].pid,
      },
      order: [['fecha', 'DESC']],
    });
    proyectos.push(proy);
  } */

  await ctx.render('comitions/show', {
    comition,
    senadores,
    proyectos,
    partidos,
    user: ctx.session ? ctx.session.user : null,
  });
});

module.exports = router;
