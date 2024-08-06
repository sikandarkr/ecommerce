import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItemCard from '../../Component/Common/CartItem/CartItemCard'; // Adjust the import path as needed
import CrousalContainer from '../Common/CrousalContainer/CrousalContainer';
import UnfilteredProduct from '../UnfilteredProduct';
import FilteredProduct from '../FilteredProducts';
import { getProducts } from '../../redux/actions/products';
function Dashboard() {
  const [showUnfliter, setFilter] = useState(true)
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  useEffect(() => {
    console.log("Products...", products);
    dispatch(getProducts());
  }, [])

  console.log("Products list...", products);
  return (
    <div className="App">
      <CrousalContainer />
      {products.filter == "All" ? <UnfilteredProduct items={products && products.productList
      } /> : <FilteredProduct items={products && products.productList
      } />}
    </div>
  );
}

export default Dashboard;