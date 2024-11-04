import { useDispatch, useSelector } from 'react-redux'
import {voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'






const AnecdoteList = () => {
  
    const anecdotes = useSelector(state => state.Anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
    var filteredanecdotes = [...anecdotes]
    var filtered = filteredanecdotes.filter((filteredanecdotes) => filteredanecdotes.content.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
        {filtered.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => {
                  dispatch(voteAnecdote(anecdote))
                  dispatch(setNotification(`you voted '${anecdote.content}'`, 2000))
                  } }>vote</button>
              </div>
            </div>
          )}
        </div>
    )}   
      



 
      

export default AnecdoteList