import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LogoutForm from './LogoutForm'
import { AppBar, Button, IconButton, Toolbar } from '@mui/material'

const Navigation = () => {
  const user = useSelector((state) => state.login)

  const loginStatus = () => {
    return user === null ? <>Not logged in</> : <LogoutForm />
  }

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
          {loginStatus()}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navigation
