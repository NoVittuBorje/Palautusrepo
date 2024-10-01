
const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
    
      <div className="Message">
        {message}
      </div>
    )
  }


export default Notification