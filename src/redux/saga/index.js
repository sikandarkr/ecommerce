import { all } from 'redux-saga/effects'
import ProductSaga from './products'

export default function* rootSaga() {
  yield all([
    ProductSaga(),
  ])
}