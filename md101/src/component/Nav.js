import React from 'react'
 import{Link} from "react-router-dom"


const Nav = () => {
 
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
      <div className="collapse navbar-collapse login-css mx-2" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link  " to="/login">Login</Link>
      </li></ul></div>
</nav>
    </div>
  )

}
export default Nav
