const KoaRouter = require('koa-router');
const { Proyecto, SenadorProyecto, Senador, Sequelize } = require('../models');

const { paginate } = require('../helpers');

const router = new KoaRouter();

router.get('proyectos', '/', async ctx => {
  await ctx.render('proyectos-ley/index');
});

router.get('proyectos_cifras', '/cifras', async ctx => {
  const cifras = await Proyecto.findAll({
    group: ['estado'],
    attributes: ['estado', [Sequelize.fn('count', Sequelize.col('estado')), 'total']],
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

  const proyectos = await Proyecto.findAll({
    ...paginate(parseInt(page, 10), 20),
    where: { estado },
    order: [['fecha', 'DESC']],
  });

  ctx.body = {
    proyectos,
  };
});

router.get('proyectos-ley', '/show/:id', async ctx => {
  const proy = await Proyecto.findOne({
    where: { id: ctx.params.id },
  });

  const date = proy.fecha;
  const string = date.toString();
  const fecha = string.substr(4, 11);

  const resumen = proy.resumen ? proy.resumen : 'Este proyecto no tiene descripcion';

  const senadoresId = await SenadorProyecto.findAll({
    where: { pid: proy.id },
  });
  const senadores = [];
  const fotos = [];

  for (let i = 0; i < senadoresId.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const senador = await Senador.findOne({
      where: { id: senadoresId[i].sid },
    });

    if (senador.url_foto == null)
      fotos.push(
        'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png',
      );
    else fotos.push(senador.url_foto);

    senadores.push(senador);
  }

  await ctx.render('proyectos-ley/show', {
    fotos,
    proy,
    fecha,
    senadores,
    resumen,
  });
});

router.get('proyectos-ley', '/show-estado/:estado', async ctx => {
  let { page } = ctx.request.query;
  if (!ctx.request.query.page) page = 0;

  const proys = await Proyecto.findAll({
    where: { estado: ctx.params.estado },
    order: [['fecha', 'DESC']],
    ...paginate(page, 15),
  });

  const todosProy = await Proyecto.findAll({
    attributes: [[ctx.orm.Sequelize.fn('count', ctx.orm.Sequelize.col('id')), 'total']],
    where: { estado: ctx.params.estado },
  });

  const fechas = [];
  const cont = parseInt(todosProy[0].dataValues.total, 10);
  const { estado } = ctx.params;

  for (let i = 0; i < proys.length; i += 1) {
    const proyecto = proys[i];
    const date = proyecto.fecha;
    const string = date.toString();
    const fecha = string.substr(4, 11);

    fechas.push(fecha);
  }

  await ctx.render('proyectos-ley/show-estado', {
    proys,
    fechas,
    cont,
    estado,
    currPage: parseInt(page, 10) + 1,
  });
});

module.exports = router;
