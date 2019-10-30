const Router = require('koa-router')
let main = new Router();
const edu = require('./../monk/edu');
//首页
main.get('/addedu-test', async (ctx) => {
    let title = '增加'
    await ctx.render('addedu-test', {
        title
    })
})
main.get('/edu-list', async (ctx) => {
    let title = '列表'
    let res = await edu.get()
    console.log(res,'lls')
    await ctx.render('edu-list', {
        title,
        list:res
    })
})
// maner-edu
main.get('/maner-edu', async (ctx) => {
    let title = '管理'
    let id = ctx.querystring;
    let res = await edu.details({id:id})
    console.log(res,'lls')
    
        await ctx.render('maner-edu', {
            title,
            data:res
        })
    
        // ctx.body='404'
    
    
})
module.exports = main