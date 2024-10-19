const Mongoose =require('mongoose')
const userSchema=new Mongoose.Schema({
    userId:{value:String},
    fname:String,
    lname:String,
    email:String,
   
})
module.exports=Mongoose.model('users',userSchema)