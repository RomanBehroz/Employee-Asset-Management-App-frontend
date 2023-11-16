import React, {useContext} from 'react'
import Logo from './Logo'
import { Link, BrowserRouter as Router, Route , Routes } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import {UserContext} from "../context";
import logo from "./Logo";

/**
 *  @Author Roman Behroz
 * @param {} text text for the logo
 * @returns Header of my Web Application
 */
const Header = ({ text, username}) => {
    const {user, logoutUser} = useContext(UserContext);
  return (
    <div className='header'>
        <div className='header-top'>
            <Logo className='logo' text={text}/>
            <div className='header-user'>
                {user? <>Hello {user} <div className='btn btn-gray' onClick={(e) =>logoutUser()}> logout</div></> : <>Hello Guest</>}
            </div>

        </div>


     <MobileMenu/>
    </div>
  )
}

export default Header