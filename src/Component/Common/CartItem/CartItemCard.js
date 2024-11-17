// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {addToCart} from '../../../redux/actions/products';
// import './Cartitem.css';

// const CartItemCard = ({ item }) => {
//   const { product_image, product_name, product_price,
//     product_id, product_store_name 
//   } = item;
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.user);
//   const handleAddToCart = () => {
//    let payload = {
//       "user_id": 1,
//       "product_id":product_id,
//       "quantity": 1
//      }
//      if (user && user.id) {
//       // User is logged in, call the API to add to cart
//       dispatch(addToCart(payload));
//     } else {
//       // User is not logged in, save to local storage
//       saveToLocalStorage(payload);
//     }
//   };
//   const saveToLocalStorage = (payload) => {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const existingItemIndex = cart.findIndex(item => item.product_id === payload.product_id);
//     if (existingItemIndex !== -1) {
//       cart[existingItemIndex].quantity += payload.quantity;
//     } else {
//       cart.push(payload);
//     }
//     localStorage.setItem('cart', JSON.stringify(cart));
//     console.log("Cart saved to local storage:", cart);
//   };
//   return (
//     <div className="card">
//       <img src={product_image} alt={product_name} className="card-image" />
//       <div className="card-body">
//         <h2 className="card-title">{product_name}</h2>
//         <p className="card-price">MRP: ₹{product_price}</p>
//         <p className="card-store">Store: {product_store_name}</p>
//         <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
//       </div>
//     </div>
//   );
// };

// export default CartItemCard;


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCartCount } from '../../../redux/actions/products';
import './Cartitem.css';

const CartItemCard = ({ item }) => {
  const { product_image, product_name, product_price, product_id, product_store_name } = item;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
 

  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const payload = {
      user_id: 1,
      product_id,
      quantity: 1
    };

    if (user && user.id) {
      dispatch(addToCart(payload));
    } else {

      saveToLocalStorage(payload);
    }
    setInCart(true);
  };
  // useEffect(() => {
  //   const savedCartItems = localStorage.getItem('cart');
  //   if (savedCartItems) {
  //     dispatch(loadCartItems(JSON.parse(savedCartItems)));
  //   }
  // }, [dispatch]);
 

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    const payload = {
      user_id: 1,
      product_id,
      quantity: quantity + 1
    };
    if (user && user.id) {
      dispatch(addToCart(payload));
    } else {
      updateLocalStorage(payload);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      const payload = {
        user_id: 1,
        product_id,
        quantity: quantity - 1
      };
      if (user && user.id) {
        dispatch(addToCart(payload));
      } else {
        updateLocalStorage(payload);
      }
    } else {
      setInCart(false);
      removeFromLocalStorage(product_id);
    }
  };

  const saveToLocalStorage = (payload) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(payload);
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch(updateCartCount(payload))
    console.log("Cart saved to local storage:", cart);
  };

  const updateLocalStorage = (payload) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.product_id === payload.product_id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = payload.quantity;
    } else {
      cart.push(payload);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Cart updated in local storage:", cart);
  };

  const removeFromLocalStorage = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.product_id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Cart updated in local storage:", cart);
  };

  return (
    <div className="card">
      <img src={product_image} alt={product_name} className="card-image" />
      <div className="card-body">
        <h2 className="card-title">{product_name}</h2>
        <p className="card-price">MRP: ₹{product_price}</p>
        <p className="card-store">Store: {product_store_name}</p>
        {inCart ? (
          <div className="quantity-controls">
            <button className="increment-decrement-btn" onClick={handleDecrement}>-</button>
            <span className="quantity">{quantity}</span>
            <button className="increment-decrement-btn" onClick={handleIncrement}>+</button>
          </div>
        ) : (
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
        )}
      </div>
    </div>
  );
};

export default CartItemCard;
