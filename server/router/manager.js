const Router = require('koa-router')
const User = require('../monk/user')
const power =require('./power');
const users = new Router()
const noPower = {
    code:0,
    msg:'权限不足'
}
// 管理 用户
users.post('/manager/user', async (ctx) => {
    if(power.reg()){
        const data = ctx.request.body    
        const param = Object.assign(data,{semailCode:ctx.session.emailCode})       
        ctx.body = await User.add(param)
    }else{
        ctx.body = noPower;
    }
    
    //  如果已经登陆   
})
//  查看用户 申请 edu
users.post('/manager/useApply', async (ctx) => {
    if(power.reg()){
        const data = ctx.request.body    
        const param = Object.assign(data,{semailCode:ctx.session.emailCode})       
        ctx.body = await User.add(param)
    }else{
        ctx.body = noPower;
    }
    
    //  如果已经登陆   
})
module.exports = users
