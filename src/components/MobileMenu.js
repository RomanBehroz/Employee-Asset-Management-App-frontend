import React from 'react'
import { Link } from 'react-router-dom'
/**
 *  @Author Roman Behroz
 * @returns Mobile Menu for responsive design
 */
const MobileMenu = () => {
  return (
    <div className='mobile-menu'>
        <nav>
            <ul>
                <li><Link to='/' className='link'>Home</Link></li>
                <li><Link to='/employees' className='link'>Employees</Link></li>
                <li><Link to='/add-employee' className='link'>Add Employee</Link></li>
                <li><Link to='/assets' className='link'>Assets</Link></li>
                <li><Link to='/add-asset' className='link'>Add Asset</Link></li>
    
            </ul>
        </nav>
    </div>
  )
}

export default MobileMenu