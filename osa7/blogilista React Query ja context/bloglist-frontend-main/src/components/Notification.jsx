
import { useNotiValue } from './NotificationContext'
const Notification = () => {
  const Message = useNotiValue()
  

  
  if (Message === null) return null

  return (
    <div className='message'>
      {Message}
    </div>
  )
}

export default Notification