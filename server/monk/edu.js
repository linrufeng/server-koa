const {edudb,teacherdb,classiflydb} = require('./db');

/**
 * 权限： 教育机构负责人  超级管理员
 * 
 * 添加教育机构 
 * 添加/删除/分类
 * 添加/删除/编辑/教师
 * 增
 * 查
 * 改
 */
class Edu {
    constructor(){}    
    /**
     * 增加
     * reg: 根据 全称 或地址 判断是否有重复的
     * @param {*} obj 
     * //  用户状态 登陆 
        // id
        // 增加 
        // state:0 
        // type:'user'
     */
    async add(obj){
        let checkfullname = await this.get({fullname:obj.fullname})
        if(checkfullname.length >0){
            return {
                code:0,
                msg:'已经创建'
            };
        }else{
            let res = await edudb.insert({
                userId:obj.userId, // 用户 id               
                edufullName:obj.edufullName, // 机构全称
                eduName:obj.eduName, // 教育机构简称 
                des:obj.des, // 教育机构描述
                owerName:obj.owerName, // 拥有者姓名
                fmImg:obj.fmImg, // 封面图片
                tel:obj.tel, // 手机
                email:obj.email, // 邮箱
                addressDes:obj.addressDes,  // 三级地址
                addressId:obj.addressId, // 三级地址 id
                addressdetail:obj.addressdetail, // 地址详情
                license:obj.license,
                type:'edu',                
                state:0 // 0等待审批  1申请通过 2 拒绝
            })        
             return res
        }   
    }
    /**
     * 添加老师
     * @param {*} obj 
     * 教师姓名
     * 教学经验
     * 性别
     * 联系方式
     * 所教科目
     */
    async addTeacher(obj){
        let isTeacher = await teacherdb.find({
            id:obj.eduid, // 机构id                
            name:obj.name           
        })
        if(isTeacher.length>0){
            return {
                code:0,
                msg:'您已经添加，请勿重复添加'
            }
        }else{
            let res = await teacherdb.insert({
                eduid:obj.eduid, // 机构id
                classifyId:obj.classifyId,           
                name:obj.name, 
                age:obj.age
            })
            return res
            
        }
    }
    /**
     * 删除老师
     * @param {*} obj 
     */
    async removeTeacher(obj){
        let res = await teacherdb.findOneAndDelete({ _id:obj._id})
        if(res.deletedCount){
            return {
                code:1,
                msg:"删除成功"
            };
        }else{
            return{
                code:0,
                msg:"已经删除了"
            }
        }
    }
    /**
     * 增加课程分类
     * @param {*} obj 
     * 纬度id
     * 名字
     */
    async addClassifly(obj){
        let ishas = await classiflydb.find({
            id:obj.eduid, // 机构id
            name:obj.name // 分类课程名字
        })
        if(ishas.length>0){
            return {
                code:0,
                msg:'您已经添加，请勿重复添加'
            }
        }else{
           const insertOne =  await classiflydb.insert({
                id:obj.eduid, // 机构id
                name:obj.name // 分类课程名字
            })
            return {
                code:1,
                msg:'添加成功'
            }
        }
    }
    /**
     * 移除分类
     * id
     */
    async removeClassifly(obj){
        let res = await classiflydb.findOneAndDelete({ _id:obj._id})
        if(res.deletedCount){
            return {
                code:1,
                msg:"删除成功"
            };
        }else{
            return{
                code:0,
                msg:"已经删除了"
            }
        }    
    }
    /**
     * 查询数据
     * @param {pg} number 当前页
     * @param {amount} number 每页显示数量
     */
    async get(obj){
        let param = obj ||{};
        let res = null;
        // 带分页
        if(param.pg&&param. amount){
            res = await edudb.find(param,{
                skip:param.pg*param. amount,
                limit:param. amount
            }) 
        }else{
            // 不带分页
            res = await edudb.find(param) 
        }   
        if(res.length>0){
            return res
        }else{
            return {
                code:0,
                msg:'暂无数据'
            };
        }              
    }
    /**
     * 重新编辑
     * 根据id查询然后修改
     * @param {*} obj 
     */
    async edit(obj){
        let hasID = await this.get({_id:obj._id})
        if(hasID.length>0){
          let res = await edudb.findOneAndUpdate({ _id:obj._id }, { $set: obj })
          return res
        }else{
          return {
              code:0,
              msg:"不存在这个id"
          };
        }
    }
    /**
     * 根据id去删除数据
     * @param {*} obj 
     */
    async remove(obj){
        let res = await edudb.remove({_id:obj._id});
        if(res.deletedCount){
            return {
                code:1,
                msg:"删除成功"
            };
        }else{
            return{
                code:0,
                msg:"已经删除了"
            }
        }
    }
    /**
     * 查询详情
     * @param {*} obj 
     * id 机构id
     * isEvaluate 是否有评论 默认没有
     */
    async details(obj){
        let edu = await edudb.findOne({_id:obj.id});
        let classifys = await classiflydb.find({id:obj.id});
        let teachers = await teacherdb.find({eduid:obj.id});
        for(let key in teachers){
            let classifyObj = await classiflydb.findOne({_id:teachers[key].classifyId})
            teachers[key]['classifyName'] =  classifyObj.name;           
        }
        edu['teachers'] = teachers;
        edu['classifys'] = classifys
        return edu;
    }    
}
module.exports = new Edu();