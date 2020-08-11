import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

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
    colour === 'green'
    ?
    <div style={addedStyle}>
      {message}
    </div>
    :
    <div className="error" style={addedStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState()
  const [newBlog, setNewBlog] = useState(null)


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

  const addBlog = (blogObject) => {

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch(error => console.log(error))

    setNewBlog(null)

    setMessageColor('green')
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const likeBlog = (blog) => {
    blogService
      .update(blog.id, blog)
      .then(response => {
        setBlogs(blogs.map(b => b.id !== blog.id ? b : response))
      })
      .catch(error => console.log(error))
  }

  const deleteBlog = (id) => {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== id))
      })
      .catch(error => console.log(error))
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
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
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
            id="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </>
  )

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const createNewBlog = (value) => {
    setNewBlog(value)
  }

  const blogPage = () => (
    <>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={logout}>logout</button>
      <br /><br />
      {newBlog !== null
        ? <>
          <BlogForm createBlog={addBlog} />
          <button onClick={() => createNewBlog(null)}>cancel</button>
        </>
        : <button onClick={() => createNewBlog(1)}>new Blog</button>
      }
      <div>
        {blogs.sort((a, b) => -(a.likes - b.likes)).map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} username={user.name} />
        )}
      </div>
    </>
  )

  return (
    <div>
      <Message message={message} colour={messageColor} />
      {user === null
        ? loginForm()
        : blogPage()

      }
    </div>
  )
}

export default App