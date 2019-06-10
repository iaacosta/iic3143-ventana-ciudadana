const KoaRouter = require('koa-router');
const dayjs = require('dayjs');

const { paginate } = require('../helpers');

const router = new KoaRouter();

router.get('comitions', '/', async ctx => {
  const coms = await ctx.orm.Comition.findAll();

  await ctx.render('comitions/index', {
    user: ctx.session ? ctx.session.user : null,
    coms,
  });
});

router.get('comitions', '/show/:id', async ctx => {
  const comition = await ctx.orm.Comition.findOne({
    where: { id: ctx.params.id },
  });
  const senadores_id = await ctx.orm.SenatorComition.findAll({
    where: { cid: ctx.params.id },
  });
  const proyectos_id = await ctx.orm.ProjectComition.findAll({
    where: { cid: ctx.params.id },
  });

  // Ahora a buscar la info particular de senadores y proyectos
  var senadores = [];
  var fotos = [];
  var partidos = {};
  var partidos_nombre = [];
  var partidos_porcentajes = [];

  for (i = 0; i < senadores_id.length; i++) {
    const sen = await ctx.orm.Senador.findOne({
      where: { id: senadores_id[i].sid },
    });

    if (sen.url_foto == null)
      fotos.push(
        'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png',
      );
    else fotos.push(sen.url_foto);
    senadores.push(sen);

    //Calcular porcentaje de partidos
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
      where: { id: proyectos_id[i].pid },
      order: [['fecha', 'DESC']],
    });
    proyectos.push(proy);
  }

  await ctx.render('comitions/show', {
    comition,
    senadores,
    proyectos,
    fotos,
    partidos_nombre,
    partidos_cantidad,
    partidos_porcentajes,
    user: ctx.session ? ctx.session.user : null,
  });
});

module.exports = router;
