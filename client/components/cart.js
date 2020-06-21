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
  Box
} from '@material-ui/core'
import {fetchCart, removeBeat} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: ''
    }
    this.getPrice = this.getPrice.bind(this)
  }

  getPrice = priceInPennies => {
    let dollars = Number(priceInPennies) / 100
    dollars = dollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    return dollars
  }

  removeBeat(beatId) {
    this.props.removeBeat(this.state.userId, beatId)
  }

  async componentDidMount() {
    const user = await this.props.user
    this.setState({userId: user.id})
    this.props.fetchCart(user.id)
  }
  render() {
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
                to="/start-selling"
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
                                      Quantity: 1
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
                                    <Button className="btn-lowerCase">
                                      Similar Products
                                    </Button>
                                  </ButtonGroup>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle1">
                                  {this.getPrice(beat.price)}
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
          <CircularProgress color="secondary" />
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
    removeBeat: (userId, beatId) => dispatch(removeBeat(userId, beatId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
