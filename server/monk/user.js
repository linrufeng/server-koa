const {userdb} = require('./db');
const nodemailer = require('nodemailer');
class Use{
    constructor(param){
        console.log(param)
    }
    async login(){

    }
    /**
     * 增加用户
     * @param {*} obj 
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
        if(obj.tel && await userdb.findOne({tel:obj.tel})){
            return {
                code:0,
                msg:'邮箱已被占用'
            }
        }      
        return  await userdb.insert(obj)
    }
    /**
     * 验证邮箱
     * @param {email} String 
     * @param {code} Number 
     */
    vertemail(obj){
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
            from: '"评说"<18201255339@163.com>', 
            to: obj.email, 
            subject: 'Hello',             
            html: `<b>您的验证码是：${obj.code}</b>` 
          };          
          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
          });
    }
}
// let test = new Use('lls')
// test.vertemail({countName:'ll4'})
