import { all, call, put, takeLatest } from 'redux-saga/effects'

import * as types from './actions/action-types'
import api from './lib/api'


function* fetchMinerInfo(action) {
  try {
    const minerinfo = yield call(() => api.RPCCall('getminerinfo'))
    const address = yield call(() => api.RPCCall('getnewaddress'))

    // Flatten the object (removing the stats key)
    const miner = { address, running: minerinfo.running, ...minerinfo.stats }

    yield put({ type: types.MINER_INFO.SUCCEDED, miner })
  } catch (error) {
    yield put({ type: types.MINER_INFO.FAILED, message: error.message })
  }
}

function* updateMiningState(action) {
  try {
    const command = {
      false: 'stopmining',
      true: 'startmining'
    }[action.running]

    // Update the UI right away, this should be handled in loading
    const miner = { running: action.running }
    yield put({ type: types.MINER_INFO.SUCCEDED, miner })

    yield call(() => api.RPCCall(command))
    yield put({ type: types.UPDATE_MINING.SUCCEDED })

    // Update the minerstate and reflect the UI
    yield fetchMinerInfo()

  } catch (error) {
    yield put({ type: types.UPDATE_MINING.FAILED, message: error.message })
  }
}

function* fetchBlockchainInfo(action) {
  try {
    const blockchain = yield call(() => api.RPCCall('getblockchaininfo'))

    yield put({ type: types.BLOCKCHAIN_INFO.SUCCEDED, blockchain })
  } catch (error) {
    yield put({ type: types.BLOCKCHAIN_INFO.FAILED, message: error.message })
  }
}


// -------------------------------------------------------------------------
// Watchers

function* watchMinerInfoFetch() {
  yield takeLatest(types.MINER_INFO.REQUESTED, fetchMinerInfo)
}

function* watchMiningUpdate() {
  yield takeLatest(types.UPDATE_MINING.REQUESTED, updateMiningState)
}

function* watchBlockchainInfoFetch() {
  yield takeLatest(types.BLOCKCHAIN_INFO.REQUESTED, fetchBlockchainInfo)
}


export default function* rootSaga() {
  yield all([
    watchMinerInfoFetch(),
    watchMiningUpdate(),
    watchBlockchainInfoFetch()
  ])
}
