const db = require('./db');

var edudb = db.get('edudb')
class Edu {
    constructor(){}
    async add(obj){
        let checkfullname = await this.get({fullname:obj.fullname})
        if(checkfullname.length >0){
            return '已经创建';
        }else{
            let res = await edudb.insert(obj)        
             return res
        }   
    }
    async get(obj){
        let param = obj ||{};
        let res = await edudb.find(param)       
        return res
    }
}
module.exports = new Edu();