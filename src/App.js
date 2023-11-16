import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import ReactDOM from 'react-dom';  
import {Navigate, Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'

import NoPage from "./pages/NoPage";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Assets from "./pages/Assets";
import AddAsset from "./pages/AddAsset";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import AssetProfile from "./pages/AssetProfile";
import React, {useEffect, useState} from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Login from "./pages/Login";
import {UserContext} from "./context";
/**
 *  @Author Roman Behroz
 * with this Application user will be able to track all the Employees and all the Assets/Devices that are handed over to these Employees
 * 
 * @returns Employee Asset Management Application
 */
function App() {


    const [user, setUser] = useState(null);
    const [tokenExpired, setTokenExpired] = useState(true)


    const getAccessTokenFromStorage = () => {
        const accessToken =  window.localStorage.getItem("access_token");
        if(accessToken != null || accessToken !== ""){
            return accessToken;
        }
        return null;
    }

    const setAccessTokenInStorage = (accessToken) => {
        window.localStorage.setItem("access_token", accessToken);
    }

    const decodeAccessToken = () =>{
        const accessToken = getAccessTokenFromStorage();

        if(accessToken != null){
            const accessTokenDecoded = jwtDecode(getAccessTokenFromStorage())
            return accessTokenDecoded;
        }
        return null
    }

    const getAccessTokenExpiry = () =>{
        if(decodeAccessToken() != null){
            const expiry = decodeAccessToken().exp;
            return expiry;
        }
      return null;
    }
    const removeAccessTokenFromStorage = () =>{
        window.localStorage.removeItem("access_token")
    }

    const getAccessTokenUser = () =>{
        const user = decodeAccessToken().sub;
        return user;
    }

    useEffect(() =>{
       if(isTokenExpired()){
           logoutUser()
       }else{
           setUser(getAccessTokenUser())
       }


    }, [])

    const isTokenExpired =() =>{
        const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds
        if(getAccessTokenExpiry() != null){
            if (getAccessTokenExpiry() > currentTimestamp) {
                setTokenExpired(false)
                return false;

            } else {
                setTokenExpired(true)
                return true;
            }
        }
        return true;

    }

    const logoutUser = () =>{
        removeAccessTokenFromStorage()
        setUser(null)
    }



  return (
    <div className="container">

        <UserContext.Provider value={{user, setUser, getAccessTokenFromStorage, setAccessTokenInStorage, isTokenExpired, tokenExpired, logoutUser}}>
            {getAccessTokenFromStorage()?  <Header username="roman" text='Employee Asset Management'/> : <></>}


      <div className={getAccessTokenFromStorage()? "page-col" : <></>}>
          {getAccessTokenFromStorage() ? (
           <></>
          ) : (
              <Routes>
                  <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
          )}
          {getAccessTokenFromStorage()? <Sidebar/> : <></>}
            <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/employees" element={<Employees/>}></Route>
            <Route path="/employees/:id" element={<Profile/>}></Route>
            <Route path="/add-employee" element={<AddEmployee/>}></Route>
            <Route path="/assets" element={<Assets/>}></Route>
            <Route path="/assets/:id" element={<AssetProfile/>}></Route>
            <Route path="/add-asset/" element={<AddAsset/>}></Route>
                <Route path="/login/" element={<Login/>}></Route>
            <Route path="*" element={<NoPage/>}></Route>

            </Routes>

      </div>

    <Footer/>
        </UserContext.Provider>
    </div>
  );
}

export default App;
