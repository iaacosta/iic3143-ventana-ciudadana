const KoaRouter = require('koa-router');

const pkg = require('../../package.json');
const { Senador, Sequelize, Periodo } = require('../models');
const Op = Sequelize.Op;
 

const router = new KoaRouter();

router.get('camaras', '/', async ctx => {
 
  const partidos = await ctx.orm.Senador.findAll({
    attributes: ['partido_politico', 'id', 'nombre', 'apellido_paterno', 'url_foto'],
    include: [
      {
        model: ctx.orm.Periodo,
        attributes: ['final'],
        where: {
          final: { [ctx.orm.Sequelize.Op.gte]: 2019 },
          cargo: 'senador',
        },
      },
    ],
  });

  const yearsCongress = await ctx.orm.Periodo.findAll({
    attributes: ['sid'],
    where: {
      final: { [ctx.orm.Sequelize.Op.gte]: 2019 },
      cargo: 'senador',
    },
 
  });

  await ctx.render('camaras', {
    partidos: JSON.stringify(partidos),
 
    yearsCongress: JSON.stringify(yearsCongress),
  });
});

 
module.exports = router;
