import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogsService"
import loginService from "../services/loginService"
import { setNotification } from "./notificationReducer"
const userSlice = createSlice({
    name:'user',
    initialState:null,
    reducers:{
        setUser(state, action){
            return action.payload
        }
    }
})
export const initializeUser = (user) => {
    return async dispatch => {
    dispatch(setUser(user))
      blogsService.setToken(user.token)
    }
}
export const handleLogin = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
              username, password,
            })
            window.localStorage.setItem(
              'loggedUser', JSON.stringify(user)
            )
            blogsService.setToken(user.token)
            dispatch(setUser(user))

          } catch (exception) {
            console.log(exception.message)
            dispatch(setNotification({message:'wrong credentials',type:'error'},5000))
            
          }
    }
}
export const {setUser} = userSlice.actions
export default userSlice.reducer