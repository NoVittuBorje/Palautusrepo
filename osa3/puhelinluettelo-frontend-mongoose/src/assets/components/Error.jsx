const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
    
      <div className="Error">
        {message.error}
      </div>
    )
  }
export default ErrorNotification