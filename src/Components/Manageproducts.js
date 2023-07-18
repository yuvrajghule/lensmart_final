import React, { useEffect } from 'react'
import { useState } from 'react';
import NavBar from './NavBar';
import '../Styles/ProductPage.css';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import Button from '@mui/material/Button';

export default function Manageproducts() {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImageUrl, setProductImageUrl] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [id,setId]=useState(1);
    const [update, setUpdate] = useState(false);
    const [isEdit, setIsedit] = useState(false);
    const [Editid, setEditid] = useState('');
    

    const handleProductNameChange = (event) => {
      setProductName(event.target.value);
    };
  
    const handleProductPriceChange = (event) => {
      setProductPrice(event.target.value);
    };
  
    const handleProductImageUrlChange = (event) => {
      setProductImageUrl(event.target.value);
    };
  
    const handleProductQuantityChange = (event) => {
      setProductQuantity(event.target.value);
    };
    const handleDeleteProduct = (id,name) => {
      axios.get(`http://localhost:8080/admin/delete/${id}`).then(response=>
        {
          console.log(response.data)
        }).catch((error)=>
        {
          console.log(error)
        })
      // setProducts(prevProducts => prevProducts.filter(product => product.productName!== name));
    };
    const handleAddProduct = () => {
      const newProduct = {
        productName: productName,
        price: productPrice,
        imageUrl: productImageUrl,
        quantity: productQuantity,
      };
      
      axios.post("http://localhost:8080/admin/addProduct",newProduct).then(response=>
      {
        console.log(response.data)
      }).catch(error=>console.log(error));
      
      setProducts([...products, newProduct]);
      setProductName('');
      setProductPrice('');
      setProductImageUrl('');
      setProductQuantity('');
      setId((prevId) => prevId + 1);
    };

    const handleEdit = (id, name, price, quantity, url) => {
      setProductName(name)
      setIsedit(true)
      setEditid(id)
      setProductPrice(price)
      setProductQuantity(quantity)
      setProductImageUrl(url)
  
      // console.log(product.productName)
      console.log("clicked edit")
  
    }
  
    const handleUpdate = () => {
      const newProduct = {
        productName: productName,
        price: productPrice,
        imageUrl: productImageUrl,
        quantity: productQuantity,
        // toast.success('login Successfull');
      };
  
      axios.put(`http://localhost:8080/admin/productEdit/${Editid}`, newProduct)
        .then((response) => {
          console.log('Data updated successfully!');
          // Handle any further actions or update the state if needed
        })
        .catch((error) => {
          console.error('Error updating data:', error);
          // Handle any errors
        });
      setIsedit(false)
      setProductName('');
      setProductPrice('');
      setProductImageUrl('');
      setProductQuantity('');
    }
  
    useEffect(()=>
      {
        axios.get("http://localhost:8080/admin").then(response=>
        {
          setProducts(response.data);
        }).catch(error=>console.log(error))
      },[products])
  
    return (
        <>
        <NavBar/>
      <div className="page-container">
        <div className="content">
        <div className="table-container">
          <div className="cartTable">
            <table >
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <img className='productImage' src={product.imageUrl} alt={product.name} />
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <Button onClick={() => handleDeleteProduct(product.productId,product.productName)} id ={`deleteProduct${id}` }><DeleteIcon style={{ color: 'black' }}/></Button>
                      <Button onClick={() => handleEdit(product.productId, product.productName, product.price, product.quantity, product.imageUrl)} edit={`editProduct${id}`}><EditNoteOutlinedIcon style={{ color: 'black' }}/></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
          <div className="form-container">
            <h2 style={{color:"black",textAlign:"center"}}>Add Product</h2>
            <input
              type="text"
              placeholder="enter product name"
              id="enterProductName"
              value={productName}
              onChange={handleProductNameChange}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Enter product price"
              id="enterProductPrice"
              value={productPrice}
              onChange={handleProductPriceChange}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Enter image URL"
              id="enterProductimageUrl"
              value={productImageUrl}
              onChange={handleProductImageUrlChange}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Enter product quantity"
              id="enterProductQuantity"
              value={productQuantity}
              onChange={handleProductQuantityChange}
              className="form-input"
            />
            {
              
              isEdit ? <Button onClick={() => handleUpdate()} variant="contained" color="primary" className="add-button">Update</Button> :
                <Button onClick={handleAddProduct}  variant="contained" color="primary" className="add-button">Add</Button>
            }
          </div>
          
        </div>
      </div>
      </>
    );
}
