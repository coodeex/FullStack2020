import React, { useState } from 'react'



// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )


const Hook = (props) => {
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
      <div>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <div>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
  )
}











// const Hook = (props) => {
//   const [ counter, setCounter ] = useState(0)

//   const increaseByOne = () => setCounter(counter + 1)
  
//   const setToZero = () => setCounter(0)

//   return (
//     <div>
//       <div>{counter}</div>
//       <button onClick={increaseByOne}>
//         plus
//       </button>
//       <button onClick={setToZero}>
//         zero
//       </button>
//     </div>
//   )
// }

export default Hook



















// import React from 'react';

// import ReactDOM from 'react-dom';
// import Heloust from './test';
// import Hook from './test2';


// const App = () => {
//   const name='Jaakob'

//   return (
//     <div>
//       <Heloust name={name}/>
//       <Hook/>
//     </div>
//   )
// }

// ReactDOM.render(<App />, document.getElementById('root'))