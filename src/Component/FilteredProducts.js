import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Empty } from 'antd';
import CartItemCard from './Common/CartItem/CartItemCard';
import './css/filterproduct.css';

function FilteredProduct() {
    const products = useSelector((state) => state.products);

    // Filter products based on product_type
    const filteredProducts = products && products.productData.filter(product => product.product_type === products.filter);

    return (
        <div className="productContainer">
            {filteredProducts.length === 0 ? (
                <div className="emptyBanner">
                    <Empty description="No Products Available" />
                </div>
            ) : (
                <Row gutter={[1, 32]}>
                    {filteredProducts.map((item, i) => (
                        <Col md={6} sm={12} xs={24} key={i}>
                           <CartItemCard key={item.product_id} item={item} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default FilteredProduct;
