const initialState = {
    loader: false,
    auth:false
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case "GET_PRODUCTS_REQUESTED":
            return { ...state, loading: true };
        default:
            return state;
    }
}
  