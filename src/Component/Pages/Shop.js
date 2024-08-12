import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UnfilteredProduct from '../UnfilteredProduct';
import FilteredProduct from '../FilteredProducts';
import { fetchSearchResults } from '../../redux/actions/products';
function Shop() {
    const location = useLocation();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const searchKey = location.state?.searchKey;

    useEffect(() => {
        if (searchKey) {
            dispatch(fetchSearchResults({ "searchKey": searchKey }));
        }
    }, [searchKey, dispatch]);
    return (
        <div>
            {products.filter=="All" ? <UnfilteredProduct items={products && products.productList
            } /> : <FilteredProduct items={products && products.productList
            }/>}
        </div>
    )
}

export default Shop;