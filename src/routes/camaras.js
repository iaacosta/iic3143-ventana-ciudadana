const KoaRouter = require('koa-router');
const pkg = require('../../package.json');
const { Senador, Sequelize, Periodo } = require('../models');
const Op = Sequelize.Op;

const router = new KoaRouter();

router.get('camaras', '/', async ctx => {
  const partidos = await Senador.findAll({
    attributes: ['partido_politico','id',"nombre","apellido_paterno", "apellido_materno"],
  });

  const years_congress = await Periodo.findAll({
    attributes: ['sid'],
    where: {
      final: {[Op.gte]:2019},
      cargo :"senador"
    }
  });

  await ctx.render('camaras', {
    partidos: JSON.stringify(partidos),
    years_congress:JSON.stringify(years_congress)
  });
});



module.exports = router;
