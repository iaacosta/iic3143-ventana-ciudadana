const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('aprobados', '/', async (ctx) => {
  await ctx.render('proyectos-ley/index');
});

router.get('api-aprobados', '/aprobados', async (ctx) => {
  const fakeData = [
    { boletin: '90192-1', razon: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', aprobado: true },
    { boletin: '61239-1', razon: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', aprobado: true },
    { boletin: '18721-1', razon: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', aprobado: true },
    { boletin: '12839-1', razon: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', aprobado: true },
    { boletin: '65239-1', razon: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', aprobado: true },
    { boletin: '92013-1', razon: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', aprobado: true },
    { boletin: '53201-1', razon: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', aprobado: false },
    { boletin: '12839-1', razon: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', aprobado: false },
  ];

  ctx.body = {
    proyectos: fakeData,
  };
});

module.exports = router;
