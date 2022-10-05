import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

/**
 *  @Author Roman Behroz
 * This component adds a new Asset to the System and assigns it to an employee
 * @param {*} param0 
 * @param id ID of the Employee to assign the Asset to
 * @returns A Form to insert Asset Information and Select Employee for assignment
 */
const AddNewAssetToEmp = ({id, refresh}) => {

    /**
     * Hooks to store data
     */
    const [type, setType] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [serialnr, setSerialnr] = useState('')
    const [errormsg, setErrormsg] = useState('')
    const [errorActive, setErrorActive] = useState(false) 
    const ASSET_URL = "http://localhost:8080/handover/add"
    const navigate = useNavigate()

    /**
     * Responds on Save button
     * Adds the Asset to System and Assigns to Employee
     * @param {*} e Event
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
     
            axios.post(ASSET_URL+'/'+id,newAsset).catch((error) => {
                setErrorActive(true)
                setErrormsg(error.response.data.message)
               
          
              
            }).then((res) =>{
               refresh()
            })
      
    }


  return (
    <div className=''>
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




<input type="submit" name="" id="" value='Save' className='btn btn-purple'/>
</form>
    </div>
  )
}

export default AddNewAssetToEmp