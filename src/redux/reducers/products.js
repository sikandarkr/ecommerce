const initialState = {
    loader: false,
    productData: [],
    productList: [],
    cart: [],
    cardaddloader: false,
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
        default:
            return state;
    }
}
