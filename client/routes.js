import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import SingleBeat from './components/SingleBeat'
import SingleUser from './components/SingleUser'

import AllBeats from './components/AllBeats'
import {
  Login,
  Signup,
  UserHome,
  UserProfile,
  Cart,
  AllUsers,
  GuestHome,
  About,
  Player
} from './components'
import {me} from './store'

// import { } from './components/AllUsers'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    // console.log('this is props', this.props)
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      // <Player prev={prev} next={next} toggle={toggle} isPlaying={isPlaying} />
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/home" component={GuestHome} />
        <Route exact path="/" component={GuestHome} />
        <Route path="/beats/:id" component={SingleBeat} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/beats/" component={AllBeats} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/about" component={About} />
        {isAdmin && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/" component={UserHome} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/users" component={AllUsers} />
            <Route path="/users/:id" component={SingleUser} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/" component={UserHome} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    async loadInitialData() {
      await dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
