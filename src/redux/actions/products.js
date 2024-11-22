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
  
export const fetchSuggestions = (query) => ({
  type: type.FETCH_SUGGESTIONS_REQUESTED,
  payload: query,
});

export const onSearch = (query) => ({
  type: type.SEARCH_REQUESTED,
  payload: query,
});

export const onClear = () => ({
  type: type.CLEAR_SEARCH,
});
 


export const loadCartItems = (payload) => {
  console.log('Load Cart Items Payload:', payload); // Add this log
  return {
    type: type.UPDATE_CART_LOCAL,
    payload,
  };
};

export const updateCartCount = (payload)=>{
  return {
    type: type.UPDATE_CART_COUNT,
    payload,
  };
}
export const removeCart =(payload)=>{
  return {
    type: type.REMOVE_CART,
    payload,
  };
}