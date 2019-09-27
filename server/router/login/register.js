const Router = require('koa-router')
const User = require('../../db/user')
const home = new Router()

const register = new Router()

register.get('/', async (ctx) => {
    let title = "注册"
    await ctx.render('register', {
        title
    })
}).post('/', async (ctx) => {
    const data = ctx.request.body
    let queryres = await User.queryEmail(data.email)
    if (queryres) {
        ctx.body = {
            'code': 0,
            'data': {},
            'mesg': '该邮箱已经存在哦'
        }
    }else {
        await User.save(data)
        ctx.body = {
            'code': 1,
            'data': {},
            'mesg': '保存成功'
        }
    }
   
})

module.exports = register