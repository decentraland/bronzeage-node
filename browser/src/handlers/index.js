import im from 'immutable'


// ------------------------------------------
// MINER

export function MINER_INFO_REQUESTED(state) {
  return state
}

export function MINER_INFO_SUCCEDED(state, action) {
  return state.update('miner', miner => miner.merge(im.fromJS(action.miner)))
}

export function MINER_INFO_FAILED(state, action) {
  return state
}

export function UPDATE_MINING_REQUESTED(state) {
  return state
}

export function UPDATE_MINING_SUCCEDED(state, action) {
  return state
}

export function UPDATE_MINING_FAILED(state, action) {
  return state
}

// ------------------------------------------
// BLOCKCHAIN

export function BLOCKCHAIN_INFO_REQUESTED(state) {
  return state
}

export function BLOCKCHAIN_INFO_SUCCEDED(state, action) {
  return state.update('blockchain', blockchain => blockchain.merge(im.fromJS(action.blockchain)))
}

export function BLOCKCHAIN_INFO_FAILED(state, action) {
  return state
}

// ------------------------------------------
// TILES

export function TILES_REQUESTED(state) {
  return state
}

export function TILES_SUCCEDED(state, action) {
  return state.set('tiles', im.fromJS(action.tiles))
}

export function TILES_FAILED(state, action) {
  return state
}

export function TRANSFER_TILES_REQUESTED(state) {
  return state
}

// ------------------------------------------
// RPC

export function SEND_RPC_REQUESTED(state) {
  return state
}

export function SEND_RPC_SUCCEDED(state, action) {
  return state.set('rpcResult', im.fromJS(action.rpcResult))
}

export function SEND_RPC_FAILED(state, action) {
  return state
}

// ------------------------------------------
// MODALS

export function OPEN_MODAL(state, action) {
  return state.set('currentModal', action.modalId)
}

export function CLOSE_MODALS(state) {
  return state.set('currentModal', null)
}

export function CLOSE_MODAL(state, action) {
  // modalId not used yet, can be used to open more than one modal at a time, which is not currently supported
  return CLOSE_MODALS(state)
}
