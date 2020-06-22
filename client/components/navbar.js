import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import LoggedUserNavbar from './loggedUserNavbar'
import LoggedAdminUserNavbar from './loggedAdminUserNavBar'
import GuestUserNavbar from './GuestUserNavbar'
import {fetchCart} from '../store/cart'

class Navbar extends React.Component {
  render() {
    const {handleClick, isLoggedIn, isAdmin, cart, user} = this.props

    return (
      <div>
        <h1 align="center">Beat Heat Store</h1>
        <nav>
          {isAdmin ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <LoggedAdminUserNavbar logout={handleClick} cart={cart} />
            </div>
          ) : isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <LoggedUserNavbar logout={handleClick} cart={cart} />
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <GuestUserNavbar cart={cart} />
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchCart(userId) {
      dispatch(fetchCart(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
