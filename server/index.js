const Koa = require('koa');
const path = require('path');
const static  = require('koa-static');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const router = require('./router/index');
const app = new Koa();
// 加载模板引擎
app.use(views(path.join(__dirname, '../views'), {
    extension: 'ejs'
  }))
// server log
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
// post
app.use(bodyParser());
// router
app.use(router.routes());
// static
const staticPath = '../static';
app.use(static(
    path.join( __dirname,  staticPath)
))
// end
app.listen(3001, (ctx,next) => {
    console.log("http://localhost:2048")
})