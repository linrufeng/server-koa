
// 教师
const mongoose = require('./db');
const Schema = mongoose.Schema;
/*
// 所属机构 company
// 所属机构id  companyId
// 姓名 name
// 照片 img
// 工龄 workYears
// 证书 certificate
            bianhao 证书编号
            img 照片
// 评论   comment
            userName 评论人
            isAccreditation 是否实名
            msg  评论内容
            img 评论图片
            score 评分
*/
const ceshiSchema = new Schema({
    company:String,
    companyId:String, // 为了和 公司关联   
    name:String,
    img:[String],    
    workYears:String,
    certificate:[String],
    comment:[{
        userName:String,
        isAccreditation:String,
        msg:String,
        img:[String]
    }]
});