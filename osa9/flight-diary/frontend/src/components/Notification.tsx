interface Message{
    message:string|null
}
const Notification = (props:Message) => {
    if (props.message == null){
        return null
    }
    return (
        <p style={{color: "red",border:"solid"}}>{props.message}</p>
    )
        
    
    
}
export default Notification