import React, {useContext} from 'react'
import { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import {UserContext} from "../context";
import jwtDecode from "jwt-decode";
/**
 *  @Author Roman Behroz
 * @returns A Form to insert Employee Information , on this page a user can add an Employee to the System
 */
const AddEmployee = () => {

    const {logoutUser, isTokenExpired, getAccessTokenFromStorage} = useContext(UserContext);

    const navigate = useNavigate()




    /**
     * Hooks to store Data
     */
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [messsage, setMesssage] = useState('')
    const [messageActive, setMessageActive] = useState(false)
    const [messageClass, setMessageClass] = useState('')
    /**
     * Backend Api
     */
    const EMPLOYEE_URL = "http://localhost:8080/employees"

    /**
     * Responds on Save button, adds Employee to System
     * @param {} e 
     * @returns 
     */
    const onSubmit = async (e) => {
        e.preventDefault()

        if(!firstname){
           setMesssage('Please ad a first name')
            setMessageClass('alert error')
           setMessageActive(true)
            return
        }
        if(!lastname){
            setMesssage('Please add a last name!')
            setMessageClass('alert error')
            setMessageActive(true)
            return
        }
        if(!email){
            setMesssage('Please add an email!')
            setMessageClass('alert error')
            setMessageActive(true)
            return
        }
        if(!title){
            setMesssage('Please add a title!')
            setMessageClass('alert error')
            setMessageActive(true)
            return
        }

        const newEmp = {
            firstName: firstname,
            lastName:  lastname,
            email: email,
            title: title
        }
     
            // axios.post(EMPLOYEE_URL, newEmp ).catch((error) => {
            //     setErrorActive(true)
            //     setErrormsg(error.response.data.message)
            //
            // }).then(res =>{
            //        navigate('/employees')
            // }).catch(error =>{
            //     console.log(error)
            // })

        const headers = {
            'Authorization': `Bearer ${getAccessTokenFromStorage()}`,
            'Content-Type': 'application/json'
        };


        axios.post(EMPLOYEE_URL, newEmp, {
            headers: headers
        })
            .then(response => {
                setMessageClass('alert success')
               setMesssage('Employee added successfully!')
                setMessageActive(true)
                setFirstname('')
                setLastname('')
                setEmail('')
                setTitle('')

                setTimeout(() => {
                    setMessageActive(false)
                    // Your code logic here
                }, 10000);

                // Handle the response here
            })
            .catch(error => {
                if(error.response.status === 403){
                    setMessageClass('alert error')
                    setMesssage('You are not authorized for this action.')
                    setMessageActive(true)

                }
                console.error('Error:', error.response.status);
                // Handle errors here
            });

       
    }

  return (
    <div className='page'>
        <h2 className='page-title'>Add Employee</h2>
        <br />
        {
          messageActive ? (   <div className={messageClass}>{messsage}<div onClick={() => setMessageActive(false)} className='closebtn'>x</div></div> ):(<></>)
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