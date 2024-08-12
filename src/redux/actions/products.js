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

export const fetchSearchResults =(payload)=>{
  return {
    type: type.SEARCH_FILTER_REQUESTING,
    payload,
  };
}

export const applyFilter=(payload)=>{
  console.log("apply filter...",payload);
  return {
    type: type.APPLY_FILTER,
    payload,
  };
   
}

export const placeOrder =(payload,mobile)=>{
  return {
    type: type.PLACE_ORDER_REQUESTING,
    payload,
    mobile
  };
}

export const closePopUp=()=>{
  return {
    type: "CLOSE_POP_UP",
  };
}

export const sendOtp=(payload)=>{
  return {
    type: "SEND_OTP_REQUESTING",
    payload
  };
}