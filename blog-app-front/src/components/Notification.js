import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  if (message === null || message === undefined) {
    return <div></div>
  }

  switch (type) {
    case 'green':
      return <Alert severity="success">{message}</Alert>
    case 'yellow':
      return <Alert severity="info">{message}</Alert>
    case 'red':
      return <Alert severity="error">{message}</Alert>
    default:
      return <Alert severity="info">{message}</Alert>
  }
}

export default Notification
