import React, {useContext} from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserContext} from "../context";
/**
 *  @Author Roman Behroz
 * @returns A Form to insert Asset Information , on this page a user can add an Asset to the System
 */
const AddAsset = () => {

    /**
     * Hooks to store Data
     */
    const [type, setType] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [serialnr, setSerialnr] = useState('')

    const [employees, setEmployees] = useState()
    const [selectEmp, setSelectEmp] = useState(0)

    const [errormsg, setErrormsg] = useState('')
    const [errorActive, setErrorActive] = useState(false) 

    /**
     * Backend APIs to fetch Data from
     */
    const ASSET_URL = "http://localhost:8080/assets"
    const ASSET_ASSIGN_URL = "http://localhost:8080/handover/add"
    const EMPLOYEE_URL = "http://localhost:8080/employees"
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const {logoutUser, isTokenExpired} = useContext(UserContext);
  
    /**
     * Fetching Data, fetching Employee names for assgining Asset to
     */
    useEffect(() =>{
        if(isTokenExpired()){
            logoutUser()
        }

      const fetchData = async () =>{
          setLoading(true)
          try{
              const response = await axios.get(EMPLOYEE_URL)
              const sort = response.data.sort(function(a,b) { if(a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
                if(a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
                return 0;})
              setEmployees(sort)
          }catch (error){
  
          }
        
   
          setLoading(false)
      };
      fetchData()
    }, [])

    /**
     * Responds on Save Button, Adds Asset to System and Assigns to Employee if asked for
     * @param {*} e 
     * @returns 
     */
    const onSubmit = (e) => {
        e.preventDefault()
     
        if(!type){
           setErrormsg('Please ad a type name')
           setErrorActive(true) 
            return
        }
        if(!brand){
            setErrormsg('Please add a brand name') 
            setErrorActive(true) 
            return
        }
        if(!serialnr){
            setErrormsg('Please add a serial number!') 
            setErrorActive(true) 
            return
        }
        if(!model){
            setErrormsg('Please add a model name!') 
            setErrorActive(true) 
            return
        }

        const newAsset = {
            type: type,
            brand:  brand,
            serialNumber: serialnr,
            model: model
        }

        if(selectEmp === 0){
            axios.post(ASSET_URL, newAsset ).catch((error) => {
                setErrorActive(true)
                setErrormsg(error.response.data.message)
               
          
              
            }).then((res) =>{
                navigate("/assets");
            })
        }else{
            axios.post(ASSET_ASSIGN_URL+'/'+selectEmp,newAsset).catch((error) => {
                setErrorActive(true)
                setErrormsg(error.response.data.message)
               
          
              
            }).then((res) =>{
               navigate('/assets')
            })
        }
     
         
      
       
       
    }


  return (
    <div className='page'>
    <h2 className='page-title'>Add Asset</h2>
    <br />

        {
          errorActive ? (   <div className='alert error'>{errormsg}<div onClick={() => setErrorActive(false)} className='closebtn'>x</div></div> ):(<></>)
        }
     
        <form className='add-form' onSubmit={onSubmit}>

        <div className='form-control'>
            <label htmlFor="">Type</label>
            <input type="text" placeholder='Device Type e.g Laptop' value={type}  onChange={(e) => setType(e.target.value)}/>
        </div>

        <div className='form-control'>
            <label htmlFor="">Brand</label>
            <input type="text" placeholder='Device Brand e.g Apple' value={brand}  onChange={(e) => setBrand(e.target.value)}/>
        </div>

        <div className='form-control'>
            <label htmlFor="">Model</label>
            <input type="text" placeholder='Device Model e.g Macbook Pro 13' value={model}  onChange={(e) => setModel(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label htmlFor="">Serial number</label>
            <input type="text" placeholder='Device Serial Number e.g FXGH2424C' value={serialnr}  onChange={(e) => setSerialnr(e.target.value)}/>
        </div>
        <div></div><br></br>
         <div>   <div className='page-title'>Want to assign it to an employee?</div>
            <label for="employees">Choose an employee:</label>
           </div><div> 
            <select style={{width:'100%'}} onChange={(e) => setSelectEmp(e.target.value)} >
                <option value='0'>None</option>
            {
        !loading && (
        employees?.map(
        (employee) => 
  
                <option value={employee.employeeId}>{employee.firstName +' ' +employee.lastName}</option>
    
            ))
        }      </select></div>
       
      
    
        <input type="submit" name="" id="" value='Save' className='btn btn-purple'/>
    </form>


    </div>
  )
}

export default AddAsset