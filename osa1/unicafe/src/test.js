import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Hook from './test2'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text} </button>

const StatisticLine = ({text, value, moreText}) => <p>{text} {value} {moreText}</p>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad)/(good + neutral + bad)
  const positive = good*100/(good + neutral + bad)

  if(!all) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={positive} moreText={"%"}/>
    </div>
  )
}

const App = () => {
  // const [good, setGood] = useState(0)
  // const [neutral, setNeutral] = useState(0)
  // const [bad, setBad] = useState(0)

  // const handleGoodClick = () => {setGood(good + 1)}
  // const handleNeutralClick = () => {setNeutral(neutral + 1)}
  // const handleBadClick = () => {setBad(bad + 1)}

  return (
    <div>
      {/* <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/> */}
      <Hook />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
