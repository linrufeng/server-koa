const Router = require('koa-router')
const edgs = require('../../db/edgs')

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
}).post('/add', async (ctx) => {
 
    let queryres = await edgs.add(data)
    ctx.body = {
        'code': 1,
        'data': queryres[0],
        'mesg': '添加成功'
    }
})

module.exports = login
