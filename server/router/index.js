const Router = require('koa-router');
const home = require('./home'); // 首页
const login = require('./login/index'); // 注册
const teachers = require('./teachers/index'); // 老师
const edu = require('./edu/index') // 教育
// const jigou = require()
let routers = new Router();
//  首页
routers.use('', home.routes(), home.allowedMethods())
// 教育机构
routers.use('', edu.routes(), edu.allowedMethods())
// // 登陆注册
// routers.use('/login',login.routes(),login.allowedMethods());
// //老师
// routers.use('/teacher',teachers.routes(),teachers.allowedMethods());
module.exports = routers;
