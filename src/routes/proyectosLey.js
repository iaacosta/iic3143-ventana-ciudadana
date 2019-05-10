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

router.get('proyectos-ley','/show/:id', async (ctx) => {
  console.log('hola');

  const proy = await Proyecto.findOne({
    where: { id: ctx.params.id },
  });

  const senadores_id = await SenadorProyecto.findAll({
    where: {pid: proy.id},
  })
  var senadores = [];

  for (var i = 0; i < senadores_id.length; i++) {
    const senador = await Senador.findOne({
      where: { id: senadores_id[i].sid },
    });

    senadores.push(senador);
  }

  console.log(senadores);

  await ctx.render('proyectos-ley/show', {
  proy,
  senadores,
 });
});

module.exports = router;
