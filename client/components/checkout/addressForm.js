import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function AddressForm({addressVal, setAddressChange}) {
  console.log('OUTPUT: AddressForm -> addressVal', addressVal)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={addressVal.firstName}
            onChange={e => setAddressChange.setFirstName(e.target.value)}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={addressVal.lastName}
            onChange={e => setAddressChange.setLastName(e.target.value)}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={addressVal.address}
            onChange={e => setAddressChange.setAddress(e.target.value)}
            id="address"
            name="address"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={addressVal.city}
            onChange={e => setAddressChange.setCity(e.target.value)}
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={addressVal.stateAddress}
            onChange={e => setAddressChange.setStateAddress(e.target.value)}
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            type="number"
            id="simple-start-adornmhent"
            value={addressVal.zip}
            max={8}
            onChange={e => setAddressChange.setZip(e.target.value)}
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={addressVal.country}
            onChange={e => setAddressChange.setCountry(e.target.value)}
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
