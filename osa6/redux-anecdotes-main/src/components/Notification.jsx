import { useDispatch, useSelector } from 'react-redux'
import {changeMessage, resetMessage} from '../reducers/notificationReducer'
const Notification = () => {

  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification === null) {
    return null
  }
  else{
    
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  
}

export default Notification