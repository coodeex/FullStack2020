import React from 'react'
import { filterText } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    event.preventDefault()

    // input-kentän arvo muuttujassa event.target.value
    // console.log("event", text)
    // console.log("event type", typeof (text))
    dispatch(filterText(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
