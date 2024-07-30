import { call, put, takeEvery } from 'redux-saga/effects'
import fetchProductsLists from "../../services/ProductsService";
function* fetchProducts(action) {
   try {
      const products = yield call(fetchProductsLists.fetchProductsList);
      console.log("From Saga the products is...", products);
      yield put({type: 'GET_PRODUCTS_SUCCESS', data: products});
   } catch (e) {
      yield put({type: 'GET_PRODUCTS_FAILED', message: e.message});
   }
}

function* ProductSaga() {
   yield takeEvery('GET_PRODUCTS_REQUESTED', fetchProducts);
}
 
export default ProductSaga;