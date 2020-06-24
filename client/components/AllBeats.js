import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllBeats} from '../store/beat'
import {Button} from '@material-ui/core'
import {addBeatToCart} from '../store/cart'
import {deleteBeat} from '../store/deletebeat'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppFooter from './modules/views/AppFooter'

import CustomizedRatings from './rating'

export class AllBeats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: ''
    }
  }

  async componentDidMount() {
    await this.props.getAllBeats()

    const user = await this.props.user
    this.setState({userId: user.id})
  }

  addBeat(beatId) {
    this.props.addBeatToCart(this.state.userId, beatId)
    toast.success('🚀  Added Successfully!')
  }

  render() {
    const {isAdmin} = this.props
    let beats = this.props.beats.beats
    return (
      <div align="center" className="background">
        <React.Fragment>
          <h1>Browse Beats</h1>
          <ToastContainer />
          {isAdmin ? (
            <div>
              <div>
                <Button
                  className="white-link "
                  color="secondary"
                  variant="contained"
                >
                  <Link to="/add"> Add A New Beat</Link>
                </Button>
              </div>
              <br />
              <ul>
                {beats.map(beat => (
                  <li key={beat.id}>
                    <Link key={beat.id} to={`/beats/${beat.id}`}>
                      <h2> {beat.title} </h2>
                    </Link>
                    <img src={beat.imgUrl} height="400" width="600" />
                    <br />

                    <Button
                      className="white-link "
                      color="secondary"
                      variant="contained"
                    >
                      <Link to="/edit"> Edit Beat</Link>
                    </Button>

                    <Button
                      onClick={() => this.props.removeBeat(beat.id)}
                      className="white-link "
                      color="secondary"
                      variant="contained"
                    >
                      Remove Beat
                    </Button>

                    <p>Release Date: {beat.releasedDate}</p>
                    <p>Genre: {beat.genre}</p>
                    <p>Price: {beat.price}</p>
                    <p>Rating</p>
                    <CustomizedRatings rating={beat.rating} />
                  </li>
                ))}
              </ul>
            </div>
          ) : beats ? (
            <ul>
              {beats.map(beat => (
                <li key={beat.id}>
                  <Link key={beat.id} to={`/beats/${beat.id}`}>
                    <h2> {beat.title} </h2>
                  </Link>
                  <img src={beat.imgUrl} height="400" width="600" />
                  <br />
                  <Button
                    onClick={this.addBeat.bind(this, beat.id)}
                    className="white-link "
                    color="secondary"
                    variant="contained"
                  >
                    Add to cart
                  </Button>

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
        </React.Fragment>
        <AppFooter />
      </div>
    )
  }
}

const mapState = state => {
  return {
    beats: state.beat,
    user: state.user,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    getAllBeats: () => dispatch(getAllBeats()),
    addBeatToCart: (userId, beatId) => dispatch(addBeatToCart(userId, beatId)),
    removeBeat: id => dispatch(deleteBeat(id))
  }
}

export default connect(mapState, mapDispatch)(AllBeats)
