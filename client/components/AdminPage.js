import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const AdminPage = ({handleClick, isAdmin}) => (
  <div>
    <h2>Hello, Admin</h2>

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
          <Link to="/users">1st Option: View All Users</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/users">View All Users</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)
