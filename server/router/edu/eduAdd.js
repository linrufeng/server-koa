const Router = require('koa-router')
const edu = require('./../../monk/edu');
const router = new Router();
/**
 * 教育机构接口
 */
//  增加教育机构
router.post('/eduAdd',async(ctx)=>{
    const data = ctx.request.body
    let res = await edu.add(data)
    ctx.body = {
        code:1,
        data:res,
        msg:'成功'
    }    
})
//  增加类别
router.post('/classifyAdd',async(ctx)=>{
    const data = ctx.request.body
    let res = await edu.addClassifly(data)
    ctx.body = {
        code:1,
        data:res,
        msg:'成功'
    }
})
// 增加老师
router.post('/teacherAdd',async(ctx)=>{
    const data = ctx.request.body
    let res = await edu.addTeacher(data)
    ctx.body = {
        code:1,
        data:res,
        msg:'成功'
    }
})
// 获取教育机构列表
router.get('/edulist', async (ctx) => {
    let title = '首页'
    let res = await edu.get();
    ctx.body = {
        code:1,
        data:res,
        msg:'成功'
    }
})
module.exports = router;