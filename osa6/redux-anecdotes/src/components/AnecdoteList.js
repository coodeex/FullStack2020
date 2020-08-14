import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voteMessage, hideMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

  return (
    filteredAnecdotes.sort((a, b) => -(a.votes - b.votes)).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {
            dispatch(vote(anecdote.id))
            dispatch(voteMessage(anecdote.content))
            setTimeout(() => {
              dispatch(hideMessage())
            }, 5000)
          }}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList