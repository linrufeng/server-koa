const Router = require('koa-router')
const User = require('../monk/user')
const MyCenter = new Router()
// 申请成为 edu
MyCenter.post('/applyToBeEdu',async(ctx)=>{
    const data = ctx.request.body;  
    ctx.body =  await User.applyToBeEdu(data);
})

module.exports = MyCenter;