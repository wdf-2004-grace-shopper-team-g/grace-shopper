import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {
  Container,
  AppBar,
  Toolbar,
  Badge,
  Link,
  Button
} from '@material-ui/core'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import PersonIcon from '@material-ui/icons/Person'

const GuestUserNavbar = ({logout, cart}) => {
  return (
    <AppBar className="primary-color" position="static">
      <Container>
        <Toolbar disableGutters className="toolbar">
          <Link className="white-link" component={RouterLink} to="/home">
            <img
              src="https://duckduckgo.com/i/7f3d4ac9.png"
              height="25px"
              width="25px"
              className="logo"
              alt="Logo"
            />
          </Link>

          <div className="hiddenDesk">
            <Link className="white-link" component={RouterLink} to="/beats">
              Beats
            </Link>
            <Link className="white-link" component={RouterLink} to="/about">
              About
            </Link>
            <Link className="white-link" component={RouterLink} to="/login">
              Login
            </Link>
            <Link className="white-link" component={RouterLink} to="/signup">
              Sign Up
            </Link>

            <Button
              className="white-link"
              color="secondary"
              component={RouterLink}
              to="/start-selling"
              variant="contained"
            >
              Start Selling
            </Button>
          </div>

          <div className="toolbarRight">
            <Badge color="secondary" className="xm-1">
              <Link className="white-link" component={RouterLink} to="/profile">
                <PersonIcon fontSize="large" />
              </Link>
            </Badge>

            <Badge color="secondary" className="xm-1">
              <Link className="white-link" component={RouterLink} to="/cart">
                <ShoppingCartOutlinedIcon fontSize="large" />
              </Link>
            </Badge>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default GuestUserNavbar
