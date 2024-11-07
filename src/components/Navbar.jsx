import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'


const Navbar = (props) => {



const username  =  props.user


  return (
    <div className='navbar'>

    <ul>

        <li> <Link to='/'>   Home </Link>  </li>
        <li> <Link to='/about'> About  </Link> </li>
        <li> <Link to="/contact"> Contact </Link> </li>
    </ul>



    <div>

      <p>  {props.user ? `Welcome ${username} ` : (<button> Login</button>) }</p>
    </div>



    </div>
  )
}

export default Navbar