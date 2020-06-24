import React from 'react'
import {connect} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  Grid,
  Paper,
  Container,
  Typography,
  ButtonBase,
  Button,
  ButtonGroup,
  Box,
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core'

import {fetchCart, removeBeat, updateQuantityInDB} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      quantity: 1
    }
    this.getPrice = this.getPrice.bind(this)
    this.selectedValue = this.selectedValue.bind(this)
  }

  async componentDidMount() {
    const user = await this.props.user
    this.setState({userId: user.id})
    this.props.fetchCart(user.id)
  }

  selectedValue(evt, beatId = 2) {
    const targetObj = {
      beatId: beatId,
      quantity: evt.target.value
    }
    // this.setState({quantity: numBeats})
    // this.props.updateQuantityInDB(2, targetObj)
  }

  getPrice = (priceInPennies, quantity = 1) => {
    const numBeats = Number(quantity)
    let numPennies = Number(priceInPennies)
    let dollars = numBeats * numPennies / 100
    dollars = dollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    return dollars
  }

  removeBeat(beatId) {
    this.props.removeBeat(this.state.userId, beatId)
  }

  render() {
    console.log('compDid', this.props)
    const cartInfo = this.props.cart
    return (
      <Container>
        <h2>Cart</h2>
        {cartInfo.beats ? (
          <div>
            <Box className="cart-header">
              <Typography variant="h6">
                Total Price:{' '}
                {cartInfo.totalPrice ? this.getPrice(cartInfo.totalPrice) : 0}
              </Typography>
              <Button
                className="white-link"
                color="secondary"
                component={RouterLink}
                to="/checkout"
                variant="contained"
              >
                Proceed to checkout
              </Button>
            </Box>
            {cartInfo.beats
              ? cartInfo.beats.map(beat => {
                  return (
                    <div key={beat.id}>
                      <div className="root">
                        <Paper className="paper padding-horizontal">
                          <Grid container spacing={2}>
                            <Grid item>
                              <ButtonBase className="image-prev">
                                <img
                                  className="img-def"
                                  alt="complex"
                                  src={beat.imgUrl}
                                />
                              </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                              <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                              >
                                <Grid item xs>
                                  <Typography gutterBottom variant="subtitle1">
                                    {beat.title} by {beat.author}
                                  </Typography>
                                  <Typography variant="body2" gutterBottom>
                                    {beat.description}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    Genre: {beat.genre}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    Rating: {beat.rating}
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    Released Date: {beat.releasedDate}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <ButtonGroup
                                    variant="text"
                                    color="primary"
                                    aria-label="text primary button group"
                                  >
                                    <Button className="btn-lowerCase">
                                      Quantity:
                                      <select
                                        value={beat.orderItem.quantity}
                                        onChange={this.selectedValue}
                                        // onChange={this.selectedValue.bind(
                                        //   this,
                                        //   beat.id
                                        // )}
                                      >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                      </select>
                                    </Button>

                                    <Button
                                      className="btn-lowerCase"
                                      onClick={this.removeBeat.bind(
                                        this,
                                        beat.id
                                      )}
                                    >
                                      Remove
                                    </Button>
                                    <Button
                                      className="btn-lowerCase"
                                      component={RouterLink}
                                      to="/beats"
                                    >
                                      Similar Products
                                    </Button>
                                  </ButtonGroup>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle1">
                                  {this.getPrice(
                                    beat.price,
                                    beat.orderItem.quantity
                                  )}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </div>
                    </div>
                  )
                })
              : null}
          </div>
        ) : (
          <Box display="flex" justifyContent="center" className="mt-3">
            <Button
              size="large"
              variant="contained"
              component={RouterLink}
              to="/beats"
            >
              Shop Now
            </Button>
          </Box>
        )}
      </Container>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(fetchCart(userId)),
    updateQuantityInDB: (userId, obj) =>
      dispatch(updateQuantityInDB(userId, obj)),
    removeBeat: (userId, beatId) => dispatch(removeBeat(userId, beatId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
