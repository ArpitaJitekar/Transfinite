const Mongoose =require('mongoose')
const musicSchema=new Mongoose.Schema({
    songName:{type:String},
    artistName:String,
   Timespent:String,
   Genre:String,
   user:{ type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
   Date:{type:String},
   Length:{type:String}
   
})
module.exports=Mongoose.model('songs',musicSchema)