const initMessage = 'hello'

const notificationReducer = (state = initMessage, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
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

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_MESSAGE',
    message: message
    })
    setTimeout(() => {
      dispatch(hideMessage())
    }, 1000*time)
  }
}

export default notificationReducer