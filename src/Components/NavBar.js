import {NavLink} from "react-router-dom";
import "../Styles/home.css";
import { useEffect, useState } from "react";
import { isLoggedIn } from "./auth/authentication";
export default function NavBar({Logout}){
    const [user,setUser]=useState()
    useEffect(()=>
    {
        setUser(isLoggedIn())
    })
    return(
        <>
        <div className="navbar" style={{backgroundColor: "#232f3e"}}>
            { user && (
                <>
                <NavLink style={{fontSize:"25px", paddingTop: "9px"}} className="link" to="/">Lens Mart</NavLink>
                <NavLink id="productHomeButton" className="link" to="/home">Home</NavLink>
                <NavLink id="productCartButton" className="link" to="/cart">Cart</NavLink>
                <NavLink id="productOrderButton" className="link" to="/orders">My Orders</NavLink>
                <NavLink id="logout" className="link" to="/" onClick={Logout}>Logout</NavLink>
                </>
            )

            }
            {
                !user &&
                (
                    <>
                    <NavLink style={{fontSize:"25px", paddingTop: "9px"}} className="link" to="/">Lens Mart</NavLink>
                    <NavLink id="adminProductButton" className="link" to="/manageproducts">Product</NavLink>
                    <NavLink id="adminOrderButton" className="link" to="/manageorders">Orders</NavLink>
                    <NavLink id="logout" className="link" to="/" onClick={Logout}>Logout</NavLink>
                    </>
                )
            }
            

        </div>
        </>
    )
}