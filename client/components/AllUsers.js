import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/user'

/**
 * COMPONENT
 */

export class AllUsers extends React.Component {
  async componentDidMount() {
    // console.log('this is props', this.props)
    await this.props.getAllUsers()
  }

  render() {
    let users = this.props.users
    console.log('USERS***++++', users)

    return (
      <div>
        <h3>All Users</h3>
        {users ? (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <Link key={user.id} to={`/users/${user.id}`}>
                  <h2>
                    {' '}
                    {user.firstName} {user.lastName}{' '}
                  </h2>
                </Link>
                <img src={user.imgUrl} height="400" width="600" />
                <p>User Type: {user.userType}</p>
                <p>Email: {user.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    )
  }
}

const mapState = state => {
  console.log('this is user state', state)
  return {
    users: state.user.users
  }
}

const mapDispatch = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(getAllUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
