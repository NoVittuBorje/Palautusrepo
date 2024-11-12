import { createContext, useReducer, useContext } from 'react'


const UserReducer = (state,action) => {
    switch(action.type) {
        case'Login':
            return action.payload.user
        case'Logout':
          return action.payload  
    }
}
const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [User, UserDispatch] = useReducer(UserReducer, null)
    
    return (
      <UserContext.Provider value={[User, UserDispatch]}>
        {props.children}
      </UserContext.Provider>
    )
  }
  export const useUserValue = () => {
      const UserAndDispatch = useContext(UserContext)
      return UserAndDispatch[0]
    }
    
  export const useUserDispatch = () => {
      const UserAndDispatch = useContext(UserContext)
      return UserAndDispatch[1]
    }
  
  export default UserContext