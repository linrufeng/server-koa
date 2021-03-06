const Router = require('koa-router')
const User = require('../monk/user')
const users = new Router()
// 注册
users.post('/register', async (ctx) => {
    const data = ctx.request.body    
    const session = ctx.session;
    let param = {};
    if(session.login && session.user && session.type === 1){
        param['isAdmin'] = true;
    }
    param = Object.assign(data,param,{semailCode:session.emailCode})       
    ctx.body = await User.add(param)
    //  如果已经登陆   
})
// 
/**
 * 验证邮箱是否可用 
 * 参数 email 
 * 生成一个 验证码
 */
users.post('/getcode',async(ctx)=>{
    const data = ctx.request.body;  
    let code = User.random()
    ctx.session.emailCode = code;
    ctx.body = await User.vertemail({
        email:data.email,
        code:code
    })
})
users.post('/login',async(ctx)=>{
    // this..url('center')
    if(ctx.session.login){
        ctx.body ={
            code:1,
            data:ctx.session.user,
            msg:'您已登录请勿重复登录'
        }
        return 
    }
    const data = ctx.request.body;  
    let res = await User.login(data)
    if(res.code){
        ctx.session.login = true; 
        // 缓存用户信息
        ctx.session.user = res.data;
        users.url('/center')
    }
    ctx.body = res
})
users.post('/logout',async(ctx)=>{
    ctx.session.login = false;    
    ctx.session.user = null; 
    ctx.body = {
        code:0,
        msg:'注销成功'
    }
})
users.get('/userState',async(ctx)=>{
    if(ctx.session.login){
        ctx.body ={
            code:1,
            data:ctx.session.user,
            msg:'已登录'
        }
    }else{
        ctx.body ={
            code:0,
            data:null,
            msg:'未登录'
        }
    }
})

module.exports = users
