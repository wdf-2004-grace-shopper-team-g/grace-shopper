import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllBeats} from '../store/beat'

/**
 * COMPONENT
 */

export class AllBeats extends React.Component {
  async componentDidMount() {
    // console.log('this is props', this.props)
    await this.props.getAllBeats()
  }

  render() {
    let beats = this.props.beats.beats
    console.log('BEATS++++', beats)

    return (
      <div>
        <h3>Browse Beats</h3>
        {beats ? (
          <ul>
            {beats.map(beat => (
              <li key={beat.id}>
                <Link key={beat.id} to={`/beats/${beat.id}`}>
                  <h2> {beat.title} </h2>
                </Link>
                <img src={beat.imgUrl} height="400" width="600" />
                <p>Release Date: {beat.releasedDate}</p>
                <p>Genre: {beat.genre}</p>
                <p>Price: {beat.price}</p>
                <p>Rating: {beat.rating}</p>
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
  // console.log('this is state', state)
  return {
    beats: state.beat
  }
}

const mapDispatch = dispatch => {
  return {
    getAllBeats: () => {
      dispatch(getAllBeats())
    }
  }
}

export default connect(mapState, mapDispatch)(AllBeats)
