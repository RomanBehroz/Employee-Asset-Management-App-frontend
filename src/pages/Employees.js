import React, {useState, useEffect, useContext} from 'react'
import EmployeeCard from '../components/EmployeeCard'
import axios from "axios";
import {Link, useLocation} from 'react-router-dom';
import Cookies from 'js-cookie';
import {UserContext} from "../context";
/**
 *  @Author Roman Behroz
 * @returns Employees Page with all Employees 
 */
const Employees = () => {
  
  const EMPLOYEE_URL = "http://localhost:8080/employees"

  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState(null)
  const [isEmployeesEmpty, setIsEmployeesEmpty] = useState(false);
  const {logoutUser, isTokenExpired, getAccessTokenFromStorage} = useContext(UserContext);

  /**
   * Fetching Employees
   */
  useEffect(() =>{
      if(isTokenExpired()){
          logoutUser()
      }
    const fetchData = async () =>{
        setLoading(true)
        try{
            const headers = {
                'Authorization': `Bearer ${getAccessTokenFromStorage()}`,
                'Content-Type': 'application/json'
            };
            const response = await axios.get(EMPLOYEE_URL, {
                headers: headers
            })
            const sort = response.data.sort((a, b) => b.employeeId - a.employeeId)
            setEmployees(sort)
            if(response === null){
              setIsEmployeesEmpty(true);
            }
        }catch (error){
          setIsEmployeesEmpty(true);
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
  
      {!isEmployeesEmpty ? (
        <>
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
        </>
      ) : (
          <>

              <div className='flex'>
                  <h4>Not data to show</h4>
              </div>

              <Link to='/add-employee' className='btn btn-gray'>Add an employee</Link>
          </>


          )}

        </div>
     
     
    </div>
  )
}

export default Employees