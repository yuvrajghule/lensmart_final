import './App.css';
import LoginPage from "./Components/LoginPage"
import PrivatRoute from "./Components/PrivatRoute"
import Product from "./Components/Product"
import Home from "./Components/Home"
import Cart from "./Components/Cart"
import Orders from "./Components/Orders"
import RegisterPage from "./Components/RegisterPage"
import Manageorders from './Components/Manageorders';
import Manageproducts from './Components/Manageproducts';
import {Routes, Route} from "react-router-dom";
import NavBar from './Components/NavBar';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doLogout } from './Components/auth/authentication';


function App() {
  const [Auth, setAuth]=useState(false);
  const [cart, setcart]=useState([]);
  const [order, setorder]=useState([]);

  const changeLog=()=>{
    setAuth(true)
  }
  
  const Logout=()=>{
    setAuth(false)
    doLogout();
  }
  
  return (
    <>
    <ToastContainer />
      <Routes>
        
        <Route element={<PrivatRoute Auth={Auth}/>} >
        <Route path="home" element={<Home Logout={Logout} cart={cart} setcart={setcart}/>} />
        <Route path="cart" element={<Cart cart={cart} order={order} setorder={setorder} setcart={setcart}/>} />
        <Route path="orders" element={<Orders  order={order} setcart={setcart} />} />
        <Route path="manageorders" element={<Manageorders/>} />
        <Route path="manageproducts" element={<Manageproducts/>} />
        
      </Route>
       
        <Route path="/" element={<LoginPage Auth={Auth} changeLog={changeLog}/>}/>
        <Route path="register" element={<RegisterPage />} />
      </Routes>
      </>
   
  );
}

export default App;
