import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/loginReducer'

const LogoutForm = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)
  if (user === null) {
    return <div></div>
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    dispatch(logOut())
  }

  return (
    <div>
      <p>
        Logged in as {user.name}
        <button onClick={handleLogout}>Log out</button>
      </p>
    </div>
  )
}

export default LogoutForm
