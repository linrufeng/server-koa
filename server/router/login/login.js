const Router = require('koa-router')
const User = require('../../db/user')

const login = new Router()
// class check{
//     isEmpty(obj){
      
//     }
// }
// /logon/login
login.get('/', async (ctx) => {
    let title = "登录"
    await ctx.render('login', {
        title
    })
}).post('/', async (ctx) => {
    const data = ctx.request.body
    console.log(ctx.session.logState,'lls')
    if(ctx.session.logState){
        ctx.body = {
            'code': 1,
            'data': {},
            'mesg': '您已经登陆'
        }
    }
    
    if(!data.name){
        ctx.body = {
            'code': 1,
            'data': {},
            'mesg': '请输入登陆邮箱'
        }
    }
    let queryres = await User.queryEmail(data.name)    
    if (queryres) {
        if(queryres[0].password === data.password) {
            ctx.session.logState = 'true';
            ctx.body = {
                'code': 1,
                'data': queryres[0],
                'mesg': '登录成功'
            }
            
        }else {
            ctx.body = {
                'code': 0,
                'data': {},
                'mesg': '密码错误'
            }
        }
        
    }else {
        ctx.body = {
            'code': 0,
            'data': {},
            'mesg': '没有该用户，去注册吧'
        }
    }
})

module.exports = login
