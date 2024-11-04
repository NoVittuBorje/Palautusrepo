
import anecdoteReducer,{setAnecdotes} from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({  
  reducer: 
  {  Anecdotes: anecdoteReducer,  
    filter: filterReducer,
    notification:notificationReducer
  }})

export default store