import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as type from '../types';
import fetchProductsLists from "../../services/ProductsService";
// import { placeOrder } from '../actions/products';

function* fetchProducts(action) {
   try {
      const products = yield call(fetchProductsLists.fetchProductsList);
      yield put({type: 'GET_PRODUCTS_SUCCESS', data: products});
   } catch (e) {
      yield put({type: 'GET_PRODUCTS_FAILED', message: e.message});
   }
}

function* addToCartSaga(action) {
    try {
        const products = yield call(fetchProductsLists.addCartList,action.payload);
        // You can perform any side effects here, like API calls
        yield put({ type: 'ADD_TO_CART_SUCCESS', payload: action.payload });
    } catch (e) {
        console.error(e);
    }
}

function* fetchSuggestionsSaga(action) {
   console.log("hello....",action.payload);
   const data = {"searchKey": action.payload };
   try {
       const suggestions = yield call(fetchProductsLists.fetchSuggestions, data);
       yield put({ type: 'FETCH_SUGGESTIONS_SUCCESS', suggestions });
   } catch (e) {
       console.error(e);
       yield put({ type: 'FETCH_SUGGESTIONS_FAILED', message: e.message });
   }
}

function* fetchSearchResults(action){
   console.log("ActionPayload...*&");
   try {
      const filterResult = yield call(fetchProductsLists.fetchSearchResultsFilter, action.payload);
      yield put({type: 'GET_PRODUCTS_SUCCESS', data: filterResult});
      // yield put({ type: 'FETCH_SUGGESTIONS_SUCCESS', suggestions });
  } catch (e) {
      console.error(e);
      yield put({ type: 'FETCH_SUGGESTIONS_FAILED', message: e.message });
  }
}

function* placeOrder(action){
   
    try {
        const orderDetail = yield call(fetchProductsLists.placeOrderService, action.payload);
        console.log("orderDetail*******",orderDetail);
        if(orderDetail.success){
            console.log("orderDetail22222222222*******",orderDetail);
            yield put({type: 'PLACE_ORDER_SUCCESS', data: orderDetail});
        }
        else{
            yield put({ type:'PLACE_ORDER_FAILURE',data:orderDetail });
        }
    } catch (e) {
        console.error(e);
        yield put({ type:'PLACE_ORDER_FAILURE', message: e.message });
    }
}
function* sendOtp(action){
    const orderDetail = yield call(fetchProductsLists.sendOtpHandler, action.payload);
    if(orderDetail.status=="success"){
        yield put({type:"SEND_OTP_SUCCESS",orderDetail})
    }
    else{
        yield put({type:"SEND_OTP_FAIL",orderDetail})
    } 
}

function* ProductSaga() {
   yield takeLatest('GET_PRODUCTS_REQUESTED', fetchProducts);
   yield takeEvery(type.ADD_TO_CART_REQUESTED, addToCartSaga);
   yield takeLatest(type.FETCH_SUGGESTIONS_REQUESTED, fetchSuggestionsSaga);
   yield takeLatest(type.SEARCH_FILTER_REQUESTING,fetchSearchResults);
   yield takeLatest(type.PLACE_ORDER_REQUESTING, placeOrder);
   yield takeLatest("SEND_OTP_REQUESTING",sendOtp);
}

export default ProductSaga;
