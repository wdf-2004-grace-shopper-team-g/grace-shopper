import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AppFooter from './modules/views/AppFooter'
import ProductHero from './modules/views/ProductHero'
import ProductValues from './modules/views/ProductValues'
import AllBeats from './AllBeats'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isAdmin} = props

  return (
    <div>
      {isAdmin ? (
        <div>
          <h3>Welcome Admin, {email}</h3>
          <ProductHero />
          <ProductValues />
          <AllBeats />
          <AppFooter />
        </div>
      ) : (
        <div>
          <h3>Welcome, {email}</h3>
          <ProductHero />
          <ProductValues />
          <AllBeats />
          <AppFooter />
        </div>
      )}
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
