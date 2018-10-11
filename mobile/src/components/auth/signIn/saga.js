import { put, call, takeLatest } from 'redux-saga/effects'
import { Api } from '../../../api'
import { SIGN_IN_START, SIGN_IN_STARTED, SIGN_IN_SUCCESS, SIGN_IN_FAILED } from "./ducks";

function* signInGenerator(action) {
  try {
    yield put({type: SIGN_IN_STARTED });
    const responce = yield call( () => {
      return Api.signIn(action.payload.email, action.payload.password)
    });
    yield put({type: SIGN_IN_SUCCESS, payload: responce});
  } catch (e) {
    yield put({type: SIGN_IN_FAILED, payload: e})
  }
}

export default function* () {
  yield takeLatest(SIGN_IN_START, signInGenerator)
}