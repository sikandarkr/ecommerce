import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Flex, Spin } from 'antd';
import CartItemCard from '../../Component/Common/CartItem/CartItemCard'; // Adjust the import path as needed
import CrousalContainer from '../Common/CrousalContainer/CrousalContainer';
import UnfilteredProduct from '../UnfilteredProduct';
import FilteredProduct from '../FilteredProducts';
import { getProducts } from '../../redux/actions/products';
import Loader from '../Common/Loader/Loader';

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />
function Dashboard() {
  const [showUnfliter, setFilter] = useState(true)
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const loader = useSelector(state => state.products.loader);
  useEffect(() => {
    console.log("Products...", products);
    dispatch(getProducts());
  }, [])

  console.log("Products list...", products);
  return (
    <div className="App">
      <CrousalContainer />
      <Spin spinning={loader} tip="Loading" size="large">
        {products.filter === "All" ? (
          <UnfilteredProduct items={products && products.productList} />
        ) : (
          <FilteredProduct items={products && products.productList} />
        )}
      </Spin>

      {/*       
      {products.filter == "All" ? <UnfilteredProduct items={products && products.productList
      } /> : <FilteredProduct items={products && products.productList
      } />} */}
      
    </div>
  );
}

export default Dashboard;