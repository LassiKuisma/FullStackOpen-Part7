import { Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { tryLogin } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.login)
  if (user !== null) {
    // already logged in
    return <div></div>
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    dispatch(tryLogin(username, password))
    navigate('/')

    event.target.username.value = ''
    event.target.password.value = ''
  }

  const margins = {
    marginTop: '5px',
    marginBottom: '5px',
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="Username"
            type="text"
            id="username"
            name="Username"
            style={margins}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            id="password"
            name="Password"
            style={margins}
          />
        </div>
        <Button
          variant="outlined"
          id="login-button"
          type="submit"
          style={margins}
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
