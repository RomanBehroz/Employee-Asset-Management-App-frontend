import React from 'react'
import { Link, BrowserRouter as Router, Route , Routes } from 'react-router-dom'
import {SiPolymerproject} from 'react-icons/si'
/**
 *  @Author Roman Behroz
 * @param {*} param0 
 * @returns Logo text with icon
 */
const Logo = ({ text }) => {

  return (
    
   <Link className='logo-link' to="/">
    <h2>{text}</h2><div className='logo-icon'><SiPolymerproject/></div>
    </Link>
  )
}

export default Logo