
import React, {useContext, useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEdit, AiOutlineClose} from 'react-icons/ai'
import moment from 'moment'
import AddNewAssetToEmp from '../components/AddNewAssetToEmp';
import {UserContext} from "../context";

/**
 *  @Author Roman Behroz
 * Profile of an Employee, it shows all the information about the Employee and all the Assets/Handovers that he has received
 * @returns Form with Employees Information, A Form to edit Employee Data, A Form to Assign Asset to the Employee
 */
const Profile = () => {
    const navigate = useNavigate()
       /** API URL FOR EMPLOYEE */
    const EMPLOYEE_URL = "http://localhost:8080/employees"

    const CURRENT_ASSET_URL = "http://localhost:8080/assets/emp"
    const RETURN_URL = "http://localhost:8080/return/list"
    const RETURN_ASSET_URL = "http://localhost:8080/return/asset"

    /** EMPLOYEE DATA STORED IN useState HOOKS */
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const { id } = useParams();
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')


    const [editmode, setEditmode] = useState(false)
    const [errormsg, setErrormsg] = useState('')
    const [errorActive, setErrorActive] = useState(false) 
    const [addAssetActive, setAddAssetActive] = useState(false)

    /** API URL FOR HANDOVERS */
  const HANDOVER_URL = "http://localhost:8080/handover/emp"

  const [loading, setLoading] = useState(true)
  const [handover, setHandover] = useState(null)
  const [currentAssets, setCurrentAssets] = useState(null)
  const [returns, setReturns] = useState(null)
    const {logoutUser, isTokenExpired} = useContext(UserContext);

  /**
   * THIS METHOD FETCHES THE EMPLOYEE HANDOVERS(ASSETS THAT ARE HANDED OVER TO THE EMPLOYEE)
   */
   const fetchData = async () =>{
      if(isTokenExpired()){
          logoutUser()
      }
    setLoading(true)
    try{
        const response = await axios.get(HANDOVER_URL+'/'+id)
        const sort = response.data.sort((a, b) => b.handoverId - a.handoverId)

        const response2 = await axios.get( CURRENT_ASSET_URL+'/'+id)
        const response3 = await axios.get( RETURN_URL+'/'+id)
        setCurrentAssets(response2.data)
        setReturns(response3.data)
        setHandover(sort)
    }catch (error){

    }
  

    setLoading(false)
};
  useEffect(() =>{
   
    fetchData()
  }, [])

  /**
   * THIS METHOD RESPONDS TO SAVE/SUBMIT BUTTON. IT SAVES THE EMPLOYEE DATA
   * @param {*} e EVENT 
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


   
        const employee = {id:id, firstName:firstname, lastName:lastname, email:email, title:title};

       
        if(id){
                axios.put(EMPLOYEE_URL+'/'+id, employee).then(response =>{
                        console.log("Employee updated!")
                        
                })
        }
     
        setEditmode(false)
       
    }

    /**
     * THIS METHOD DELETES AN EMPLOYEE
     * @param {*} id EMPLOYEE ID TO DELETE
     */
    const deleteEmp = (id) =>{
            console.log(id)

            axios.delete(EMPLOYEE_URL+'/'+id).catch((error)=>{
                console.log(error)
            }).then((res) =>{
                navigate('/employees')
            })

       
    }

    /** FETCHING EMPLOYEE DATA*/
    const fetchEmpData = async () =>{
        try{
            const response = await axios.get(EMPLOYEE_URL + '/'+id).catch((error) =>{
                setErrorActive(true)
                setErrormsg(error.response.data.message)
            })
            setFirstname(response.data.firstName)
            setLastname(response.data.lastName)
            setTitle(response.data.title)
            setEmail(response.data.email)
        }catch(error){

        }

};
    useEffect(() =>{
         
    fetchData()
    fetchEmpData()
    }, [])


    /** Return Asset Method, responds on return asset button */
    const returnAsset = (assId) =>{

        const newAsset ={
            assetId: assId
        }
        axios.post(RETURN_ASSET_URL+'/'+id, newAsset).catch((error)=>{
            console.log(error)
        }).then((res) =>{
          fetchData()
        })
    }

  return (
    <div className='page'>
        <h2 className='page-title'>Employee Profile</h2>
        <br />
        
    <div className='flex flex-title'>
    <h3 className='page-title'>{firstname +' ' + lastname} <img className='active-icon' src="/images/check.png" alt="Profile is active" /></h3> 
    
    <div>
        { /**EDIT AND CLOSE BUTTON, if error occurs button will not be shown*/}
        {errorActive? (<></>):(<>{editmode ? (<><div onClick={()=> (setEditmode(!editmode), editmode ? (fetchEmpData()) : (<></>))} className='close-btn'>Close<AiOutlineClose className='edit-icon'/></div></>) 
        : 
        (<><div onClick={()=> setEditmode(!editmode)} className='edit-btn'>Edit<AiOutlineEdit className='edit-icon'/></div></>)}</>)}
        
    </div>
    </div>
    
    <br />
    {      /** ERROR ALERT, if error form will be not shown*/
          errorActive ? (   <div className='alert error'>{errormsg}</div> ):(<>  {editmode ? (<form className='add-form' onSubmit={onSubmit}>
          { /** FORM WITH EMPLOYEE DATA, NOT EDITABLE */}
          <div className='form-control2'>
              <label htmlFor="">First name</label>
              <input type="text" placeholder='First name' value={firstname}  onChange={(e) => setFirstname(e.target.value)}/>
          </div>
          
          <div className='form-control2'>
              <label htmlFor="">Last name</label>
              <input type="text" placeholder='Last name' value={lastname}  onChange={(e) => setLastname(e.target.value)}/>
          </div>
          
          <div className='form-control2'>
              <label htmlFor="">Title</label>
              <input type="text" placeholder='Title' value={title}  onChange={(e) => setTitle(e.target.value)}/>
          </div>
          
          <div className='form-control2'>
              <label htmlFor="">Email</label>
              <input type="text" placeholder='Email Address' value={email}  onChange={(e) => setEmail(e.target.value)}/>
          </div>
          
          
          <input type="submit" name="" id="" value='Save' className='btn btn-purple'/>
          <div onClick={()=>deleteEmp(id)} className='btn btn-red'>Delete</div>
          </form>) 
          : 
          
            /** EDITABLE FORM, WILL ONLY BE ACTIVATED IF EDITMODE IS = TRUE */
        
          (<>
            <form className='add-form' onSubmit={onSubmit}>

            <div className='form-control'>
                <label htmlFor="">First name</label>
                <input  readOnly type="text" placeholder='First name' value={firstname}  onChange={(e) => setFirstname(e.target.value)}/>
            </div>

            <div className='form-control'>
                <label htmlFor="">Last name</label>
                <input readOnly type="text" placeholder='Last name' value={lastname}  onChange={(e) => setLastname(e.target.value)}/>
            </div>

            <div className='form-control'>
                <label htmlFor="">Title</label>
                <input readOnly type="text" placeholder='Title' value={title}  onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div className='form-control'>
                <label htmlFor="">Email</label>
                <input readOnly type="text" placeholder='Email Address' value={email}  onChange={(e) => setEmail(e.target.value)}/>
            </div>



            </form>
          </>)}</>)
        }
        <br /> <br /> <br /><br />
        <h2 className='page-title'>Assets</h2>
        <br />

        {
                        addAssetActive ? (<><div onClick={()=> setAddAssetActive(!addAssetActive)} className='btn btn-gray'>X Close</div></>):(<>  <div onClick={()=> setAddAssetActive(!addAssetActive)} className='btn btn-purple'>+ Add Asset</div></>)
                    }
                  
                    
                
                    <br />

                    {
                        addAssetActive ? (<>  <section className='add-new-asset'>
                        <h3 className='page-title'> Add a new Asset to the Employee</h3>
                        <br />
                        <AddNewAssetToEmp refresh={fetchData} id={id}/>
                        <br /> </section></>):(<></>)
                    }
        {
            /** Currently used Assets TABLE */
        }
        <div className='handovers-new'>
        
            <h3 className='page-title'>Currently in use</h3>
            <table  className='content-table'>
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Serial nr</th>
                            <th>Action</th>
                        </tr>
                </thead>
                            <tbody>   {
                    !loading && (
                    currentAssets?.map(
                    (asset, index) => 
                            <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{asset.type}</td>
                                    <td>{asset.brand}</td>
                                    <td>{asset.model}</td>
                                    <td>{asset.serialNumber}</td>
                                    <td><div onClick={()=>returnAsset(asset.assetId)} className='btn btn-purple'>Return Asset</div></td>
                                   
                            </tr>
                                    ))
                    }
                   

                </tbody>
            </table>
        </div>

                {
                    /** HANDOVERS TABLE */
                }
               <div className='handovers-new'>
        
            <h3 className='page-title'>Handovers</h3>
            <table   className='content-table'>
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Serial nr</th>
                            <th>Handover date</th>
                        </tr>
                </thead>
                            <tbody>   {
                    !loading && (
                    handover?.map(
                    (hand, index) => 
                            <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{hand.asset.type}</td>
                                    <td>{hand.asset.brand}</td>
                                    <td>{hand.asset.model}</td>
                                    <td>{hand.asset.serialNumber}</td>
                                    <td>{ moment(hand.handoverDate).format('DD.MM.YYYY')}</td>
                            </tr>
                                    ))
                    }
                   

                </tbody>
            </table>
        </div>

        {
                    /** RETURNS TABLE */
                }
               <div className='handovers-new'>
        
            <h3 className='page-title'>Returns</h3>
            <table  className='content-table'>
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Serial nr</th>
                            <th>Return date</th>
                        </tr>
                </thead>
                            <tbody>   {
                    !loading && (
                    returns?.map(
                    (ret, index) => 
                            <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{ret.asset.type}</td>
                                    <td>{ret.asset.brand}</td>
                                    <td>{ret.asset.model}</td>
                                    <td>{ret.asset.serialNumber}</td>
                                    <td>{ moment(ret.returnDate).format('DD.MM.YYYY')}</td>
                            </tr>
                                    ))
                    }
                   

                </tbody>
            </table>
        </div>

      
                    <br />
       
      
                

    </div>
  )
}

export default Profile