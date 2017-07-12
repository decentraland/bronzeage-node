import { all, call, put, takeLatest } from 'redux-saga/effects'

import * as types from './actions/action-types'
import api from './lib/api'


function* fetchStats(action) {
   try {
      const blockchaininfo = yield call(api.RPCCall, 'getblockchaininfo')
      const minerinfo = yield call(api.RPCCall, 'getminerinfo')

      yield put({ type: types.STATS_FETCH.SUCCEEDED, stats: { blockchaininfo, minerinfo } })
   } catch (error) {
      console.error(error.message)
      yield put({ type: types.STATS_FETCH.FAILED, message: error.message })
   }
}


function* watchStatsFetch() {
  yield takeLatest(types.STATS_FETCH.REQUESTED, fetchStats)
}


export default function* rootSaga() {
  yield all([
    watchStatsFetch()
  ])
}
