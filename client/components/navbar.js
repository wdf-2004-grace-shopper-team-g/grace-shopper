import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import allUsers from '../../client/store/user'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <h1>Beat Heat Store</h1>

    <nav>
      {isAdmin ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/users">View All Users</Link>
        </div>
      ) : isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    getAllUsers: () => {
      dispatch(allUsers())
    }
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

// _________________________________________________

// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {Link as RouterLink} from 'react-router-dom'
// import {logout} from '../store'
// import { isAdmin } from '../../server/api/utility'

// const NotLoggedIn = () => (
//   <div>
//     {/* The navbar will show these links before you log in */}
//     <Link
//       variant="button"
//       color="textPrimary"
//       to="/experiences"
//       component={RouterLink}
//       className={useStyles().link}
//     >
//       Experiences
//     </Link>
//     <Link
//       variant="button"
//       color="textPrimary"
//       component={RouterLink}
//       to="/cart"
//       className={useStyles().link}
//     >
//       Cart
//     </Link>
//     <Link
//       variant="button"
//       color="textPrimary"
//       component={RouterLink}
//       to="/signup"
//       className={useStyles().link}
//     >
//       Sign Up
//     </Link>
//     <Button
//       component={RouterLink}
//       to="/login"
//       color="primary"
//       variant="outlined"
//       className={useStyles().link}
//     >
//       Login
//     </Button>
//   </div>
// )

// const LoggedIn = props => (
//   <div>
//     {/* The navbar will show these links after you log in */}

//     <Link
//       variant="button"
//       color="textPrimary"
//       component={RouterLink}
//       to="/home"
//       className={useStyles().link}
//     >
//       Home
//     </Link>
//     <Link
//       variant="button"
//       color="textPrimary"
//       component={RouterLink}
//       to="/experiences"
//       className={useStyles().link}
//     >
//       Experiences
//     </Link>
//     <Link
//       variant="button"
//       color="textPrimary"
//       component={RouterLink}
//       to="/cart"
//       className={useStyles().link}
//     >
//       Cart
//     </Link>
//     <Button
//       component={RouterLink}
//       to="#"
//       color="primary"
//       variant="outlined"
//       className={useStyles().link}
//       onClick={props.handleClick}
//     >
//       Logout
//     </Button>
//   </div>
// )

// const Admin = props => (
//   <div>
//     {/* The navbar will show these links after admins log in */}
//     <Link
//       variant="button"
//       color="textPrimary"
//       component={RouterLink}
//       to="/home"
//       className={useStyles().link}
//     >
//       Home
//     </Link>
//     <Link
//       variant="button"
//       color="textPrimary"
//       component={RouterLink}
//       to="/experiences"
//       className={useStyles().link}
//     >
//       Experiences
//     </Link>
//     <Link
//       variant="button"
//       color="textPrimary"
//       component={RouterLink}
//       to="/cart"
//       className={useStyles().link}
//     >
//       Cart
//     </Link>
//     <Link
//       variant="button"
//       color="textPrimary"
//       component={RouterLink}
//       to="/admin"
//       className={useStyles().link}
//     >
//       Admin
//     </Link>
//     <Button
//       component={RouterLink}
//       to="#"
//       color="primary"
//       variant="outlined"
//       className={useStyles().link}
//       onClick={props.handleClick}
//     >
//       Logout
//     </Button>
//   </div>
// )

// const Navbar = props => {
//   const classes = useStyles()
//   let navRoutes = () => {
//     if (props.isAdmin) {
//       return <Admin handleClick={props.handleClick} />
//     } else if (props.isLoggedIn) {
//       return <LoggedIn handleClick={props.handleClick} />
//     } else {
//       return <NotLoggedIn />
//     }
//   }

//   return (
//     <AppBar
//       position="sticky"
//       color="default"
//       elevation={0}
//       className={classes.appBar}
//     >
//       <Toolbar className={classes.toolbar}>
//         <Typography className={classes.toolbarTitle}>
//           <Link
//             variant="h6"
//             color="inherit"
//             noWrap
//             component={RouterLink}
//             to="/"
//           >
//             FameX
//           </Link>
//         </Typography>
//         <nav>{navRoutes()}</nav>
//       </Toolbar>
//     </AppBar>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id,
//     isAdmin: !!state.user.isAdmin
//   }
// }

// const mapDispatch = dispatch => {
//   function handleClick() {
//     dispatch(logout())
//   }
//   return {
//     handleClick
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
//   isAdmin: PropTypes.bool.isRequired
// }
