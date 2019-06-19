const KoaRouter = require('koa-router');

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

  const totalAssistance = await ctx.orm.Assistance.findAll({
    group: ['sid'],
    attributes: [
      'sid',
      [ctx.orm.Sequelize.fn('SUM', ctx.orm.Sequelize.col('asistencias')), 'total_asistencias'],
      [
        ctx.orm.Sequelize.fn('SUM', ctx.orm.Sequelize.col('inasistencias_just')),
        'total_inasistencias_just',
      ],
      [
        ctx.orm.Sequelize.fn('SUM', ctx.orm.Sequelize.col('inasistencias_no_just')),
        'total_inasistencias_no_just',
      ],
    ],
  });

  await ctx.render('camara/camara', {
    partidos: JSON.stringify(partidos),
    yearsCongress: JSON.stringify(yearsCongress),
    user: ctx.session ? ctx.session.user : null,
  });
});

module.exports = router;
