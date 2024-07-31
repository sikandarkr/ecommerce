import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import fetchProductsLists from "../../services/ProductsService";
function* fetchProducts(action) {
   try {
      const products = yield call(fetchProductsLists.fetchProductsList);
      yield put({type: 'GET_PRODUCTS_SUCCESS', data: products});
   } catch (e) {
      yield put({type: 'GET_PRODUCTS_FAILED', message: e.message});
   }
}

function* ProductSaga() {
   yield takeLatest('GET_PRODUCTS_REQUESTED', fetchProducts);
}
 
export default ProductSaga;