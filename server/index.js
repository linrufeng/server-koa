const Koa = require('koa');
const path = require('path');
const static  = require('koa-static');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const router = require('./router/index');
const cors = require('koa-cors');
const app = new Koa();
// session 模块
const session = require('koa-session');
app.keys = ['abcdefg'];
const CONFIG = {
   key: 'koa:jiaoyu',   //cookie key (default is koa:sess)
   maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
// 加载模板引擎
app.use(views(path.join(__dirname, '../views')))
// server log
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(cors());
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
    console.log("http://localhost:3001")
})