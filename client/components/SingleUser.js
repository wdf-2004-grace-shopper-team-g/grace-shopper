import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSingleUser} from '../store/user'

/**
 * COMPONENT
 */

export class SingleUser extends React.Component {
  async componentDidMount() {
    const id = await this.props.match.params.id
    await this.props.getSingleUser(id)
  }

  render() {
    console.log('user props', this.props)
    let user = this.props.singleUser
    console.log('usador', user)

    return (
      <div>
        <h3>Check this user out!</h3>

        {user ? (
          <div>
            <Link key={user.user.id} to={`/users/${user.user.id}`}>
              <h2>{user.user.firstName}</h2>
            </Link>
            <img
              src={user.user.imgUrl}
              alt="user-Image"
              height="300px"
              width="300px"
            />
            <p>Email: {user.user.email}</p>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    )
  }
}

const mapState = state => {
  console.log('estado', state)
  return {
    singleUser: state.user.singleUser
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleUser: id => {
      dispatch(getSingleUser(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
