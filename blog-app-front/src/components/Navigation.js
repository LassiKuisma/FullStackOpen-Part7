import { Link } from 'react-router-dom'

import LogoutForm from './LogoutForm'
import { AppBar, Button, IconButton, Toolbar } from '@mui/material'

const Navigation = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" />
          <Button color="inherit" component={Link} to={'/'}>
            Home
          </Button>
          <Button color="inherit" component={Link} to={'/users'}>
            Users
          </Button>
          <LogoutForm />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navigation
