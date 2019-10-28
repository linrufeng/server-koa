const Router = require('koa-router')
let main = new Router();
//首页
main.get('/addedu-test', async (ctx) => {
    let title = '增加教育机构测试'
    await ctx.render('addedu-test', {
        title
    })
})
module.exports = main