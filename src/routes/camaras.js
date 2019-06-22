/* eslint-disable no-param-reassign */
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

  // eslint-disable-next-line no-unused-vars
  const totalAssistanceQuery = await ctx.orm.Assistance.findAll({
    group: ['Senador.partido_politico', 'Senador.id', 'sid'],
    include: [
      {
        model: ctx.orm.Senador,
        attributes: ['partido_politico'],
      },
    ],
    attributes: [
      'Senador.partido_politico',
      [
        ctx.orm.Sequelize.fn('SUM', ctx.orm.Sequelize.col('asistencias')),
        'total_asistencias',
      ],
      [
        ctx.orm.Sequelize.fn('SUM', ctx.orm.Sequelize.col('inasistencias_just')),
        'total_inasistencias_just',
      ],
      [
        ctx.orm.Sequelize.fn('SUM', ctx.orm.Sequelize.col('inasistencias_no_just')),
        'total_inasistencias_no_just',
      ],
    ],
    raw: true,
  });

  let totalAssistanceByParty = {};
  totalAssistanceQuery.forEach(val => {
    if (!val.partido_politico) return;
    if (!totalAssistanceByParty[val.partido_politico])
      totalAssistanceByParty[val.partido_politico] = {
        assistances: 0,
        inassistancesJust: 0,
        inassistances: 0,
        total: 0,
      };

    const assistances = parseInt(val.total_asistencias, 10);
    const inassistances = parseInt(val.total_inasistencias_just, 10);
    const inassistancesJust = parseInt(val.total_inasistencias_no_just, 10);

    totalAssistanceByParty[val.partido_politico].assistances += assistances;
    totalAssistanceByParty[val.partido_politico].inassistancesJust += inassistances;
    totalAssistanceByParty[val.partido_politico].inassistances += inassistancesJust;
    totalAssistanceByParty[val.partido_politico].total +=
      assistances + inassistances + inassistancesJust;
  });

  totalAssistanceByParty = Object.entries(totalAssistanceByParty).reduce(
    (accum, [name, val]) => [...accum, { ...val, partido: name }],
    [],
  );

  const totalAssistance = totalAssistanceByParty.reduce(
    (accum, cur) => {
      accum.assistances += cur.assistances;
      accum.inassistances += cur.inassistances;
      accum.inassistancesJust += cur.inassistancesJust;
      accum.total += cur.total;
      return accum;
    },
    { assistances: 0, inassistances: 0, inassistancesJust: 0, total: 0 },
  );

  await ctx.render('camara/camara', {
    partidos: JSON.stringify(partidos),
    yearsCongress: JSON.stringify(yearsCongress),
    totalAssistanceByParty: JSON.stringify(totalAssistanceByParty),
    totalAssistance,
    user: ctx.session ? ctx.session.user : null,
  });
});

module.exports = router;
