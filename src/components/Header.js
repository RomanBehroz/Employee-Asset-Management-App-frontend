import React from 'react'
import Logo from './Logo'
import { Link, BrowserRouter as Router, Route , Routes } from 'react-router-dom'
import MobileMenu from './MobileMenu'

/**
 *  @Author Roman Behroz
 * @param {} text text for the logo
 * @returns Header of my Web Application
 */
const Header = ({ text }) => {
  return (
    <div className='header'>
     <Logo className='logo' text={text}/>
     <MobileMenu/>
    </div>
  )
}

export default Header