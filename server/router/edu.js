const Router = require('koa-router')
const edu = require('../monk/edu');
const evaluate = require('../monk/evaluate');
const User = require('../monk/user')
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
    let res2 = await evaluate.getOneOfEdu({
        targetId:res._id
    });
    let temp = {}
    // 带有用户信息的评论
    let newAry = [];
    for(let i=0,item;item=res2[i];i++){        
        if(!temp[item.userId]){
            let use =await User.findOne({
                _id:item.userId
            })
            temp[item.userId]=use;
            newAry.push(Object.assign({user:use},item))
        }else{
            newAry.push(Object.assign({user:temp[item.userId]},item))
        } 
    }
    // 带有评论的教育机构详情
    let res3 =Object.assign({evals:newAry},res)
    ctx.body = res3;
})
module.exports = router;