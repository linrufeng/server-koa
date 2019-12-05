const {evaluatedb} = require('./db');
class Evaluate{
    constructor(){}
    /**
     * 增加评论
     * 用户id
     * 评论对象id
     * 评论内容
     * 分数
     * @param {*} obj 
     */
    async addorg(obj){
        let res = await evaluatedb.insert({
            userId:obj.userId || '',
            targetId:obj.targetId|| '',
            msg:obj.msg||'',
            score:obj.score||'',
            level:obj.level|| 1
        })
        return res;
    }
    async eidtorg(obj){
        let old = await evaluatedb.findOne({_id:obj._id})
        if(!old){
            return{
                code:0,
                msg:'不存在'
            }
        }
         let res = await evaluatedb.findOneAndUpdate(
            {
                _id:obj._id
            },
            {   
                $set: {
                    msg:obj.msg||old.msg,
                    score:obj.score||old.score,
                    level:obj.level|| old.level
                }
            })
        return res;
    }
    async getOneOfEdu(param){
        let res = await evaluatedb.find({targetId:param.targetId})
        return res;
    }
    async deleteorg(obj){
        return await evaluatedb.findOneAndDelete({_id:obj._id})
    }
}
module.exports = new Evaluate()