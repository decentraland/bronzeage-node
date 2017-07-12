import React from 'react'
import PropTypes from 'prop-types'
import im from 'immutable'

import './RPCResult.css'


export default function RPCResult({ result }) {
  const resultAsText = JSON.stringify(result.toJS(), null, 2)
  return <pre className="RPCResult input scrolleable">{ resultAsText }</pre>
}

RPCResult.propTypes = {
  result: PropTypes.instanceOf(im.Map)
}
