import React, { useRef } from 'react';
import './HorizontalScroll.css';
import CartItemCard from '../CartItem/CartItemCard';

const ProductHrScroll = ({ title, items }) => {
  const scrollContainerRef = useRef(null);

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust this value as needed
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="horizontal-scroll-container">
      <h2 className="section-title">{title}</h2>
      <div className="horizontal-scroll" ref={scrollContainerRef}>
        {items.map((item) => (
          <CartItemCard key={item.product_id} item={item} />
        ))}
      </div>
      <button className="scroll-next-btn" onClick={scrollNext}>
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default ProductHrScroll;
