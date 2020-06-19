import React from 'react'
import {connect} from 'react-redux'
// import {
//   fetchProject,
//   unassignRobotInDB,
//   updateProjectInDB,
// } from '../redux/singleProject';
// import Robot from './Robot';
// import { Link } from 'react-router-dom';
// import NotFoundPage from './NotFoundPage';

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: ''
    }
  }

  componentDidMount() {}

  render() {
    const user = this.props.user

    /*
    address: "1200 Broadway NY NY 10038"
createdAt: "2020-06-19T17:54:11.265Z"
email: "murphy@email.com"
firstName: "Murphy"
googleId: null
id: 1
imgUrl: "http://www.droid-life.com/wp-content/uploads/2014/05/beats-logo.jpg"
lastName: "Santos"
updatedAt: "2020-06-19T17:54:11.265Z"
userType: "admin"
    */
    return (
      <div>
        <h2>User Info</h2>
        <p>Name: {user.firstName}</p>
        <p>User type: {user.userType}</p>
        <img src={user.imgUrl} alt="" />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    // getProject: (projectId) => dispatch(fetchProject(projectId)),
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
