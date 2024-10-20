import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()
    useEffect(()=>{
      const auth=localStorage.getItem("user")
      if(auth){
          navigate('/')
      }
  })
    const handlelogin=async()=>{
      
      let result=await fetch("http://localhost:5000/login",{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      result=await result.json()
      if(result.status==='ok'){
        localStorage.setItem("user",JSON.stringify(result))
       window.localStorage.setItem("token",result.data)
       window.localStorage.setItem("isloggedin",true);
       window.location.href='http://localhost:3000/'
      }
      else{
        console.log("error")
      }
      console.log(result)
        setEmail('')
        setPassword("")
    }
  return (
    <div className="login">
    <h1>Login</h1>
      <input  className="sign-input-box"type="email" value={email}onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter Email'/>
            <input className="sign-input-box" type="password" value={password}onChange={(e)=>{setPassword(e.target.value)}}placeholder='Enter password'/>
            <button onClick={handlelogin}type='button' className='sign-button'> Login</button>
    </div>
  )
}

export default Login
