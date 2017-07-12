
export function STATS_FETCH_REQUESTED(state) {
  console.log('==================STATS_FETCH_REQUESTED==================')
  return state
}

export function STATS_FETCH_SUCCEDED(state, stats) {
  console.log('******************STATS_FETCH_SUCCEDED***************************')
  console.log(stats)
  console.log('******************STATS_FETCH_SUCCEDED***************************')
  return state.set('stats', stats)
}

export function STATS_FETCH_FAILED(state, error) {
  return state.updateIn('errors', errors => errors.set('stats', error))
}
