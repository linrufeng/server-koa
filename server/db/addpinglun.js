/**
 * 参数
 * 纬度 id
 * 添加时间 time
 * 用户 id 
 * 评论信息 msg
 */

const mongoose = require('./db')
const Schema = mongoose.Schema;
const MyModel = mongoose.model('edgs')

const ceshiSchema = new Schema({
    weiduId: String,
    time: String,
    userId: String,
    msg:String
});