import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text} </button>

const Anecdote = ({anecdote, votes}) => (
  <div>
    <p>{anecdote} <br/>has {votes} votes </p>
  </div>
)

const MostVotes = ({len, points, anecdotes}) => {
  const j = Math.max(...points)
  let i = 0
  while(points[i]!==j) i++

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[i]} <br/>has {j} votes</p>
    </div>
  )
}



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const len = props.anecdotes.length
  const [points, setPoints] = useState(Array(len).fill(0))
  
  const handleVoteClick = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  const handleNextClick = () => {setSelected(Math.floor(Math.random()*len))}
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} votes={points[selected]}/>
      <Button handleClick={handleVoteClick} text={"vote"}/>
      <Button handleClick={handleNextClick} text={"next anecdote"} />
      <MostVotes len={len} points={points} anecdotes={props.anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)