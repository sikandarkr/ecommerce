import * as type from '../types';


export function getProducts() {
    return {
      type: type.GET_PRODUCTS_REQUESTED,
    }
  }

  
  export const addToCart = (product) => ({
    type: type.ADD_TO_CART_REQUESTED,
    payload: product,
});
  
