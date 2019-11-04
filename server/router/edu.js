const Router = require('koa-router')
const edu = require('../monk/edu');
const router = new Router();
/**
 * 教育机构接口
 */
//  创建教育申请教育机构
router.post('/eduAdd',async(ctx)=>{
    const data = ctx.request.body
    let res = await edu.add(data,ctx.session)
    ctx.body = res
})
//  增加类别
router.post('/classifyAdd',async(ctx)=>{
    const data = ctx.request.body
    let res = await edu.addClassifly(data)
    ctx.body = res
})
// 增加老师
router.post('/teacherAdd',async(ctx)=>{
    const data = ctx.request.body
    let res = await edu.addTeacher(data)
    ctx.body = res
})
//  删除老师
router.post('/teacherDelete',async(ctx)=>{
    const data = ctx.request.body
    let res = await edu.removeTeacher(data)
    ctx.body = res
})
// 获取教育机构列表
router.get('/edulist', async (ctx) => {   
    let res = await edu.get();
    ctx.body = res;
})
module.exports = router;