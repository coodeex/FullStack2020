import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
// import { createAnecdote } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

console.log(store.getState())
// store.subscribe(() => console.log(store.getState()))
// store.dispatch(createAnecdote("sssssssssssss"))

export default store
