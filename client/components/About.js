import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProductHero from './modules/views/ProductHero'
import ProductValues from './modules/views/ProductValues'
import AllBeats from './AllBeats'

/**
 * COMPONENT
 */
export const About = props => {
  return (
    <div>
      <div>
        <h3 align="center">About Beat Heat Store</h3>
        <div align="center">
          <img
            src="https://duckduckgo.com/i/7f3d4ac9.png"
            height="200px"
            width="200px"
            className="logo"
            alt="Logo"
          />
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {}
}

export default connect(mapState)(About)

/**
 * PROP TYPES
 */
About.propTypes = {
  email: PropTypes.string
}
