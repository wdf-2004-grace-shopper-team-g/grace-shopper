import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProductHero from './modules/views/ProductHero'
import ProductValues from './modules/views/ProductValues'
import AllBeats from './AllBeats'

/**
 * COMPONENT
 */
export const GuestHome = props => {
  const {email} = props

  return (
    <div>
      <div>
        <h3>Welcome {email}!</h3>
        <ProductHero />
        <ProductValues />
        <AllBeats />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(GuestHome)

/**
 * PROP TYPES
 */
GuestHome.propTypes = {
  email: PropTypes.string
}
