const groupByProductType = (products) => {
    return products.reduce((acc, product) => {
      const { product_type } = product;
      if (!acc[product_type]) {
        acc[product_type] = [];
      }
      acc[product_type].push(product);
      return acc;
    }, {});
  };
  