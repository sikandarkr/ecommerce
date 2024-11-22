import React, { useEffect,  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import CartItemCard from '../../Component/Common/CartItem/CartItemCard'; // Adjust the import path as needed
import CrousalContainer from '../Common/CrousalContainer/CrousalContainer';
import UnfilteredProduct from '../UnfilteredProduct';
import FilteredProduct from '../FilteredProducts';
import { getProducts } from '../../redux/actions/products';
function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const [showUnfliter, setFilter] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const item = {
    image: 'https://via.placeholder.com/150',
    name: 'Sample Product',
    price: 999,
    rating: 4
  };
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  useEffect(() => {

    dispatch(getProducts());
  }, [dispatch])

  console.log("Products list...", products);
  return (
    <div className="App">
      <CrousalContainer />
      {showUnfliter ? <UnfilteredProduct items={products && products.productList
      } /> : <FilteredProduct />}
    </div>
  );
}

export default Dashboard;