import { Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { tryLogin } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

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

    event.target.username.value = ''
    event.target.password.value = ''
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
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            id="password"
            name="Password"
          />
        </div>
        <Button variant="outlined" id="login-button" type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
