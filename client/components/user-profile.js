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
  return {}
}

export default connect(mapState, mapDispatch)(UserProfile)
