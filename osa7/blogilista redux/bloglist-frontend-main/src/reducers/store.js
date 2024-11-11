import notificationReducer from './notificationReducer'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import { useReducer } from 'react'
import userReducer from './userReducer'

const store = configureStore({  
  reducer: 
  {  notification:notificationReducer,
    blogs:blogReducer,
    user:userReducer
  }})

export default store