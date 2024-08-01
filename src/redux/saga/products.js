// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
// import * as type from '../types';
// import fetchProductsLists from "../../services/ProductsService";
// function* fetchProducts(action) {
//    try {
//       const products = yield call(fetchProductsLists.fetchProductsList);
//       yield put({type: 'GET_PRODUCTS_SUCCESS', data: products});
//    } catch (e) {
//       yield put({type: 'GET_PRODUCTS_FAILED', message: e.message});
//    }
// }
// function* addToCartSaga(action) {
//     console.log("hello..........");
//     try {
     
//     } catch (e) {
//       console.error(e);
//     }
//   }
  
// function* ProductSaga() {
//    yield takeLatest('GET_PRODUCTS_REQUESTED', fetchProducts);
//    yield takeEvery(type.ADD_TO_CART_REQUESTED, addToCartSaga);
// }
 
// export default ProductSaga;

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as type from '../types';
import fetchProductsLists from "../../services/ProductsService";

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
        console.log("From Saga...",products);
        // You can perform any side effects here, like API calls
        yield put({ type: 'ADD_TO_CART_SUCCESS', payload: action.payload });
    } catch (e) {
        console.error(e);
    }
}

function* ProductSaga() {
   yield takeLatest('GET_PRODUCTS_REQUESTED', fetchProducts);
   yield takeEvery(type.ADD_TO_CART_REQUESTED, addToCartSaga);
}

export default ProductSaga;
