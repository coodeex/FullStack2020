import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
// import axios from 'axios'
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

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [persons])

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        handleNumberUpdate(newName)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(personObject))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNumberUpdate = name => {
    const person = persons.find(p => p.name === name)
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(person.id, changedPerson)
      .then(response => {
        setPersons(persons.map(p => p.id !== person.id ? p : response.data))
      })
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const handleDeleteClick = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.name !== person.name))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
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