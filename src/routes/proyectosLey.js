const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('aprobados', '/', async (ctx) => {
  await ctx.render('proyectos-ley/index');
});

router.get('api-aprobados', '/aprobados', async (ctx) => {
  const fakeData = [{
      boletin: '90192-1',
      resumen: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium in et quasi delectus sit sed dolor odio expedita at fuga.',
      aprobado: true,
    },
    {
      boletin: '61239-1',
      resumen: 'Nemo aliquid, harum expedita obcaecati alias perferendis, animi ducimus cum odit consequatur voluptatibus rerum impedit illo, sit non necessitatibus natus?',
      aprobado: true,
    },
    {
      boletin: '18721-1',
      resumen: 'Porro sed blanditiis tenetur eius ipsam inventore, sapiente est magnam molestiae, rerum omnis suscipit non exercitationem, excepturi labore ab aliquam!',
      aprobado: true,
    },
    {
      boletin: '12839-1',
      resumen: 'Iure praesentium ab ipsam accusamus saepe doloremque eos adipisci ea consequatur aut est fugit ullam quae corporis, dolores modi? Soluta?',
      aprobado: true,
    },
    {
      boletin: '65239-1',
      resumen: 'A, reprehenderit rerum ducimus adipisci recusandae dolorem earum, ab, cupiditate est ad suscipit illo dicta esse sit! Animi, voluptates velit.',
      aprobado: true,
    },
    {
      boletin: '92013-1',
      resumen: 'Vel ut pariatur cumque quasi, iusto eveniet fugiat explicabo nemo minus est, incidunt dolorem asperiores, aspernatur nam ducimus ad? Cumque?',
      aprobado: true,
    },
    {
      boletin: '53201-1',
      resumen: 'Sequi fuga, corrupti explicabo, veritatis dolor debitis, rem doloremque doloribus laudantium saepe temporibus quos cumque facere obcaecati quia! Explicabo, aliquam?',
      aprobado: false,
    },
    {
      boletin: '12839-1',
      resumen: 'Aliquid eius nobis maxime dicta, soluta eum culpa animi corporis quo dolore, facere in. Cumque voluptatum enim aspernatur rerum omnis!',
      aprobado: false,
    },
    {
      boletin: '23571-2',
      resumen: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem repellat quisquam omnis quae. Fugiat, illum?',
      aprobado: false,
    },
    {
      boletin: '15694-1',
      resumen: 'Hic, natus! Amet molestiae velit rem ut ad nobis similique? Provident maxime est adipisci temporibus!',
      aprobado: false,
    },
    {
      boletin: '42072-4',
      resumen: 'Iste vitae nobis cupiditate ullam voluptatibus ad doloremque veritatis consequatur magni, perspiciatis exercitationem? Sapiente, eos.',
      aprobado: false,
    },
    {
      boletin: '51716-5',
      resumen: 'Corporis, numquam distinctio. Optio nemo maxime quaerat enim. At ullam tenetur, modi odit voluptatem similique?',
      aprobado: false,
    },
    {
      boletin: '96984-9',
      resumen: 'Est esse unde quae dolor, sit quis quos eveniet accusamus qui repellendus, deserunt perspiciatis ut?',
      aprobado: false,
    },
    {
      boletin: '54727-5',
      resumen: 'Ratione sit magni reprehenderit rerum ab obcaecati praesentium laboriosam eligendi! Distinctio mollitia alias corrupti consequatur?',
      aprobado: false,
    },
    {
      boletin: '56896-5',
      resumen: 'Laborum rerum, quasi vel est, molestiae ipsa debitis, odio deleniti totam laboriosam earum modi rem.',
      aprobado: true,
    },
    {
      boletin: '32270-3',
      resumen: 'Odit ut assumenda et, doloremque perferendis sint saepe porro accusantium ipsam quas culpa molestias magnam.',
      aprobado: true,
    },
    {
      boletin: '31274-3',
      resumen: 'Error, libero cupiditate. Ab consequatur corrupti assumenda quidem repellendus voluptatem delectus debitis laudantium officiis quae!',
      aprobado: true,
    },
    {
      boletin: '40311-4',
      resumen: 'Rem aspernatur dolorem ducimus deserunt in nostrum, earum modi laborum excepturi, est totam. Deleniti, necessitatibus.',
      aprobado: true,
    },
  ];

  ctx.body = {
    proyectos: fakeData,
  };
});

module.exports = router;
