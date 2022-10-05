import React from 'react'


/**
 *  @Author Roman Behroz
 * @param {*} param0 
 * @returns Sidebar Link in the Sidebar
 */
const SidebarLink = ({text, onClick, icon}) => {
  return (
    <div onClick={onClick} className='sidebar-link'>
       {icon} <div>{text}</div>
            </div>
  )
}

export default SidebarLink