import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  if (message === null || message === undefined) {
    return <div></div>
  }

  const className =
    type === 'green' ? 'ok' : type === 'yellow' ? 'alert' : 'error'

  return <div className={className}>{message}</div>
}

export default Notification
