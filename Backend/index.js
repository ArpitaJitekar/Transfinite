const express=require('express');
const app=express();
const cors=require('cors');
const Mongodb=require('mongodb');
const ws=require('ws');
const sio=require('socket.io');
const http=require('http');
const server=http.createServer(app);
const io=socketIo(server);
const {faker}=require('@faker-js/faker');
app.use(express.json())
app.use(cors());
const userIds=[];
// or, if desiring a different locale
// import { fakerDE as faker } from '@faker-js/faker';
require('./db/configure');

let loggedinuser;
const user=require('./db/User');
const music=require('./db/Music')
const populateUsers=async()=>{
for(i=0;i<=20;i++){
const fname = faker.person.firstName(); 
const lname=faker.person.lastName()
const email = faker.internet.email();
const result=await user.create({
    fname,
    lname,
    email

})

userIds.push(result._id);

}}
const generateTime=()=>{
    const lengthMinutes = Math.floor(Math.random() * 5) + 1
    const timeSpentMinutes = Math.floor(Math.random() * (lengthMinutes + 1)); // Up to length minutes
    const timeSpentSeconds = Math.floor(Math.random() * 60); // Random seconds
    const timeSpentTotalSeconds = timeSpentMinutes * 60 + timeSpentSeconds;
     return `${timeSpentMinutes}:${timeSpentSeconds < 10 ? '0' : ''}${timeSpentSeconds}`
}
const generatelength=()=>{
    const lengthMinutes = Math.floor(Math.random() * 5) + 1; // Length between 1 and 5 minutes
    const lengthSeconds = Math.floor(Math.random() * 60); // Length seconds
    const lengthTotalSeconds = lengthMinutes * 60 + lengthSeconds;

    
        return  `${lengthMinutes}:${lengthSeconds < 10 ? '0' : ''}${lengthSeconds}`
        
    }


const populateSongs=async()=>{
    for(i=0;i<20;i++){
const songName=faker.music.songName();
const artistName=faker.music.artist();
const Genre=faker.music.genre();
const Timespent=generateTime();
const length=generatelength();
const  randomuserId=userIds[Math.floor(Math.random() * userIds.length)];
const date=faker.date.recent();

await music.create({
user:randomuserId,
songName,
artistName,
Genre,               
Timespent,
Date:date,
Length:length
})
 }
}
//user login
app.post('/login',async(req,resp)=>{
    const {email,password}=req.body
    const user=await user.findOne({email})
    if(!user){
     return resp.send({error:"user not found"})
    }
    if(user.password==password){
      console.log("login succesful");
      loggedinuser=user.email;

     }else{
         resp.json({status:"error",message:"Invalid password"})
     
    }
     
 })
 
//to send data from database to frontend
//to send 
app.get('/analytics',async(req,resp)=>{
const result=await user.findOne({email:loggedinuser});
resp.json(result);
})
//changestream to reflect changes
// API endpoint for inserting a new document
app.post('/changes', async (req, res) => {
    const {fname,lname,email} = req.body;
    const result = await user.insertOne({fname,lname,email});
    res.status(201).json(result.ops[0]); // Return the inserted document
});
const setupchangestream=()=>{
    // conn = new Mongodb("mongodb://localhost:27017");
// db = conn.getDB('MD101');

//     const collection=db.collection('user');
//     const userChangeStream = collection.watch();
const userChangeStream=user.watch()
const musicstream=music.watch()
    userChangeStream.on('change', (change) => {
        io.emit('data changed',change);
        
        console.log('User Collection Change:', change);
        //app.post('/')
        // Here, you can emit an event to the frontend or update a dashboard in real-time
    });
    musicstream.on('change',(change)=>{
        io.emit('data changed',change)
    })

}
const populateDatabase = async () => {
    await populateUsers(); // Wait for users to be populated
    await populateSongs(); // Then populate songs
    //set monogodb to replicatetype
   setupchangestream();
};
populateDatabase().then(() => {
    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}).catch(err => {
    console.error('Error populating database:', err);
});

// app.listen(5000);
