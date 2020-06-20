import React from 'react'
import {connect} from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  Grid,
  Paper,
  Container,
  Typography,
  ButtonBase,
  Button,
  ButtonGroup
} from '@material-ui/core'
import {fetchCart} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const user = this.props.user
    this.props.fetchCart(user.id)
  }
  render() {
    const getPrice = priceInPennies => {
      let dollars = Number(priceInPennies) / 100
      dollars = dollars.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      return dollars
    }
    const cartInfo = this.props.cart
    return (
      <Container>
        <h2>Cart</h2>
        {cartInfo ? (
          <div>
            <p>Total Price: {cartInfo.totalPrice}</p>
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
                                    <Button className="btn-lowerCase">
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
                                  {getPrice(beat.price)}
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
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: userId => dispatch(fetchCart(userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
