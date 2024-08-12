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

function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const loading = useSelector(state => state.products.loading);
  useEffect(() => {
    dispatch(getProducts());
  }, [])
  return (
    <div className="App">
      <CrousalContainer />
      <Spin spinning={loading} tip="Just a moment.." size="large">
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