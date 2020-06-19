import React from 'react'
import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import beat, {getSingleBeat} from '../store/beat'

/**
 * COMPONENT
 */

export class SingleBeat extends React.Component {
  async componentDidMount() {
    // console.log('props', this.props)
    // await this.props;
    const id = await this.props.match.params.id
    await this.props.getSingleBeat(id)
  }

  render() {
    console.log('props', this.props)
    const {beat} = this.props
    console.log('Beat', beat)
    // const projects = this.props.robot.singleRobot.projects || [];
    return (
      // console.log('props', this.props)
      <div>
        <h3>Check this beat out!</h3>
        {/* <Link key={beat.id} to={`/beats/${beat.id}`}>
        <h2>{beat.title}</h2>
        </Link>
        <img src={beat.imgUrl} alt="Beat-Image" height="300px" width="300px"/>
        <p>Release Date: {beat.releasedDate}</p>
        <p>Genre: {beat.genre}</p>
        <p>Price: {beat.price}</p>
    <p>Rating: {beat.rating}</p> */}
      </div>
    )
  }
}

const mapState = state => {
  console.log('this is state', state)
  return {
    beat: state.beat.beat
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleBeat: id => {
      dispatch(getSingleBeat(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleBeat)
