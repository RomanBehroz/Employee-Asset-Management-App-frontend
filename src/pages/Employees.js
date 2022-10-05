import React, { useState, useEffect } from 'react'
import EmployeeCard from '../components/EmployeeCard'
import axios from "axios";
import { useLocation } from 'react-router-dom';
/**
 *  @Author Roman Behroz
 * @returns Employees Page with all Employees 
 */
const Employees = () => {
  
  const EMPLOYEE_URL = "http://localhost:8080/employees"

  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState(null)

  /**
   * Fetching Employees
   */
  useEffect(() =>{
    const fetchData = async () =>{
        setLoading(true)
        try{
            const response = await axios.get(EMPLOYEE_URL)
            const sort = response.data.sort((a, b) => b.employeeId - a.employeeId)
            setEmployees(sort)
        }catch (error){

        }
      
 
        setLoading(false)
    };
    fetchData()
  }, [])

  return (
    <div className='page'>
        <h2 className='page-title'>Employees</h2>
        <br />
        <div className='cards'>  
        {
        !loading && (
        employees.map(
        (employee) => 
        <EmployeeCard 
        key={employee.employeeId} 
        id={employee.employeeId}
        img='images/dp.jpeg' 
        name={employee.firstName+ " " + employee.lastName}
        title={employee.title}
        />
                        ))
        }
        
        </div>
     
     
    </div>
  )
}

export default Employees