import React from 'react'
import  NewAnecdote  from './components/AnecdoteForm'
import AnecdoteForm from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <NewAnecdote />
    </div>
  )
}

export default App