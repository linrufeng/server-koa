const monk = require('monk');
const db = monk('localhost:27017/pingshuo');
const userdb = db.get('userdb'); // 用户
const edudb = db.get('edudb');  // 教育机构
const evaluatedb = db.get('evaluatedb'); // 评论 
const teacherdb = db.get('teacherdb'); // 教师
const classiflydb = db.get('classiflydb'); // 课程分类
module.exports = {
    edudb:edudb,
    evaluatedb:evaluatedb,
    teacherdb:teacherdb,
    classiflydb:classiflydb,
    userdb:userdb
}