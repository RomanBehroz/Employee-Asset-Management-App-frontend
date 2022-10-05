import * as React from "react";
import SidebarHeading from './SidebarHeading'
import SidebarLink from './SidebarLink'

import {HiOutlineUserAdd} from 'react-icons/hi'
import {HiOutlineUserGroup} from 'react-icons/hi'

import {TbDevices} from 'react-icons/tb'
import {AiOutlineAppstoreAdd} from 'react-icons/ai'
import {AiOutlineProfile} from 'react-icons/ai'
import {RiLogoutCircleLine} from 'react-icons/ri'
import {HiOutlineHome} from 'react-icons/hi'



import ReactDOM from 'react-dom';  
import { useNavigate, Routes, Route, Link, BrowserRouter as Router, Navigate } from 'react-router-dom'
import Employees from '../pages/Employees'

/**
 *  @Author Roman Behroz
 * @returns Sidebar Sidemenu with Links to other pages
 */
const Sidebar = () => {

 
  return (
    <div className='sidebar'>
     
        {/* EMPLOYEE MENU */}
       <SidebarHeading heading='Employee'/>
   
     
       <Link to="/">
          <SidebarLink 
        icon={<HiOutlineHome className='link-icon'/>} 
        text='Home' />
        </Link>

        <Link to="/employees">
          <SidebarLink 
        icon={<HiOutlineUserGroup className='link-icon'/>} 
        text='Employees' 
      />
        </Link>

        <Link to="/add-employee">
        <SidebarLink 
        icon={<HiOutlineUserAdd className='link-icon'/>} 
        text='Add Employee' 
        />
        </Link>

        <br></br> 

        {/* ASSET MENU */}
        <SidebarHeading heading='Asset'/>
        <Link to="/assets">
        <SidebarLink 
        icon={<TbDevices className='link-icon'/>} 
        text='Assets' 
       />
        </Link>
        <Link to="/add-asset">
        <SidebarLink 
        icon={<AiOutlineAppstoreAdd className='link-icon'/>} 
        text='Add Asset' 
       /></Link>
    
        <br />


    
    </div>
  )
}

export default Sidebar