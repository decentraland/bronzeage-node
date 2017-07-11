import React from 'react'
import PropTypes from 'prop-types'


export default function Toggle({ active }) {
  return <h3>Toggle {active.toString()}</h3>
}

Toggle.propTypes = {
  active: PropTypes.object.boolean
}

