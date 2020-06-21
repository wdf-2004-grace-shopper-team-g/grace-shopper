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
  // async componentDidMount() {
  //   const user = await this.props.user
  //   const t = await this.props.fetchCart(user.id)
  //   console.log("OUTPUT: Navbar -> componentDidMount -> t", t)
  // }
  render() {
    const {handleClick, isLoggedIn, isAdmin, cart, user} = this.props
    console.log('OUTPUT: Navbar -> render -> user', user)
    return (
      <div>
        <h1>Beat Heat Store</h1>
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

/*
- CREATE A REDUCER
guest
add to my cart 2 beats
if(user)  {
  do the fetchCart(userId)
}

*/
// const Navbar = ({handleClick, isLoggedIn, cart}) => (
//   <div>
//     <h1>Beat Heat Store</h1>

//     <nav>
//       {isLoggedIn ? (

//        <div>
//          {/* The navbar will show these links after you log in */}
//           <LoggedUserNavbar logout={handleClick} cart={cart}/>
//        </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>

// )

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
