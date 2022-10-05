
import React, { useState, useEffect } from 'react'
import EmployeeCard from '../components/EmployeeCard'
import axios from "axios";
import { useLocation } from 'react-router-dom';

/**
 *  @Author Roman Behroz
 * @returns Home Page, this is the landing page for the Employee Asset Management App, 
 * shows the newest Employees, recently assigned Assets and recently returned Assets.
 * 
 */
const Home = () => {

  /**
   * Backend APIs
   */
  const EMPLOYEE_URL = "http://localhost:8080/employees/latest"
  const HANDOVER_URL = "http://localhost:8080/handovers/latest"
  const RETURN_URL = "http://localhost:8080/returns/latest"

  /**
   * Hooks to store Data
   */
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState(null)
  const [handovers, setHandovers] = useState(null)
  const [returns, setReturns] = useState(null)

  /**
   * Fetching Data: Employees, Handovers and Assets
   */
  useEffect(() =>{
    const fetchData = async () =>{
        setLoading(true)
        try{
            const response = await axios.get(EMPLOYEE_URL)
            setEmployees(response.data)

            const response2 = await axios.get(HANDOVER_URL)
            setHandovers(response2.data)
            const response3 = await axios.get(RETURN_URL)
            setReturns(response3.data)
        }catch (error){

        }
      
 
        setLoading(false)
    };
    fetchData()
  }, [])
  return (
    <div className='page'>
     <h2 className='page-title'>Home</h2>
      <br />

      <div className='home-cards'>

        <div className='card'>
          <div className='card-title'>Newest Employees</div>
          <div className='card-body'>
            <div className='flex-newest-employees'>      {
        !loading && (
        employees.map(
        (employee) => 
        <EmployeeCard 
        key={employee.employeeId} 
        id={employee.employeeId}
        img='' 
        name={employee.firstName+ " " + employee.lastName}
        title={employee.title}
        />
                        ))
        }</div>
       
          </div>
          
        </div>
        <div className='card'>
          <div className='card-title'>Recently assigned Assets</div>
          <div className='card-body'>
          <div className='flex-newest-employees assigned-assets'>      {
        !loading && (
        handovers.map(
        (handover) => 
        <EmployeeCard
        key={handover.handoverId} 
        id={''}
        img='' 
        name={handover.asset.brand+ " "+handover.asset.model}
        title={"Assigned to "+handover.employee.firstName}
        />
                        ))
        }</div>
          </div>
          
        </div>

 
        <div className='card'>
          <div className='card-title'>Recently returned Assets</div>
          <div className='card-body'>
          <div className='flex-newest-employees assigned-assets'>      {
        !loading && (
        returns.map(
        (ret) => 
        <EmployeeCard
        key={ret.returnId} 
        id={''}
        img='' 
        name={ret.asset.brand+ " "+ret.asset.model}
        title={"Returned by "+ret.employee.firstName}
        />
                        ))
        }</div>
          </div>
          
        </div>
        
        <div className='card'>
          <div className='card-title'>Statistics</div>
          <div className='card-body'>
            under construction!
          </div>
          
        </div>

      </div>

      
  
    </div>
  )
}

export default Home