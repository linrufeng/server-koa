const Router = require('koa-router');
const login = require('./login/index');
let routers = new Router();
let main = new Router();
//首页
main.get('/', async (ctx) => {
    let title = '首页'
    await ctx.render('index', {
        title
    })
})
// 404错误页
main.get('/404', async (ctx) => {
    let title = "404"
    await ctx.render('err', {
        title
    })
})
//  首页
routers.use('/', main.routes(), main.allowedMethods())
// 登陆注册
routers.use('/logon',login.routes(),login.allowedMethods());

module.exports = routers;