const Router = require('koa-router')
let main = new Router();
const edu = require('../monk/edu');
//首页
main.get('/', async (ctx) => {  
    await ctx.render('index')
})
main.get('/addedu-test', async (ctx) => {
    let title = '增加'
    await ctx.render('addedu-test', {
        title
    })
})
main.get('/edu-list', async (ctx) => {
    let title = '列表'
    let res = await edu.get() 
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
    await ctx.render('maner-edu', {
        title,
        data:res
    })
})
main.get('/register', async (ctx) => {
    let title = '注册'
    await ctx.render('register', {
        title,
    })
})
main.get('/login', async (ctx) => {
    let title = '注册'
    await ctx.render('login', {
        title,
    })
})
main.get('/center', async (ctx) => {
    let title = '登录成功'
    await ctx.render('center', {
        title,
    })
})
main.get('/manager', async (ctx) => {
    let title = '登录成功'
    await ctx.render('user-manger', {
        title,
    })
})
main.get('/comment', async (ctx) => {
    let title = '登录成功'
    await ctx.render('user-comment', {
        title,
    })
})
module.exports = main