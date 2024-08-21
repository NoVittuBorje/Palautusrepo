import { useState } from 'react'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  return(
    <tr>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={good+neutral+bad} />
      <StatisticLine text="average" value ={((good-bad)/(good+neutral+bad)).toFixed(1)} />
      <StatisticLine text="positive" value ={(good/(good+neutral+bad)*100).toFixed(1)+"%"} />
    </tr>
  )
}
const StatisticLine = (props) => {
  const text = props.text
  if (text != "positive")
    props.value
  const value = props.value
  return (
  <tr>
  <td>{text} </td>
  <td>{value}</td>
  </tr>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Handlegood = () => {
    console.log("cliked good")
    setGood(good+1)
  }
  const Handleneutral = () => {
    console.log("cliked neutral")
    setNeutral(neutral+1)
  }
  const Handlebad = () => {
    console.log("cliked bad")
    setBad(bad+1)
  }
  return (
  <div>
    <div>
      <h1>Give feedback</h1>
      <button onClick={Handlegood}>good</button>
      <button onClick={Handleneutral}>neutral</button>
      <button onClick={Handlebad}>bad</button>
  <table>
  <td>
  <Statistics good={good} neutral={neutral} bad= {bad} />
  </td>
  </table>
    </div>
  </div>

  )
}

export default App
