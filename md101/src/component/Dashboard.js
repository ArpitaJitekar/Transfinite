import React from 'react'
import Eachdash from './Eachdash'
const Dashboard = ({data,playlist}) => {
  return (
    <div>
      <div>
        <h1 className="user ">User Info:</h1>
        <h4 classname="uname">Name:${data.fname} ${data.lname}</h4>
        <h1>Music history</h1>
    ${playlist.map(s=>{
        return(
         <div className="each-song">
            <Eachdash playlist={s} />
         </div>   
        )
    })}
      </div>
    </div>
  )
}

export default Dashboard
