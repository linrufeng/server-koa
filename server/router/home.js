const Router = require('koa-router')
let main = new Router();
//首页
main.get('/addedu-test', async (ctx) => {
    let title = '增加教育机构测试'
    await ctx.render('addedu-test', {
        title
    })
})
main.get('/edu-list', async (ctx) => {
    let title = '增加教育机构测试'
    await ctx.render('edu-list', {
        title,
        list:[{
            name:'lls',
            msg:'111'
        },{
            name:'ll2s',
            msg:'111'
        }]
    })
})
module.exports = main