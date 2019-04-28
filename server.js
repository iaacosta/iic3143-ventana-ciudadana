/* Config */
require('./config');

/* Modules */
const Koa = require('koa');
const cors = require('koa2-cors');

/* Routers and DB */
require('./sequelize');
const senadorRouter = require('./routes/senadores');

/* App and middleware */
const app = new Koa();
app.use(cors());
app.use(senadorRouter.routes()).use(senadorRouter.allowedMethods());

/* Mount */
app.listen(process.env.PORT, () => console.log(`Koa running in port ${process.env.PORT}`));
