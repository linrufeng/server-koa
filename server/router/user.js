const Router = require('koa-router')
const User = require('../monk/user')
const login = new Router()
// 注册
login.post('/register', async (ctx) => {
    const data = ctx.request.body    
    const param = Object.assign(data,{semailCode:ctx.session.emailCode})       
    ctx.body = await User.add(param)
    //  如果已经登陆   
})
// 
/**
 * 验证邮箱是否可用 
 * 参数 email 
 * 生成一个 验证码
 */
login.post('/getcode',async(ctx)=>{
    const data = ctx.request.body;  
    let code = User.random()
    ctx.session.emailCode = code;
    ctx.body = await User.vertemail({
        email:data.email,
        code:code
    })
})

module.exports = login
