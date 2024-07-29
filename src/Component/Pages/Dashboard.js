import React from 'react';
import CartItemCard from '../../Component/Common/CartItem/CartItemCard'; // Adjust the import path as needed

function Dashboard() {
  const item = {
    image: 'https://via.placeholder.com/150',
    name: 'Sample Product',
    price: 999,
    rating: 4
  };

  return (
    <div className="App">
      <CartItemCard item={item} />
    </div>
  );
}

export default Dashboard;