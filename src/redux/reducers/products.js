const initialState = {
    loader: false,
    productData: [],
    productList: [],
    cart: [],
    cardaddloader: false,
    suggestions: [],
    searchResults: [],
    notificationCart: [],
    filter: "All",
    orderDetails: {}, // Reset orderDetails
    showpopup: false, // Set showpopup to false
    spinner: false,
    loading: false,
    otpStatus: false,
    isValidOtp: true
};

export default function products(state = initialState, action) {
    switch (action.type) {
        case "GET_PRODUCTS_REQUESTED":
            return { ...state, loading: true };
        case "GET_PRODUCTS_SUCCESS":
            return {
                ...state,
                productData: action.data,
                productList: action.data,
                loading: false,
            };
        case "GET_PRODUCTS_FAILED":
            return {
                ...state,
                productData: action.error,
                loading: false,
            };
        case "ADD_TO_CART_REQUESTED":
            return { ...state, cartaddloader: true };
        case "ADD_TO_CART_SUCCESS":
            return {
                ...state,
                cart: [...state.cart, action.payload],
                cartaddloader: false,
            };
        case "FETCH_SUGGESTIONS_SUCCESS":
            return {
                ...state,
                suggestions: action.suggestions,
            };
        case "SEARCH_REQUESTED":
            return {
                ...state,
                searchResults: action.payload,
            };
        case "CLEAR_SEARCH":
            return {
                ...state,
                searchResults: [],
            };
        case "UPDATE_CART_LOCAL":
            const updatedNotificationCart = Array.isArray(action.payload) ? action.payload : [];
            return {
                ...state,
                cart: updatedNotificationCart,
            };
        case "UPDATE_CART_COUNT":
            const newCartItem = action.payload;
            const exists = state.cart.some(obj => obj.product_id === newCartItem.product_id);
            return {
                ...state,
                cart: exists ? state.cart : state.cart.concat(newCartItem)
            };
        case "REMOVE_CART":
            const productIdToRemove = action.payload;
            return {
                ...state,
                cart: state.cart.filter(item => item.product_id !== productIdToRemove)
            };
        case "APPLY_FILTER":
            return {
                ...state,
                filter: action.payload.filter
            };
        case "SEND_OTP_REQUESTING":
            return {
                ...state,
                spinner: true
            }
        case "SEND_OTP_SUCCESS":
            return {
                ...state,
                spinner: false,
                otpStatus: true
            }
        case "SEND_OTP_FAIL":
            return {
                ...state,
                spinner: false,
                otpStatus: false
            }
        case "PLACE_ORDER_REQUESTING":
            return {
                ...state,
                spinner: true,
                isValidOtp: true
            }
        case "PLACE_ORDER_SUCCESS":
            return {
                ...state,
                orderDetails: action.data,
                spinner: false,
                showpopup: true,
                otpStatus: false,
                isValidOtp: true
            }
        case "PLACE_ORDER_FAILURE":
            return {
                ...state,
                orderDetails: action.data,
                spinner: false,
                showpopup: false,
                otpStatus: true,
                isValidOtp: false
            }
        case "CLOSE_POP_UP":
            return {
                ...state,
                showpopup: false,
                cart: [],
                orderDetails: {} // Clear orderDetails
            }
        case "CLOSE_OTP_MODAL":
            return {
                ...state,
                otpStatus:false,
                isValidOtp: true
            }

        default:
            return state;
    }
}
