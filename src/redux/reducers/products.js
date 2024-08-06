const initialState = {
    loader: false,
    productData: [],
    productList: [],
    cart: [],
    cardaddloader: false,
    suggestions: [],
    searchResults: [],
    notificationCart: [],
    filter:"All"

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
                loader: false,
            };
        case "GET_PRODUCTS_FAILED":
            return {
                ...state,
                productData: action.error,
                loader: false,
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
            console.log("Payload:", action.payload);
            const updatedNotificationCart = Array.isArray(action.payload) ? action.payload : [];
            console.log("Updated Notification Cart:", updatedNotificationCart);
            return {
                ...state,
                cart: updatedNotificationCart,
            };
        case "UPDATE_CART_COUNT":
            console.log("Payload:", action.payload);
            const newCartItem = action.payload;
            const exists = state.cart.some(obj => obj.product_id === newCartItem.product_id);
            return {
                ...state,
                cart: exists ? state.cart : state.cart.concat(newCartItem)
            };
        case "REMOVE_CART":
            const productIdToRemove = action.payload;
            console.log("productIdToRemove...",productIdToRemove);
            return {
                ...state,
                cart: state.cart.filter(item => item.product_id !== productIdToRemove)
            };
        case "APPLY_FILTER":
            return {
                ...state,
                filter: action.payload.filter
            };
        default:
            return state;
    }
}
