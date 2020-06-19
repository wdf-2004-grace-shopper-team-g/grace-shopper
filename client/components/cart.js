/*
1. create profile page & display user info
2. get started with the cart
*/

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

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: ''
    }
  }

  // componentDidMount() {
  //   this.props.getProject(this.props.match.params.id);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (Object.keys(nextProps.project).length === 0) {
  //     this.setState({ projectNotFounded: true });
  //   }
  // }

  // handleUnassign(id) {
  //   const removeRobot = { id: id };
  //   this.props.unassignRobotInDB(this.props.match.params.id, removeRobot);
  // }

  // handleMarkComplete(id) {}

  // projectComplete(project) {
  //   const projectUpdated = {
  //     title: project.title,
  //     deadline: project.deadline,
  //     priority: project.priority,
  //     completed: true,
  //     description: project.description,
  //   };
  //   const id = this.props.match.params.id;
  //   this.props.updateProjectInDB(id, projectUpdated);
  // }

  render() {
    return <h2>Cart Cart</h2>
  }
}

const mapState = state => {
  return {
    project: state.project
  }
}
const mapDispatch = dispatch => {
  return {
    // getProject: (projectId) => dispatch(fetchProject(projectId)),
    // unassignRobotInDB: (projectId, removeRobotId) =>
    //   dispatch(unassignRobotInDB(projectId, removeRobotId)),
    // updateProjectInDB: (id, projectUpdated) =>
    //   dispatch(updateProjectInDB(id, projectUpdated)),
  }
}

export default connect(mapState, mapDispatch)(Cart)
