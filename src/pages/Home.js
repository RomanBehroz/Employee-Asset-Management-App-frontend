
import React, {useState, useEffect, useContext} from 'react'
import EmployeeCard from '../components/EmployeeCard'
import axios from "axios";
import { useLocation } from 'react-router-dom';
import {UserContext} from "../context";

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
  const HANDOVER_URL = "http://localhost:8080/handover/latest"
  const RETURN_URL = "http://localhost:8080/return/latest"
  const EMPLOYEE_COUNT_URL = "http://localhost:8080/employees/count"

  /**
   * Hooks to store Data
   */
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState([])
  const [handovers, setHandovers] = useState([])
  const [returns, setReturns] = useState([])
  const [employeesCount, setEmployeesCount] = useState(null)
    const {logoutUser, isTokenExpired} = useContext(UserContext);
  /**
   * Fetching Data: Employees, Handovers and Assets
   */
  useEffect(() =>{
      if(isTokenExpired()){
          logoutUser()
      }
    const fetchData = async () =>{
        setLoading(true)
        try{
            const response = await axios.get(EMPLOYEE_URL)
            setEmployees(response.data)

            const response2 = await axios.get(HANDOVER_URL)
            setHandovers(response2.data)
            const response3 = await axios.get(RETURN_URL)
            setReturns(response3.data)
            const response4 = await axios.get(EMPLOYEE_COUNT_URL)
            setEmployeesCount(response4.data)
            setLoading(false);

        }catch (error){
            console.error('Error:', error);
            setLoading(false);
        }
 
        setLoading(false)
    };
    fetchData()
  }, [])
  return (
    <div className='page'>
     <h2 className='page-title'>Home</h2>
      <br />
        {loading? (        <div className='loading'>
        <p>LOADING...</p>
    </div>) : (<></>)}

      <div className='home-cards'>

        <div className='card'>
          <div className='card-title'>Newest Employees</div>
          <div className='card-body'>
            <div className='flex-newest-employees'>      {
        !loading && (
                    employees.length > 0 ? (
                            employees.map((item, index) => (
                                <EmployeeCard key={index} id={item.id} name={item.name} title={item.title}/>
                            ))
                        ) : (
                            <p>No data to show.</p>
                        ))
        }</div>
       
          </div>

        </div>
        <div className='card'>
          <div className='card-title'>Recently assigned Assets</div>
          <div className='card-body'>
          <div className='flex-newest-employees assigned-assets'>      {
        !loading && (
        handovers.length > 0 ? (handovers.map(
        (handover) =>
        <EmployeeCard
        key={handover.handoverId}
        id={''}
        img=''
        name={handover.asset.brand+ " "+handover.asset.model}
        title={"Assigned to "+handover.employee.firstName}
        />
                        )) :(<>No data to show.</>))
        }</div>
          </div>
        </div>


        <div className='card'>
          <div className='card-title'>Recently returned Assets</div>
          <div className='card-body'>
          <div className='flex-newest-employees assigned-assets'>      {
        !loading && (
        returns.length > 0 ? ( returns.map(
        (ret) =>
        <EmployeeCard
        key={ret.returnId}
        id={''}
        img=''
        name={ret.asset.brand+ " "+ret.asset.model}
        title={"Returned by "+ret.employee.firstName}
        />
                        )): (<>No data to show.</>))
        }</div>
          </div>
        </div>
        
        <div className='card'>
          <div className='card-title'>Statistics</div>
          <div className='card-body'>
            <div className='stats-cards'>
            <div className='total-employees'>
            <h2>{ employeesCount != null? (employeesCount) : (<></>)}</h2>
            <p>Employees</p>

            </div>

            <div className='total-employees'>
            <h2>55</h2>
            <p>Assets</p>

            </div>
            <div className='total-employees last-stat'>
            <h2>24</h2>
            <p>Handovers</p>

            </div>
            </div>
          </div>
        </div>

      </div>



    </div>
  )
}

export default Home