import React from 'react'


const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

const Header = ({name}) => <h2>{name}</h2>

const Content = ({parts}) => {
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)

  return (
    <div>
        {parts.map(part =>
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )}
      <b>total of {total} exercises</b>
    </div>
  )
}

export default Course