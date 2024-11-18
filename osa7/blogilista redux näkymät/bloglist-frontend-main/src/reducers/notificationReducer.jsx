import { createSlice } from "@reduxjs/toolkit"
const notificationSlice = createSlice({
    name:'notification',
    initialState:{message:null,type:null},
    reducers:{
        changeMessage(state,action){
            const newstate = action.payload
            return newstate
        },
        resetMessage(state,action){
            const reset = {message:null,type:null}
            return reset
            
        }
    }
})
export const setNotification = (content,time) => {
    return async dispatch => {
        console.log(content,time)
        dispatch(changeMessage(content))
        setTimeout(() => {
        dispatch(resetMessage())
        }, time)
    }
}
export const {changeMessage,resetMessage} = notificationSlice.actions
export default notificationSlice.reducer