import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function PaymentForm({paymentVal, setPaymentChange}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            value={paymentVal.cardName}
            onChange={e => setPaymentChange.setCardName(e.target.value)}
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            value={paymentVal.cardNumber}
            onChange={e => setPaymentChange.setCardNumber(e.target.value)}
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            value={paymentVal.expDate}
            onChange={e => setPaymentChange.setExpDate(e.target.value)}
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            value={paymentVal.cvv}
            onChange={e => setPaymentChange.setCvv(e.target.value)}
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
