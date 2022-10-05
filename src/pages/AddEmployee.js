import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
/**
 *  @Author Roman Behroz
 * @returns A Form to insert Employee Information , on this page a user can add an Employee to the System
 */
const AddEmployee = () => {

    const navigate = useNavigate()

    /**
     * Hooks to store Data
     */
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [errormsg, setErrormsg] = useState('')
    const [errorActive, setErrorActive] = useState(false) 
    /**
     * Backend Api
     */
    const EMPLOYEE_URL = "http://localhost:8080/employees"

    /**
     * Responds on Save button, adds Employee to System
     * @param {} e 
     * @returns 
     */
    const onSubmit = (e) => {
        e.preventDefault()

        if(!firstname){
           setErrormsg('Please ad a first name')
           setErrorActive(true) 
            return
        }
        if(!lastname){
            setErrormsg('Please add a last name!') 
            setErrorActive(true) 
            return
        }
        if(!email){
            setErrormsg('Please add an email!') 
            setErrorActive(true) 
            return
        }
        if(!title){
            setErrormsg('Please add a title!') 
            setErrorActive(true) 
            return
        }

        const newEmp = {
            firstName: firstname,
            lastName:  lastname,
            email: email,
            title: title
        }
     
            axios.post(EMPLOYEE_URL, newEmp ).catch((error) => {
                setErrorActive(true)
                setErrormsg(error.response.data.message)
               
           
              
            }).then(res =>{
                   navigate('/employees')
            })

       
    }

  return (
    <div className='page'>
        <h2 className='page-title'>Add Employee</h2>
        <br />
        {
          errorActive ? (   <div className='alert error'>{errormsg}<div onClick={() => setErrorActive(false)} className='closebtn'>x</div></div> ):(<></>)
        }
     
        <form className='add-form' onSubmit={onSubmit}>

        <div className='form-control'>
            <label htmlFor="">First name</label>
            <input type="text" placeholder='First name' value={firstname}  onChange={(e) => setFirstname(e.target.value)}/>
        </div>

        <div className='form-control'>
            <label htmlFor="">Last name</label>
            <input type="text" placeholder='Last name' value={lastname}  onChange={(e) => setLastname(e.target.value)}/>
        </div>

        <div className='form-control'>
            <label htmlFor="">Title</label>
            <input type="text" placeholder='Title' value={title}  onChange={(e) => setTitle(e.target.value)}/>
        </div>

        <div className='form-control'>
            <label htmlFor="">Email</label>
            <input type="text" placeholder='Email Address' value={email}  onChange={(e) => setEmail(e.target.value)}/>
        </div>
      
    
        <input type="submit" name="" id="" value='Save' className='btn btn-purple'/>
    </form>
          
    </div>
  )
}

export default AddEmployee