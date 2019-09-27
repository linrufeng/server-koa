
const Router = require('koa-router')
const login = require('./login');
const register = require('./register');
let router = new Router()
// 装载所有子路由
router.use('/login', login.routes(), login.allowedMethods())
router.use('/register', register.routes(), register.allowedMethods())

module.exports = router