import React from 'react'

/**
 *  @Author Roman Behroz
 * @param {*} param0 
 * @returns Heading for a Menu in the Sidebar
 */
const SidebarHeading = ({ heading }) => {
  return (
    <div className='sidebar-heading'>{heading}</div>
  )
}

export default SidebarHeading