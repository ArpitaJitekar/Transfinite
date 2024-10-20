import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const Form = ({addEvent}) => {
  const  [fname,setfname]=useState('');
    const [lname,setlname]=useState('');
    const[email,setemail]=useState('')
   
    const navigate=useNavigate()
//changing
 

        const submit=async(e)=>{
     e.preventDefault();
    if(!fname || !lname || !email ){
        alert("You need to change something!!")
    }
    else{
     
      let res=await fetch("http://localhost:5000/change",{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      }
    })
     res=await res.json()
     console.log(res)
    addEvent(fname,lname,email)
        setfname()
        setlname("")
        
        if(res.status==="ok")
          navigate('/')      
} 
} 
  return (

    <div>
       <form onSubmit={submit} > 
    <h1 className="mx-3">Add to List </h1>
  <div className="form-group my-3 mx-3">
    <label htmlFor="Title">First Name</label>
    <input type="text" value={fname} onChange={(e)=>{setfname(e.target.value)}} className="form-control" id="title" />
  </div>
  {/*need to add image in main page*/ }
 
    <div className="form-group mx-3">
    <label htmlFor="desc">Last Name</label>
    <input type="text"  value={lname} onChange={(e)=>{setlname(e.target.value)}} className="form-control" id="author"/>
  </div>
  <div className="form-group mx-3">
    <label htmlFor="desc">Email</label>
    <input type="text" value={email} onChange={(e)=>{setemail(e.target.value)}}  className="form-control " id="genre"/>
  </div>
  
  <button type="submit" className="btn btn-sm btn-success mx-3 my-3">Change</button>
</form>


    </div>
  )
}

export default Form

