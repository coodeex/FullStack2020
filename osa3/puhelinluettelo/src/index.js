import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div> name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ handleDeleteClick, persons, newFilter }) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1).map(person =>
        <li key={person.name}>
          {person.name} {person.number}
          <button type="submit" onClick={() => handleDeleteClick(person)}>delete</button>
        </li>
      )}
    </ul>
  )
}

const Message = ({ message, colour }) => {
  const addedStyle = {
    color: colour,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={addedStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => console.log(error))
  }, [message])

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      const person = persons.find(p => p.name===newName)
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        handleNumberUpdate(person)
      }
    }else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(() => {
          setPersons(persons.concat(personObject))
        })
        .catch(error => {
          setMessageColor('red')
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
      setMessageColor('green')
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNumberUpdate = (person) => {
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(person.id, changedPerson)
      .then(response => {
        setPersons(persons.map(p => p.id !== person.id ? p : response.data))
      })
      .catch(error => {
        console.log(error.response)
        setMessageColor('red')
        if (error.response.status === 400) {
          setMessage(error.response.data.error)
        }else{
          setMessage(`Information of ${changedPerson.name} has already removed from server`)
        }
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
    setMessageColor('green')
    setMessage(`Replaced the number of ${changedPerson.name} with a new one`)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const handleDeleteClick = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.name !== person.name))
        })
        .catch(error => {
          setMessageColor('red')
          setMessage(`Too fast! Error occured while deleting ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
      setMessageColor('green')
      setMessage(`Deleted ${person.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} colour={messageColor} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <button type="submit" onClick={() => console.log(persons)}>log persons</button>
      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons handleDeleteClick={handleDeleteClick} persons={persons} newFilter={newFilter} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))