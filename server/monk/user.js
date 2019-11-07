const {userdb} = require('./db');
const nodemailer = require('nodemailer');
class Use{
    constructor(){}
    /**
     * 登录功能
     * @param {countName} String 
     * @param {password} String 
     */
    async login(obj){
        if(!obj.countName){
           return{
               code:0,
               msg:'用户名不存在'
           }
        }
        let res = await userdb.findOne({countName:obj.countName})
        if(!res){
            return{
                code:0,
                msg:'用户名不存在'
            }
        }
        if(obj.password === res.password){
            
            return{
                code:1,
                data:res,
                msg:'登陆成功'
            }
        }else{
            return{
                code:0,
                msg:'密码错误请重新输入'
            }
        }
    }
    /**
     * 增加用户
     * @param {*} obj 
     * countName 必填
     * tel 可选
     * email 邮箱
     * emailCode 获取到的邮箱验证码
     * password 密码
     * type:1
     */
    async add(obj){       
        if(obj.countName && await userdb.findOne({countName:obj.countName})){
            return {
                code:0,
                msg:'这个账号已经被注册了'
            }
        }
        if(obj.tel && await userdb.findOne({tel:obj.tel})){
            return {
                code:0,
                msg:'手机号已被占用'
            }
        }
        if(obj.email && await userdb.findOne({tel:obj.email})){
            return {
                code:0,
                msg:'邮箱已被占用'
            }
        }    
        if(obj.email&&obj.semailCode !== obj.emailCode){
            return {
                code:0,
                msg:'验证码不正确'
            }
        }  

        return  await userdb.insert({
            countName: obj.countName,
            email:obj.email|| '',
            tel:obj.tel || '',
            password:obj.password
        })
    }
    /**
     * 验证邮箱
     * @param {email} String 
     * @param {code} Number 
     */
    async vertemail(obj){
        let transporter = nodemailer.createTransport({         
            service: '"163"', 
            port: 994, 
            secureConnection: true, 
            auth: {
              user: '18201255339@163.com',
              pass:'li8989'      
            }
          });          
          let mailOptions = {
            from: '<18201255339@163.com>', 
            to: obj.email, 
            subject: '评说邮箱验证',             
            text: `您的验证码是：${obj.code},请妥善保管`
          };          
          // send mail with defined transport object
          let res =  await new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                  reject({
                      code:0,
                      data:error,
                      msg:"发生错误"
                  })
                }               
                resolve({
                    code:1,
                    data:info.messageId,
                    msg:' 发送成功'
                })                
              });
          })
          return res;
          
    }
    random(){
        let ary = [];
        for(let i=0;i<6;i++){
            ary.push(Math.round(Math.random()*9));
        }         
        return ary.join('');
    }
    /**
     * 绑定邮箱
     */
    async bindEmail(obj){        
        /**
         * 通过验证码
         */
        if(obj.semailCode !== obj.emailCode){
            return {
                code:0,
                msg:'验证码不正确'
            }
        }  
        let res = await userdb.findOneAndUpdate({'_id':obj._id},{$set:{
            "email": obj.email
        }})
        return res
    }
    async list(obj){
        return await userdb.find();
    }
}

module.exports = new Use()

          