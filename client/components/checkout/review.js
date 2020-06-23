import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

const products = []
// const products = [
//   { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
//   { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
//   { name: 'Product 3', desc: 'Something else', price: '$6.51' },
//   { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];
// const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  }
}))
const getPrice = priceInPennies => {
  let dollars = Number(priceInPennies) / 100
  dollars = dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return dollars
}

export default function Review({addressVal, paymentVal, cart}) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.beats.map(beat => (
          <ListItem className={classes.listItem} key={beat.id}>
            <ListItemText
              primary={beat.title}
              secondary={`by ${beat.author}`}
            />
            <Typography variant="body2">{getPrice(beat.price)}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {getPrice(cart.totalPrice)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{addressVal.firstName} </Typography>
          <Typography gutterBottom>{addressVal.address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Card Name:</Typography>
                <Typography gutterBottom>Card Number:</Typography>
                <Typography gutterBottom>Exp Date:</Typography>
                <Typography gutterBottom>CVV: </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{paymentVal.cardName}</Typography>
                <Typography gutterBottom>{paymentVal.cardNumber}</Typography>
                <Typography gutterBottom>{paymentVal.expDate}</Typography>
                <Typography gutterBottom>{paymentVal.cvv}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
