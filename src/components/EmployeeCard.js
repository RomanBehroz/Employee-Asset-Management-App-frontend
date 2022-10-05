import React from 'react'
import { Navigate, useNavigate } from "react-router-dom"

/**]
 * @Author Roman Behroz
 * This component is used to present an Employee with a Card design on Employees page
 * @Param img Employees img (not implemented yet)
 * @param name Employees name
 * @param title Employees job title
 * @param id Employees id
 * @return Employee Card with the given Data
 */
const EmployeeCard = ({ img, name, title, id}) => {
   const navigate = useNavigate();
    const openProfile = () =>{
      if(id){
         navigate(`/employees/${id}`)
      }
    
    }

  return (
    <div onClick={openProfile} className='emp-card'>
       <div className='emp-img'></div>
        <div className='emp-name'>{name}</div>   
        <div className='emp-title'>{title}</div>
     </div>
  )
}

export default EmployeeCard