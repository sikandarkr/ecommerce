import { all } from 'redux-saga/effects'
import universitiesSaga from './universitiesSaga'

export default function* rootSaga() {
  yield all([
    universitiesSaga(),
  ])
}