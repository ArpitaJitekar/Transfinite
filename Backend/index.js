const express=require('express');
const app=express();

const {faker}=require('@faker-js/faker');
const userIds=[];
// or, if desiring a different locale
// import { fakerDE as faker } from '@faker-js/faker';
require('./db/configure');
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
    email,

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
const populateDatabase = async () => {
    await populateUsers(); // Wait for users to be populated
    await populateSongs(); // Then populate songs
};
populateDatabase().then(() => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}).catch(err => {
    console.error('Error populating database:', err);
});

// app.listen(5000);
