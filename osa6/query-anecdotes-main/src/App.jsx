import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests' 
import { useContext } from 'react'
import { useNotiDispatch } from './components/NotificationContext'
const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotiDispatch()
  
  const newAnecdoteMutation = useMutation({
      mutationFn: createAnecdote,
      onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({type:'MSG',payload:`Created new anecdote ${anecdote.content}`})
      setTimeout(() => {
      dispatch({type:'RST'})
      }, 5000)
    },
    onError: (error) => {
      dispatch({type:'MSG',payload:`too short anecdote, must have lenght of 5 or more`})
      setTimeout(() => {
      dispatch({type:'RST'})
      }, 5000)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({type:'MSG',payload:`Voted for ${anecdote.content}`})
      setTimeout(() => {
      dispatch({type:'RST'})
      }, 5000)
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes +1 })
    
    
  }
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })

}
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm onCreate={onCreate} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
