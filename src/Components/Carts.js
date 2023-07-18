import React from 'react'

function Carts({item}) {
  
  return (
    <>
                        
                        <div className="cartBox">

                            <div className="imgBox">
                                <img src={item.imageUrl} alt="img" />
                            </div>

                            <div className="det">
                                <p >{item.productName}</p>
                                <p >${item.price}</p>
                                <button  className="cartremove">Remove</button>
                            </div>
                          
                        </div>
            
    </>
  )
}

export default Carts