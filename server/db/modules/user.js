const mongoose = require('./db')
const Schema = mongoose.Schema;
const user = new Schema({
    email: String,
    name: String,
    password: String,
    info:{
        sex:Number, // 1男 0 女
        tel:Number,
        creatTime:Number
    }
});
module.export  = mongoose.model('User', user)