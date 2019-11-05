const Router = require('koa-router')
const User = require('../monk/user')
const users = new Router()
// 管理 用户
users.post('/manager/user', async (ctx) => {
    if(ctx.session.user.type === 'super'){
        const data = ctx.request.body    
        const param = Object.assign(data,{semailCode:ctx.session.emailCode})       
        ctx.body = await User.add(param)
    }else{
        ctx.body = {
            code:0,
            msg:'权限不足'
        }
    }
    
    //  如果已经登陆   
})
//  查看用户 申请 edu
users.post('/manager/useApply', async (ctx) => {
    const data = ctx.request.body    
    const param = Object.assign(data,{semailCode:ctx.session.emailCode})       
    ctx.body = await User.add(param)
    //  如果已经登陆   
})
module.exports = users
