import React from 'react';
import './Cartitem.css';

const CartItemCard = ({ item }) => {
  const { image, name, price, rating } = item;

  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="card-price">MRP: ₹{price}</p>
        <div className="card-rating">
          {Array.from({ length: 2 }, (_, index) => (
            <span key={index} className={index < rating ? 'star filled' : 'star'}>★</span>
          ))}
        </div>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default CartItemCard;
