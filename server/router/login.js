const Router = require('koa-router')
const User = require('../monk/user')
const login = new Router()
login.post('/login', async (ctx) => {
    const data = ctx.request.body    
    // ctx.session.state
    //  如果已经登陆   
})

module.exports = login
