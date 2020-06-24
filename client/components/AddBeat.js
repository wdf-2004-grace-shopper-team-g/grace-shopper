import React from 'react'
import {connect} from 'react-redux'
import {setBeat, updateBeat} from '../store/beat'
import {me} from '../store/user'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export class AddBeat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      description: '',
      price: 0,
      imgUrl: '',
      audioUrl: '',
      genre: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const user = this.props.user
    // this.setState({
    //   userId: user.id
    // })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let newBeat = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      price: this.state.price,
      imgUrl: this.state.imgUrl,
      audioUrl: this.state.audioUrl,
      genre: this.state.genre
    }
    const user = this.props

    console.log('USER', user)

    this.props.setBeat(newBeat)
    toast.success('🚀  Added Successfully!')

    this.setState({
      title: '',
      author: '',
      description: '',
      price: 0,
      imgUrl: '',
      audioUrl: '',
      genre: ''
    })
  }

  render() {
    console.log('dis props', this.props)
    return (
      <div align="center">
        <ToastContainer />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Beat Title:</label>
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Beat Title:"
            required
          />

          <label htmlFor="author">Author:</label>
          <input
            name="author"
            type="text"
            value={this.state.author}
            onChange={this.handleChange}
            placeholder="Author:"
            required
          />

          <label htmlFor="description">Description:</label>
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="Description:"
            required
          />

          <label htmlFor="price">Price:</label>
          <input
            name="price"
            type="text"
            value={this.state.price}
            onChange={this.handleChange}
            placeholder="Price:"
            required
          />

          <label htmlFor="imgUrl">imgUrl:</label>
          <input
            name="imgUrl"
            type="text"
            value={this.state.imgUrl}
            onChange={this.handleChange}
            placeholder="imgUrl:"
            required
          />

          <label>
            Choose Genre:
            <select
              value={this.state.genre}
              onChange={this.handleChange}
              name="genre"
            >
              <option value="Rap">Rap</option>
              <option value="Hip-hop">Hip-hop</option>
              <option value="Rock">Rock</option>
              <option value="Blues">Blues</option>
              <option value="Reggae">Reggae</option>
              <option value="Electric dance">Electric dance</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    setBeat: beat => dispatch(setBeat(beat)),
    updateBeat: (beat, id) => dispatch(updateBeat(beat, id))
  }
}

export default connect(mapState, mapDispatch)(AddBeat)
