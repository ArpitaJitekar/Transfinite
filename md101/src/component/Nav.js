import React from 'react'
 import{Link,useNavigate} from "react-router-dom"


const Nav = () => {
  const navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem("user")
    navigate('/signup')
  }
  const auth=localStorage.getItem('user')
  return (
    <div>

  <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-css">
  <Link className="navbar-brand dash-css" to="/">Dashboard</Link>
  {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> */}

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link change-css" to="/form">Change the data</Link>
      </li></ul></div>
      {auth?<li className="nav-item active"><Link onClick={logout} class="nav-link" to="/">Logout</Link></li>:
        <>
        <li className="nav-link">
        <Link className="Login nav-item " to="/login"> Login</Link>
      </li></>}
</nav>
    </div>
  )

}
export default Nav
