import { createContext, useReducer, useContext } from 'react'


const NotificationReducer = (state,action) => {
    console.log(action)
    switch(action.type) {
        case'MSG': 
            return action.payload
        case'RST':
            return null
    }
}
const NotiContext = createContext()


export const NotiContextProvider = (props) => {
  const [Message, MessageDispatch] = useReducer(NotificationReducer, null)
  
  return (
    <NotiContext.Provider value={[Message, MessageDispatch]}>
      {props.children}
    </NotiContext.Provider>
  )
}
export const useNotiValue = () => {
    const NotiAndDispatch = useContext(NotiContext)
    return NotiAndDispatch[0]
  }
  
export const useNotiDispatch = () => {
    const NotiAndDispatch = useContext(NotiContext)

    return NotiAndDispatch[1]
  }

export default NotiContext