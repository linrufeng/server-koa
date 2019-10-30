const Router = require('koa-router');
const page = require('./page'); // 首页
const user = require('./user'); // 注册
const edu = require('./edu') // 教育
// const jigou = require()
let routers = new Router();
//  首页
routers.use('', page.routes(), page.allowedMethods())
// 教育机构
routers.use('', edu.routes(), edu.allowedMethods())
// // 登陆注册
routers.use('',user.routes(),user.allowedMethods());
// //老师
// routers.use('/teacher',teachers.routes(),teachers.allowedMethods());
module.exports = routers;
