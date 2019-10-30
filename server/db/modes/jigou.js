const mongoose = require('./db');
const Schema = mongoose.Schema;
// fullName 全称
// name 简称
// 负责人 leader
// des 描述 des
// class 分类 classify
// 平均分 average
// 评论数 comment
// 教师数量 teacherNum
// 地址 address
// 地址坐标 addressId
// 联系方式 contact 
// 课程 course array
// 图片 edgImgs
// 视频 edgVideos
// 资质证书 
const ceshiSchema = new Schema({
    fullName: String,
    name: String,
    leader:String,
    des: String,    
    average:Number,
    comment:Number,
    teacherNum:Number,
    address:String,
    addressId:String,
    classify:[String],
    contact:{
        ph:Number,
        email:String,
        weChat:String,
        qq:String
    },
    edgImgs:[String]
  });
  const MyModel = mongoose.model('edgs', ceshiSchema);