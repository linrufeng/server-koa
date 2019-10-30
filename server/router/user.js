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
login.post('/login',async(ctx)=>{
    if(ctx.session.login){
        return{
            code:1,
            data:ctx.session.user,
            msg:'您已登录请勿重复登录'
        }
    }
    const data = ctx.request.body;  
    let res = await User.login(data)
    if(res.code){
        ctx.session.login = true; 
        // 缓存用户信息
        ctx.session.user = res.data;
    }
    ctx.body = res
})
module.exports = login
