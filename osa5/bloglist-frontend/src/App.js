import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch(error => console.log(error))

    setMessageColor('green')
    setMessage(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageColor('red')
      setMessage(`wrong username or password`)
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
    console.log(window.localStorage)
  }

  const loginForm = () => (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        {user.name} logged in
        <button onClick={logout}>logout</button>
        <br /><br />
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
          <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            /><br></br>
            author:
          <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            /><br></br>
            url:
          <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
        </div>
      </>
    )
  }
  
  return (
    <div>
      <Message message={message} colour={messageColor} />
      {user === null
        ? loginForm()
        : blogForm()
      }
    </div>
  )
}

export default App