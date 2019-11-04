const Router = require('koa-router');
const page = require('./page'); // 首页
const userlog = require('./user-log'); // 注册
const edu = require('./edu') // 教育
// const jigou = require()
let routers = new Router();
//  页面路由
routers.use('', page.routes(), page.allowedMethods())
// 教育机构 
routers.use('', edu.routes(), edu.allowedMethods())
// // 登陆注册
routers.use('',userlog.routes(),userlog.allowedMethods());
// 用户 评论 申请成为教育机构 绑定手机 绑定邮箱 收藏教育机构 

//管理端 教育机构管理员 超级管理员 

// 用户端 浏览 评论 修改自己信息 

// routers.use('/teacher',teachers.routes(),teachers.allowedMethods());
module.exports = routers;
