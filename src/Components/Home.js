import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "../Styles/home.css";
import axios from 'axios';
import { isLoggedIn } from "./auth/authentication";
import Product from "./Product";

export default function Home({ Logout, cart, setcart }) {
    
    let data = JSON.parse(localStorage.getItem("data"));
    const [id, setid] = useState(data.email)
    // const [cart, setcart]=useState([]);
    const [product, setproduct] = useState([])
    const [user, setUser] = useState(false);
    useEffect(() => {
        // Fetch getproductproduct details from the API
        axios.get("http://localhost:8080/home").then(response => {
            setproduct(response.data);
            console.log(response.data);
        })
        setUser(isLoggedIn());
    }, []);

    if (!product) {
        return <div>Loading</div>
    }
    return (
        <>
            <NavBar Logout={Logout} />
            <div id="productHomeBody" className="homePage">
                <h1 style={{ color: "black", fontFamily: 'Gill Sans' }}>Welcome</h1>
                {user ? product.map((prod, idd) => (
                    <Product prod={prod} cart={cart} setcart={setcart} key={idd} id={id} />
                )) : <h1>Admin</h1>}
            </div>

        </>
    )
}