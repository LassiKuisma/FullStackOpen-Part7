import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/loginReducer'

import { Button, styled } from '@mui/material'

// make the text of div match buttons
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  padding: theme.spacing(1),
}))

const LogoutForm = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)
  if (user === null) {
    return <Div>Not logged in</Div>
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    dispatch(logOut())
  }

  return (
    <>
      <Div>Logged in as {user.name}</Div>
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={handleLogout}
        style={{ margin: '5px' }}
      >
        Log out
      </Button>
    </>
  )
}

export default LogoutForm
