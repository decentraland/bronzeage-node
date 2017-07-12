import * as types from './action-types'


export const fetchStats = () => {
  return {
    type: types.STATS_FETCH.REQUESTED
  }
}
