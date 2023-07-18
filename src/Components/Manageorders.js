import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import '../Styles/ManageOrders.css';
import NavBar from './NavBar'
function Manageorders(){
  const [orders, setOrders] = useState([]);
  console.log(orders)

  useEffect(() => {
    axios.get('http://localhost:8080/admin/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);
  
  return(
    <>
      <NavBar />
        <div id="adminOrders" className='frame1'>
        { orders.length ?
          <div className="cartGrid">
            <div className="cartTable">
              <table>
                <thead>
                  <tr>
                    <th id="orderId">Order ID</th>
                    <th id="userId">User ID</th>
                    <th id="totalPrice">Total Price</th>
                    <th id="productName">Product Name</th>
                    <th id="productQuantity">Quantity</th>
                    <th id="productPrice">Price</th>
                  </tr>
                </thead>
                {orders.map((order, index) => {
                  const numItems = order.orderItems.length;

                  return (
                    <tbody className="outerRow" key={index}>
                      <tr>
                        <td rowSpan={numItems + 1}>{order.orderId}</td>
                        <td rowSpan={numItems + 1}>{order.userId}</td>
                        <td rowSpan={numItems + 1}>${order.totalPrice}</td>
                      </tr>
                      {order.orderItems.map((item, itemIndex) => (
                        <tr key={itemIndex}>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price}</td>
                        </tr>
                    ))}
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
          : <h1>No customer placed order yet</h1> }
        </div>
    </>
  )
}

export default Manageorders;