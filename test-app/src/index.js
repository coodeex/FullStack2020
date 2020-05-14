import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  const [messages, setMessages] = useState([
    {id: 1, text: "thervist", name: "jaakob"}, 
    {id: 2, text: "moro", name: "böri"} 
  ])
  const [newName, setNewName] = useState('')
  const [newMessage, setNewMessage] = useState('')

  const addMessage = (event) => {
    event.preventDefault()
    const messageObject = {
      id: messages.length + 1,
      text: newMessage,
      name: newName
    }
    setMessages(messages.concat(messageObject))
    setNewMessage('')
  }

  const handleMessageChange = (event) => setNewMessage(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)

  return (
    <div>
      <h1>Super Chat</h1>
      <form onSubmit={addMessage}>
        <div>username:
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>message:
          <input
            value={newMessage}
            onChange={handleMessageChange}
          />
          <button type="submit">send</button>
        </div>
      </form>

      <ul>
        {messages.map(message=>
          <li key={message.id}>{message.name}: {message.text}</li>  
        )}
      </ul>
    </div>
  )
}






// const Note = ({ note }) => {
//   return (
//     <li>{note.content}</li>
//   )
// }

// const App = (props) => {
//   const [notes, setNotes] = useState([])
//   const [newNote, setNewNote] = useState(
//     'a new note...'
//   ) 

//   const addNote = (event) => {
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       date: new Date().toISOString(),
//       important: Math.random() > 0.5,
//       id: notes.length + 1,
//     }

//     setNotes(notes.concat(noteObject))
//     setNewNote('')
//   }

//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }

//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map((note, i) => 
//           <Note key={i} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input
//           value={newNote}
//           onChange={handleNoteChange}
//         />
//         <button type="submit">save</button>
//       </form>   
//     </div>
//   )
// }

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     date: '2020-01-10T17:30:31.098Z',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only Javascript',
//     date: '2020-01-10T18:39:34.091Z',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     date: '2020-01-10T19:20:14.298Z',
//     important: true
//   }
// ]

ReactDOM.render(
  <App />,//notes={notes} />,
  document.getElementById('root')
)