import { useDispatch, useSelector } from 'react-redux'
const Notification = () => {

  const notification = useSelector(state => state.notification)
  
  const dispatch = useDispatch()
 
  if (notification.message === null) {
    return null
  }
  if (notification.type === 'error'){
    return (
      <div className="error">
        {notification.message}
      </div>
    )}
  return (
    <div className="message">
    {notification.message}
    </div>
  )
  }
  


export default Notification