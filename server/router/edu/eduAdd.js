const Router = require('koa-router')
const edu = require('./../../monk/edu');
const router = new Router();
router.post('/eduAdd',async(ctx)=>{
    const data = ctx.request.body
    let res = await edu.add(data)
    ctx.body = {
        code:1,
        data:res,
        msg:'成功'
    }
    console.log('lilinsen')
})
module.exports = router;