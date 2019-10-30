const {userdb} = require('./db');
const nodemailer = require('nodemailer');
class Use{
    constructor(){}
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
        if(obj.tel&&obj.semailCode !== obj.emailCode){
            return {
                code:0,
                msg:'验证码不正确'
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
            from: '<18201255339@163.com>', 
            to: obj.email, 
            subject: '邮箱验证text',             
            text: `哈哈${obj.code}`
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
    random(){
        return Math.round(Math.random()*9999999)
    }
}
//  let test = new Use('lls')
// test.vertemail({email:'525019506@qq.com'})

module.exports = new Use()

//  let transporter = nodemailer.createTransport({
//             // host: 'smtp.ethereal.email',
//             service: '"163"', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
//             port: 994, // SMTP 端口
//             secureConnection: true, // 使用了 SSL
//             auth: {
//               user: '18201255339@163.com',//你的邮箱
//               // 这里密码不是qq密码，是你设置的smtp授权码        
//               pass:'li8989'      
//             }
//           });
          
//           let mailOptions = {
//             from: '<18201255339@163.com>', // sender address
//             to: '525019506@qq.com', // list of receivers
//             subject: 'Hello3123123', // Subject line
//             // 发送text或者html格式
//              text: 'Hello 我是火星黑洞', // plain text body
//             // html: '<b>Hello 我是火星黑洞</b>' // html body
//           };
          