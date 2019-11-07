const Router = require('koa-router')
const User = require('../monk/user')
const edu = require('./../monk/edu')
const power =require('./power');
const users = new Router()
const noPower = {
    code:0,
    msg:'权限不足'
}
// 管理 用户列表
users.get('/manager/userlist', async (ctx) => {
 
    if(ctx.session.user&& power.reg(ctx.session.user.type,1)){
        const data = ctx.request.body   
        ctx.body ={
            code:1,
            data: await User.list(data),
            msg:'ok'
        }
    }else{
        ctx.body = noPower;
    }
    
    //  如果已经登陆   
})
//  查看用户 申请 edu
users.get('/manager/useApply', async (ctx) => {
    if(ctx.session.user&& power.reg(ctx.session.user.type,1)){
        const data = ctx.request.body   
        ctx.body ={
            code:1,
            data: await edu.get(),
            msg:'ok'
        }
    }else{
        ctx.body = noPower;
    }
    
    //  如果已经登陆   
})
module.exports = users
