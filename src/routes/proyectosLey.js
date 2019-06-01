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

router.get('proyectos-ley', '/show-comition/:com_id', async ctx => {
  let { page } = ctx.request.query;
  if (!ctx.request.query.page) page = 0;

  const com = await ctx.orm.Comition.findOne({
    where: { id: ctx.params.com_id },
  });

  if (!com) {
    ctx.status = 404;
    return;
  }

  const comition = com.nombre;
  const comId = com.id;

  const include = {
    model: ctx.orm.Comition,
    where: { id: comId },
    attributes: [],
    through: { attributes: [] },
  };

  const proys = await ctx.orm.Proyecto.findAll({
    include,
    order: [['fecha', 'DESC']],
    ...paginate(page, 15),
  });

  const todosProy = await ctx.orm.ProjectComition.findAll({
    attributes: [[ctx.orm.Sequelize.fn('count', ctx.orm.Sequelize.col('cid')), 'total']],
    where: { cid: ctx.params.com_id },
  });

  const fechas = [];
  const cont = parseInt(todosProy[0].dataValues.total, 10);

  for (let i = 0; i < proys.length; i += 1) {
    const proyecto = proys[i];
    const date = dayjs(proyecto.fecha);
    fechas.push(date.format('DD, MMM YYYY'));
  }

  await ctx.render('proyectos-ley/show-comition', {
    proys,
    fechas,
    cont,
    comition,
    com_id: comId,
    currPage: parseInt(page, 10) + 1,
    user: ctx.session ? ctx.session.user : null,
  });
});

module.exports = router;
