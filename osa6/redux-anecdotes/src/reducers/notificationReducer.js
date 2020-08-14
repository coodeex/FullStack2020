const initMessage = 'hello'

const notificationReducer = (state = initMessage, action) => {
  switch (action.type) {
    case 'VOTE_MESSAGE':
      return action.message
    case 'HIDE_MESSAGE':
      return null
    default:
      return state
  }
}

export const hideMessage = () => {
  return {
    type: 'HIDE_MESSAGE'
  }
}

export const voteMessage = anecdote => {
  return {
    type: 'VOTE_MESSAGE',
    message: `you voted '${anecdote}'`
  }
}

export const createMessage = anecdote => {
  return {
    type: 'VOTE_MESSAGE',
    message: `you created a new anecdote: '${anecdote}'`
  }
}

// export voteMessage = anecdote => {
//   setVoteMessage(anecdote)

// }

export default notificationReducer