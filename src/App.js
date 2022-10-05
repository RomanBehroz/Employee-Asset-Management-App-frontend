import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import ReactDOM from 'react-dom';  
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'

import NoPage from "./pages/NoPage";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Assets from "./pages/Assets";
import AddAsset from "./pages/AddAsset";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
/**
 *  @Author Roman Behroz
 * with this Application user will be able to track all the Employees and all the Assets/Devices that are handed over to these Employees
 * 
 * @returns Employee Asset Management Application
 */
function App() {
  return (
    <div className="container">
      
  
            <Header text='Employee Asset Management'/>
   
      <div className="page-col">
    
    
     
             <Sidebar/>
            <Routes>
            
            <Route path="/" element={<Home/>}></Route>
            <Route path="/employees" element={<Employees/>}></Route>
            <Route path="/employees/:id" element={<Profile/>}></Route>
            <Route path="/add-employee" element={<AddEmployee/>}></Route>
            <Route path="/assets" element={<Assets/>}></Route>
            <Route path="/add-asset/" element={<AddAsset/>}></Route>
            <Route path="*" element={<NoPage/>}></Route>
            </Routes>

      </div>
    
    <Footer/>
    </div>
  );
}

export default App;
