const {evaluatedb} = require('./db');
class Evaluate{
    constructor(){}
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
    eidtorg(obj){
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
    async deleteorg(obj){
        return await evaluatedb.findOneAndDelete({_id:obj._id})
    }
}