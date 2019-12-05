const Router = require('koa-router')
const evaluate = require('../monk/evaluate');
const router = new Router();

router.post('/addEvaluate', async (ctx) => {   
    const data = ctx.request.body    
    const session = ctx.session;
    console.log(session)
    if(ctx.session.login){
        let param = Object.assign({userId:session.user._id},data)
        let res = await evaluate.addorg(param);
        ctx.body = res;
    }else{
        ctx.body = {
            code:0,
             msg:'请先登录'
        };
    }    
})

module.exports = router;