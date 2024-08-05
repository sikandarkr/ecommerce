import React from 'react';
import ProductHrScroll from '../Component/Common/ProductHrScroll/ProductHrScroll';

const UnfilteredProduct = ({ items = [] }) => {
  if (!Array.isArray(items)) {
    console.error("Items prop should be an array, but got:", items);
    items = [];
  }

  const groupedItems = groupByProductType(items);
  return (
    <div className="productContainer">
      {Object.keys(groupedItems).map((productType) => (
        <ProductHrScroll
          key={productType}
          title={productType}
          items={groupedItems[productType]}
        />
      ))}
    </div>
  );
}; 

const groupByProductType = (products) => {
  if (!Array.isArray(products)) {
    console.error("Products should be an array, but got:", products);
    return {};
  }

  return products.reduce((acc, product) => {
    const { product_type } = product;
    if (!acc[product_type]) {
      acc[product_type] = [];
    }
    acc[product_type].push(product);
    return acc;
  }, {});
};

export default UnfilteredProduct;
