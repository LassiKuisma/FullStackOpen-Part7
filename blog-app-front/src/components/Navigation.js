import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LogoutForm from './LogoutForm'

const Navigation = () => {
  const user = useSelector((state) => state.login)

  const padding = {
    padding: 5,
  }

  const loginStatus = () => {
    return user === null ? <>Not logged in</> : <LogoutForm />
  }

  return (
    <div>
      <Link style={padding} to={'/'}>
        Home
      </Link>
      <Link style={padding} to={'/users'}>
        Users
      </Link>
      {loginStatus()}
    </div>
  )
}

export default Navigation
