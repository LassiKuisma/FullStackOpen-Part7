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
          username
          <input id="username" type="text" name="Username" />
        </div>
        <div>
          password
          <input id="password" type="password" name="Password" />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
