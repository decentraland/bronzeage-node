import im from 'immutable'
import PropTypes from 'prop-types'

import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import * as reactRedux from 'react-redux'
import reduxThunk from 'redux-thunk'

import * as handlers from './handlers'
import * as actions from './actions'


const INITIAL_STATE = im.fromJS({
  stats: {
    blockchaininfo: {},
    minerinfo: {
      stats: {},
      running: false
    }
  }
})


function invokeHandler(state, action) {
  console.log('[STORE]', action.type, action)

  let handler = handlers[action.type]

  if (! state) return INITIAL_STATE
  if (! handler) throw new Error(`Unknown store action ${action.type}`)

  return handler(state, action)
}


export const store = createStore(
  invokeHandler,
  applyMiddleware(reduxThunk)
)


export function dispatch(action) {
  if (typeof action === 'string') {
    store.dispatch({ type: action })

  } else {
    store.dispatch(action)
  }
}


export function getState() {
  return store.getState()
}


export function connect(Component) {
  function mapStateToProps(state, ownProps) {
    const selectors = Component.getState(state, ownProps)

    return selectors
  }

  function mapDispatchToProps(dispatch) {
    const actionCreators = Component.getActions(actions, dispatch)

    return {
      actions: bindActionCreators(actionCreators, dispatch)
    }
  }

  Component.propTypes.actions = PropTypes.object.isRequired

  return reactRedux.connect(mapStateToProps, mapDispatchToProps)(Component)
}
