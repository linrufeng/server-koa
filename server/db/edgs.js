
// 机构基本情况
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
    classify:[String],
    average:Number,
    comment:Number,
    teacherNum:Number,
    address:String,
    addressId:String,
    contact:{
        ph:Number,
        email:String,
        weChat:String,
        qq:String
    },
    course:[String],
    edgImgs:[String],
    edgVideos:[String]
  });
  const MyModel = mongoose.model('edgs', ceshiSchema);
  class Edgs{
      // 添加
      add(obj){
        const m = new MyModel(obj)
        return new Promise((resolve, reject)=> {
            m.save((err, res) => {
              if (err) {
                reject(err)
              }else{
                resolve(res)
              console.log(res)
              }              
            })
          })
      }
      // 查询
      search(obj = {fullName:String,name:String,leader:String,classifyString:String}){
        return new Promise((resolve,reject)=>{
            MyModel.find(obj,(err,res)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })
      }
      // 修改
      edit(id){

      }
      // 删除
      delete(id){

      }
  }