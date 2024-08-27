import { useState } from 'react'




const App = () => {
  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
  
    var max = arr[0];
    var maxIndex = 0;
  
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
  }
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState({
    quote:anecdotes[0],
    votes:[0,0,0,0,0,0,0,0],
    index:0
  })
  const handleRandom=() => {
    console.log(selected.quote,selected.votes[selected.index],selected.index)
    let random = Math.floor(Math.random() * 8)
    setSelected({...selected,
      quote:anecdotes[random],
      votes: selected.votes,
      index:random
  })}
  const handleVote=() => {
    const copy = selected.votes
    copy[selected.index] += 1
    setSelected({...selected,
      votes:copy
    })
    console.log(selected)
  }
  const MostVotes=() => {
    const array = selected.votes
    const maxindex = indexOfMax(array)

    const text = anecdotes[maxindex]
    console.log(text)
    return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{text}</p>
      <p>has {selected.votes[maxindex]} votes</p>
    </div>
    )
  }

  
  return (
  
    <div>
      <h1>Anecdote of the day</h1>
      <p>{selected.quote}</p>
      <p>has {selected.votes[selected.index]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleRandom}>next anecdote</button>
      <MostVotes/>
    </div>
  )
}

export default App