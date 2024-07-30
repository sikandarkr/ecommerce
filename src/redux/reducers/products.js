const initialState = {
    loader: false,
    productData: [],
    productList: [],
};

export default function products(state = initialState, action) {
    switch (action.type) {
        case "GET_PRODUCTS_REQUESTED":
            return { ...action.data, loading: true };
        case "GET_PRODUCTS_SUCCESS":
            return {
                // returning a copy of orignal state
                ...state, //copying the original state
                productData: action.data, //new todos array ,
                productList: action.data,
                loader: false,
            };
        case "GET_PRODUCTS_FAILED":
            return {
                ...state, //copying the original state
                productData: action.error,
                loader: false,
            };
        default:
            return state;
    }
}
