import React, {useContext} from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from "../context";
/**
 *  @Author Roman Behroz
 * @returns Assets Table, user can see all the Assets
 */
const Assets = () => {

    const ASSET_URL = "http://localhost:8080/assets"

    const [loading, setLoading] = useState(true);
    const [assets, setAssets] = useState(null);
    
    
    const navigate = useNavigate()
    const {logoutUser, isTokenExpired} = useContext(UserContext);
    /**
     * Fetching Data/Assets
     */
    useEffect(() =>{
        if(isTokenExpired()){
            logoutUser()
        }
        const fetchData = async () =>{
            setLoading(true)
            try{
                const response = await axios.get(ASSET_URL)
                setAssets(response.data)
               
            }catch (error){
    
            }
            setLoading(false)
        };
        fetchData()
      }, [])

  return (
    <div className='page'>
    <h2 className='page-title'>Assets</h2>
    <br />
    <div>
        <table className='content-table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Serial nr</th>
                    <th>Used by</th>
                </tr>
            </thead>
            <tbody>

       
                { !loading && (
        assets?.reverse().map(
        (as, index) => 
                <tr key={as.assetId} onClick={()=>navigate('/assets/'+as.assetId)}>
                    <td>{index+1}</td>
                    <td>{as.type}</td>
                    <td>{as.brand}</td>
                    <td>{as.model}</td>
                    <td>{as.serialNumber}</td>
                    <td>{as.currentUser === null ? (<>None</>):(<>    <Link className='link' to={`/employees/${as.currentUser.employeeId}`}>{ as.currentUser.firstName + ' ' +as.currentUser.lastName }</Link></>)
                    
                    }

                    </td>
                </tr> ))
              }
            </tbody>
        </table>    
     
    
    </div>    


  </div>
  )
}

export default Assets