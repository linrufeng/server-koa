const Router = require('koa-router');
const edu = require('./../../monk/edu');
let main = new Router();
//首页
main.get('/edulist', async (ctx) => {
    let title = '首页'
    let res = await edu.get();
    ctx.body = {
        code:1,
        data:res,
        msg:'成功'
    }
})
module.exports = main