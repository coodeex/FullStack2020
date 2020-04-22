import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Average = ({good, neutral, bad}) => {
  return (
    <p>average {(good - bad)/(good + neutral + bad)} </p>
  )
}

const All = ({good, neutral, bad}) => {
  return (
  <p>all {good + neutral + bad}</p>
  )
}

const Positive = ({good, neutral, bad}) => {
  return (
  <p>positive {good*100/(good + neutral + bad)} %</p>
  )
}




const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <All good={good} neutral={neutral} bad={bad}/>
      <Average good={good} neutral={neutral} bad={bad}/>
      <Positive good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
