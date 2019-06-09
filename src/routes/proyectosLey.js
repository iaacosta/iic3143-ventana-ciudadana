const KoaRouter = require('koa-router');
const dayjs = require('dayjs');

const { paginate } = require('../helpers');

const router = new KoaRouter();

router.get('proyectos', '/', async ctx => {
  await ctx.render('proyectos-ley/index', {
    user: ctx.session ? ctx.session.user : null,
  });
});

router.get('proyectos_cifras', '/cifras', async ctx => {
  const cifras = await ctx.orm.Proyecto.findAll({
    group: ['estado'],
    attributes: [
      'estado',
      [ctx.orm.Sequelize.fn('count', ctx.orm.Sequelize.col('estado')), 'total'],
    ],
  });

  const parsedCifras = cifras.reduce(
    (accum, { dataValues }) =>
      Object.assign(accum, { [dataValues.estado]: parseInt(dataValues.total, 10) }),
    {},
  );

  ctx.body = {
    cifras: parsedCifras,
  };
});

router.get('proyectos_por_estado', '/proyectos', async ctx => {
  let { page } = ctx.request.query;
  const { estado } = ctx.request.query;

  if (!page) page = 0;
  if (!estado) {
    ctx.status = 404;
    return;
  }

  const proyectos = await ctx.orm.Proyecto.findAll({
    ...paginate(parseInt(page, 10), 20),
    where: { estado },
    order: [['fecha', 'DESC']],
  });

  ctx.body = {
    proyectos,
  };
});

router.get('proyectos-ley', '/show/:id', async ctx => {
  const proy = await ctx.orm.Proyecto.findOne({
    where: { id: ctx.params.id },
  });

  const date = proy.fecha;
  const string = date.toString();
  const fecha = string.substr(4, 11);

  const resumen = proy.resumen ? proy.resumen : 'Este proyecto no tiene descripcion';

  const senadoresId = await ctx.orm.SenadorProyecto.findAll({
    where: { pid: proy.id },
  });
  const senadores = [];
  const fotos = [];

  for (let i = 0; i < senadoresId.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const senador = await ctx.orm.Senador.findOne({
      where: { id: senadoresId[i].sid },
    });

    if (senador.url_foto == null)
      fotos.push(
        'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png',
      );
    else fotos.push(senador.url_foto);

    senadores.push(senador);
  }

  const comId = await ctx.orm.ProjectComition.findOne({
    where: { pid: proy.id },
  });
  const comition = await ctx.orm.Comition.findOne({
    where: { id: comId.cid },
  });

  await ctx.render('proyectos-ley/show', {
    fotos,
    proy,
    fecha,
    senadores,
    resumen,
    comition,
    user: ctx.session ? ctx.session.user : null,
  });
});

router.get('proyectos-ley', '/show-area/:aid', async ctx => {
  let { page } = ctx.request.query;
  if (!ctx.request.query.page) page = 0;

  const area = await ctx.orm.Area.findOne({
    where: { id: ctx.params.aid },
  });

  if (!area) {
    ctx.status = 404;
    return;
  }

  const nombreArea = area.name;
  const aid = area.id;

  const include = [
    {
      model: ctx.orm.Comition,
      attributes: [],
      include: [
        {
          model: ctx.orm.Area,
          where: { id: aid },
          attributes: [],
          through: { attributes: [] },
        },
      ],
      through: { attributes: [] },
    },
  ];

  const proys = await ctx.orm.Proyecto.findAll({
    include,
    order: [['fecha', 'DESC']],
    ...paginate(page, 15),
  });

  const allProjects = await ctx.orm.sequelize.query(
    `SELECT COUNT(*) FROM "Proyectos", "ProjectComitions", "Comitions", "AreaComitions", "Areas"WHERE aid = ${aid} AND "AreaComitions".aid = "Areas".id  AND "AreaComitions".cid = "Comitions".id  AND "ProjectComitions".cid = "Comitions".id  AND "ProjectComitions".pid = "Proyectos".id;`,
  );

  const cant = allProjects[0][0].count;
  console.log(nombreArea);

  const fechas = [];
  for (let i = 0; i < proys.length; i += 1) {
    const proyecto = proys[i];
    const date = dayjs(proyecto.fecha);
    fechas.push(date.format('DD, MMM YYYY'));
  }

  await ctx.render('proyectos-ley/show-area', {
    proys,
    fechas,
    cant,
    nombreArea,
    aid,
    currPage: parseInt(page, 10) + 1,
    user: ctx.session ? ctx.session.user : null,
  });
});

module.exports = router;
