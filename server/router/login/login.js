const Router = require('koa-router')
const User = require('../../db/user')

const login = new Router()
// class check{
//     isEmpty(obj){
      
//     }
// }
/**
 * 登陆接口
 * url: /logon/login
 */

login.post('/', async (ctx) => {
    const data = ctx.request.body    
    //  如果已经登陆
    if(ctx.session.state){       
        ctx.body = {
            'code': 1,
            'data': ctx.session.usemsg,
            'msg': '已经登录,无需重复'
        }
        return
    }      
    // 账号名称为空
    if(!data.name){
        ctx.body = {
            'code': 1,
            'data': {},
            'msg': '请输入账号名称'
        }
        return
    }
    // 查询是否有这个账号名称 ，并获取账号信息
    let queryres = await User.queryEmail(data.name)   
    // 如果账号存在
    if (queryres) {
        //若果成功
        if(queryres[0].password === data.password) {
            ctx.session.state=true;
            ctx.session.usemsg = queryres[0];
            ctx.body = {
                'code': 1,
                'data': queryres[0],
                'msg': '登录成功'
            }
            
        }else {
            ctx.body = {
                'code': 2,
                'data': {},
                'msg': '密码错误'
            }
        }
        
    }else {
        ctx.body = {
            'code': 0,
            'data': {},
            'msg': '没有该用户，去注册吧'
        }
    }
})

module.exports = login
