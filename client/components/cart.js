import React from 'react'
import {connect} from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
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
    const cartInfo = this.props.cart
    return (
      <div>
        <h2>Cart</h2>
        {cartInfo ? (
          <div>
            <p>Total Price: {cartInfo.totalPrice}</p>
            {cartInfo.beats
              ? cartInfo.beats.map(beat => {
                  return (
                    <div key={beat.id}>
                      <div className="root">
                        <Paper className="paper">
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
                                    Released Date: {beat.releasedDate}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    variant="body2"
                                    style={{cursor: 'pointer'}}
                                  >
                                    Remove
                                  </Typography>
                                </Grid>
                              </Grid>

                              {/*  */}
                              {/* <Grid container spacing={3}>
                              <Grid item xs={3}>
                                <Paper className="paper">xs=3</Paper>
                              </Grid>
                            </Grid> */}

                              {/*  */}
                              <Grid item>
                                <Typography variant="subtitle1">
                                  $19.00
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
      </div>
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
