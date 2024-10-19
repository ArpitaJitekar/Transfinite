const Mongoose=require('mongoose')
const mongoUrl='mongodb://localhost:27017/MD101'
//const mongoUrl="mongodb+srv://arpitajitekar20:arpita@206@bookverse.mongodb.net/?retryWrites=true&w=majority&appName=bookverse"
Mongoose.connect(mongoUrl).then(()=>{console.log("connected to database")}).catch((e)=>console.log(e));