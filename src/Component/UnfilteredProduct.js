import React from 'react';
import '../Component/css/unfilteredproduct.css';
import CartItemCard from '../Component/Common/CartItem/CartItemCard';

function UnfilteredProduct(props){
  const {items} = props;
//   console.log("your items...",items);
    return(
        <div className='productContainer'>
            <p>hello</p>
           <CartItemCard item={items} />
        </div>
    )
}

export default UnfilteredProduct;