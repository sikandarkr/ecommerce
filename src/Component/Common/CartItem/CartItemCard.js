import React from 'react';
import './Cartitem.css';

const CartItemCard = ({ item }) => {
  const { product_image, product_name, product_price, product_store_name } = item;

  return (
    <div className="card">
      <img src={product_image} alt={product_name} className="card-image" />
      <div className="card-body">
        <h2 className="card-title">{product_name}</h2>
        <p className="card-price">MRP: ₹{product_price}</p>
        <p className="card-store">Store: {product_store_name}</p>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default CartItemCard;
