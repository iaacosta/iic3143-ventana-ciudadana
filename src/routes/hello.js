const KoaRouter = require('koa-router');
const { Senador, Proyecto, Periodo } = require('../models');

const router = new KoaRouter();

router.get('hello', '/', async ctx => {
  ctx.body = await Senador.findAll({
    include: [
      {
        model: Proyecto,
        attributes: ['boletin', 'fecha'],
        where: { estado: 'aprobado' },
        through: {
          attributes: [],
        },
      },
      {
        model: Periodo,
        attributes: ['inicio', 'final'],
        where: { cargo: 'diputado' },
      },
    ],
    attributes: ['nombre', 'apellido_paterno'],
  });
});

module.exports = router;
