import { useState } from "react"
const Notify = (props) => {

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
      }
    console.log(props.errorMessage)
    if (props.errorMessage === null) {
        return null
      }
    return (
    <div style={style}>
        {props.errorMessage}
    </div>
          
    )
}
export default Notify