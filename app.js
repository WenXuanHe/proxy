const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const path = require('path');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const cors = require('koa2-cors');
const render = require('koa-swig');
const co = require('co');

const index = require('./router/index');
const PORT = process.env.PORT || 5000;

// error handle
onerror(app);
app.use(cors({
    credentials: true,
}));
app.context.render = co.wrap(render({
    root: path.resolve(__dirname + '/views'),
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: true
}));

// middlewares
app.use(bodyparser);
app.use(json());

app.use(require('koa-static')(path.resolve(__dirname, './', 'public')));
// app.use(historyFallback())
app.use(views(path.resolve(__dirname + '/views'), {
  extension: 'html'
}));

app.use(index.routes(), index.allowedMethods());
app.listen(PORT);

console.log("PORT", PORT);
console.log("PID", process.pid);
console.log('your koa server is running in ' + PORT);