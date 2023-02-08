import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/loginReducer'

import { Button } from '@mui/material'

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
      <div>Logged in as {user.name}</div>
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={handleLogout}
      >
        Log out
      </Button>
    </>
  )
}

export default LogoutForm
