import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import blogService from '../services/blogs'

const LogoutForm = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)
  if (user === null) {
    return <div></div>
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)

    dispatch(setUser(null))
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
