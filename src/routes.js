const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const proyectosLey = require('./routes/proyectosLey');
const senadores = require('./routes/senadores');
const camaras = require('./routes/camaras');
const areas = require('./routes/areas');


const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/proyectos-ley', proyectosLey.routes());
router.use('/senadores', senadores.routes())
router.use('/camaras', camaras.routes());
router.use('/areas', areas.routes());
 

module.exports = router;
