import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import async from "async";
import jwtDecode from "jwt-decode";
import {UserContext} from "../context";
import './login.css'
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";

/**
 *  @Author Roman Behroz
 * The page will be shown when no page is founded.
 * @returns No Page FOund Text
 */
const Login = () => {

    const [response, setResponse] = useState('');
    const {setUser, setAccessTokenInStorage} = useContext(UserContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const login = async () => {


            try {
                const formData = new URLSearchParams();
                formData.append('username', username);
                formData.append('password', password);

                const config = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString(),
                };

                const response = await fetch('http://localhost:8080/auth/login', config);

                if (response.ok) {
                    const data = await response.json();
                    setAccessTokenInStorage(data.access_token)
                    const accessTokenDecoded = jwtDecode(data.access_token);
                    setUser(accessTokenDecoded.sub)
                    setResponse(`Successfully submitted`);
                    navigate('/');
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            } catch (error) {
                setResponse(`Error: ${error.message}`);
            }

    }
    //
    // const getUsers = () =>{
    //
    //
    //     // Create a configuration object with the authorization header
    //     const config = {
    //         headers: {
    //             'Authorization': `Bearer ${authToken}`,
    //         },
    //     };
    //
    //     // Define your API endpoint
    //     const apiUrl = 'http://localhost:8080/auth/users'; // Replace with your API endpoint
    //
    //     // Make the GET request with Axios
    //     axios.get(apiUrl, config)
    //         .then((response) => {
    //            console.log(response.data)
    //
    //         })
    //         .catch((error) => {
    //             // Handle any errors here
    //             console.error('Error:', error);
    //         });
    // }


    return (
        <div className='login-page'>
                <br/>
                <br/>
               <h1 className='text-center'>Employee Asset Management</h1>

            <div className='login-form'>
                <div className='login-form-left'>
                <h1>Login</h1>
                    <div className='vertical-line'></div>
                </div>
                <div className='login-form-right'>

                    <div className='form-items'>
                        <p>Username</p>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' name='username' placeholder='Enter your username'/>
                        <p>Password</p>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='text' name='password' placeholder='Enter your Password'/>
                        <div onClick={login} className='btn btn-purple'>Login</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login