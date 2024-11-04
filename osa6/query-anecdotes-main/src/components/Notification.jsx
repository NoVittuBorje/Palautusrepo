import { useContext } from 'react'
import { useNotiValue } from './NotificationContext'
const Notification = () => {
  const Message = useNotiValue()
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (Message === null) return null

  return (
    <div style={style}>
      {Message}
    </div>
  )
}

export default Notification
