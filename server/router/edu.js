const Router = require('koa-router')
const edu = require('../monk/edu');
const evaluate = require('../monk/evaluate');
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
router.post('/edu', async (ctx) => {   
    const data = ctx.request.body
    console.log( ctx.request)
    let res = await edu.getOne(data);
    ctx.body = res;
})
//教育机构详情
router.post('/detailEdu', async (ctx) => {   
    const data = ctx.request.body   
    let res = await edu.getOne(data);
    let res2 = await evaluate.getOneOfEdu(data);
    let res3 =Object.assign({evals:res2},res)
    ctx.body = res3;
})
module.exports = router;