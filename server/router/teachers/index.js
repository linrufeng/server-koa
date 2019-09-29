
const Router = require('koa-router')
const db = require('./../../db/teachers.js');
let teachers = new Router()

teachers.get('/',async (ctx)=>{
    let title = '老师'
    
    await ctx.render('test-teacher',{
        title
    })
})
teachers.post('/',async(ctx)=>{
    let queryres = await  db.add({
        company:'天天',
        companyId:'123456', // 为了和 公司关联   
        name:'李春秀',
        img:['text//123'],    
        workYears:'12',
        certificate:[''],
        comment:[{
            userName:'',
            isAccreditation:'',
            msg:'',
            img:['']
        }]
    })
    ctx.body = queryres
})
teachers.post('/delete',async(ctx)=>{
    let queryres = await db.deletes('ab');
    ctx.body = queryres
})
teachers.post('/search',async(ctx)=>{
    let queryres = await db.search({});
    ctx.body = queryres
})
module.exports = teachers