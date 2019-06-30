const KoaRouter = require('koa-router');

const index = require('./routes/index');
const proyectosLey = require('./routes/proyectosLey');
const senadores = require('./routes/senadores');
const camaras = require('./routes/camaras');
const areas = require('./routes/areas');
const comitions = require('./routes/comitions');
const session = require('./routes/session');
const user = require('./routes/users');

const router = new KoaRouter();


router.use('/', index.routes());
router.use('/proyectos-ley', proyectosLey.routes());
router.use('/senadores', senadores.routes());
router.use('/camaras', camaras.routes());
router.use('/areas', areas.routes());
router.use('/comitions', comitions.routes());
router.use('/session', session.routes());
router.use('/user', user.routes());

module.exports = router;
