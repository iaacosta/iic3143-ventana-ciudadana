const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const proyectosLey = require('./routes/proyectosLey');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/proyectos-ley', proyectosLey.routes());

module.exports = router;
