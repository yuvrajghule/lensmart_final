import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "../Styles/home.css";
import axios from "axios";
import { getcurrentuser } from "./auth/authentication";
import Button from '@mui/material/Button';

export default function Orders({order,setcart}){
 const [orders,setOrders] =useState([]);
  const user=getcurrentuser();
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePay = async (e) => {
    e.preventDefault();
    setPaymentStatus("Payment successful");
  }

  useEffect(()=>
  {
    axios.get('http://localhost:8080/orders',{
      params: {
        userId: user.email
    }
  }
  ).then(response=>
      {
        setOrders(response.data);
        // console.log(response.data);
      }).catch(error=>console.log(error))
  },[])
    return(
        <>
        <NavBar />
        { orders.length ?
        <div className="frame1">
        <div className="cartGrid">
          
        <div className="cartTable">
                    <table>
                    <thead >
                      <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                      {orders.map((order, index) => {
                        return (
                          <tbody className="outerRow" key={index}>
                        {order.orderItems.map((product)=>(
                        <tr key={index}>
                          <td>{index + 1}.&nbsp;&nbsp;{product.productName}</td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                        );
                      })}
                  </table>
                  </div>
                  {paymentStatus ? (
                <p style={{ fontWeight: 'bold', color: 'darkblue', textAlign: 'center' }}>{paymentStatus}</p>
              ) : 
                  (<Button onClick={handlePay} variant="contained" className="placeButton">Pay</Button>)}
                  </div>
                  </div> : <h1>No any order placed yet</h1> }
                  

        </>
    )
}
