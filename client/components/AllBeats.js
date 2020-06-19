import React from 'react'
import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import beat, {getAllBeats} from '../store/beat'

/**
 * COMPONENT
 */

export class AllBeats extends React.Component {
  async componentDidMount() {
    // console.log('props', this.props)
    // await this.props;
    await this.props.getAllBeats()
  }

  render() {
    console.log('props', this.props)
    const beats = this.props.beats
    console.log('Beats', beats)

    return (
      // console.log('props', this.props)
      <div>
        <h3>Browse Beats</h3>
        <ul>
          {/* {beats.map(beat => (
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

          ))} */}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  console.log('this is state', state)
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
