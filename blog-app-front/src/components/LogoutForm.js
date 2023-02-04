import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/loginReducer'

const LogoutForm = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)
  if (user === null) {
    return <></>
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    dispatch(logOut())
  }

  return (
    <>
      Logged in as {user.name}
      <button onClick={handleLogout}>Log out</button>
    </>
  )
}

export default LogoutForm
