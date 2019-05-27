const KoaRouter = require('koa-router');
const dayjs = require('dayjs');

const { paginate } = require('../helpers');

const router = new KoaRouter();


router.get('comitions', '/', async ctx => {
  const coms = await ctx.orm.Comition.findAll();


  await ctx.render('comitions/index', {
    coms,
  });
});


router.get('comitions', '/show/:id', async ctx => {
  const comition = await ctx.orm.Comition.findOne({
    where: {id: ctx.params.id},
  });
  const senadores_id = await ctx.orm.SenatorComition.findAll({
    where: {cid: ctx.params.id},
  });
  const proyectos_id = await ctx.orm.ProjectComition.findAll({
    where: {cid: ctx.params.id},
  });

  // Ahora a buscar la info particular de senadores y proyectos
  var senadores = [];
  var fotos = [];

  for (i = 0; i < senadores_id.length; i++) {
    const sen = await ctx.orm.Senador.findOne({
      where: {id: senadores_id[i].sid},
    });

    if (sen.url_foto == null)
      fotos.push(
        'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png',
      );
    else fotos.push(sen.url_foto);
    senadores.push(sen);
  }

  var proyectos = [];
  for (i = 0; i < proyectos_id.length; i++) {
    const proy = await ctx.orm.Proyecto.findOne({
      where: {id: proyectos_id[i].pid},
    });
    proyectos.push(proy);
  }


  // Ahora calcular porcentajes de partidos

  await ctx.render('comitions/show', {
    comition,
    senadores,
    proyectos,
    fotos,
  });
});







module.exports = router;
