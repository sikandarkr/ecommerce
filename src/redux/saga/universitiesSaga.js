import { call, put, takeEvery } from 'redux-saga/effects'
import UniversityService from "../../services/UniversityService";
function* fetchUniversities(action) {
   try {
      const universities = yield call(UniversityService.fetchAndCacheUniversities);
      yield put({type: 'GET_UNIVERSITIES_SUCCESS', data: universities});
   } catch (e) {
      yield put({type: 'GET_UNIVERSITIES_FAILED', message: e.message});
   }
}

function* userSaga() {
   yield takeEvery('GET_UNIVERSITIES_REQUESTED', fetchUniversities);
}
 
export default userSaga;