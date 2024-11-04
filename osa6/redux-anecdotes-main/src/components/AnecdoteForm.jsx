import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const Anecdoteform = () => {
  const dispatch = useDispatch()

  const newanecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`Added new anecdote '${content}'`, 2000))
    
    
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newanecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}


export default Anecdoteform