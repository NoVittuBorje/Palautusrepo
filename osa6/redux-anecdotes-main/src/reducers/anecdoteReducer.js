import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"



const anecdoteSlice = createSlice({
    name:'anecdotes',
    initialState:[],
    reducers:{
        newAnecdote(state,action){
            state.push(action.payload)
        },
        Vote(state,action){
            const id = action.payload.id
            const anecdoteToChange = state.find(n => n.id === id)
            const changedAnecdote = {
              ...anecdoteToChange,
              votes:anecdoteToChange.votes+1
            }
            state = state.map(anecdote =>
            anecdote.id !== id ? anecdote : changedAnecdote)

            state = state.sort((a,b) => b.votes - a.votes)
            return state
        },
        appendAnecdote(state,action){
          state.push(action.payload)
        },
        setAnecdotes(state,action){
          return action.payload
        }
    }
})
export const createAnecdote = content => {  
  return async dispatch => {    
    const newAnecdote = await anecdoteService.createNew(content)    
    dispatch(appendAnecdote(newAnecdote))}}

export const voteAnecdote = content => {
  return async dispatch =>{
    const newAnecdote = {
      content:content.content,
      id:content.id,
      votes:content.votes +1
    }
    const update = await anecdoteService.update(content.id,newAnecdote)
    console.log(update,'update')
    dispatch(Vote(update))
  }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))  }}

export const { newAnecdote,Vote,appendAnecdote,setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer