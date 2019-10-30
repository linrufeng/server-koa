const Router = require('koa-router')

const eduAdd = require('./eduAdd');
// const eduList = require('./eduList');
// const classifyAdd = require('./classifyAdd');
// const register = require('./register');
let edu = new Router()
// 装载所有子路由
edu.use('', eduAdd.routes(), eduAdd.allowedMethods())
// edu.use('', eduList.routes(), eduList.allowedMethods())
// edu.use('', classifyAdd.routes(), classifyAdd.allowedMethods())
// /logon
// edu.use('', register.routes(), register.allowedMethods())

module.exports = edu