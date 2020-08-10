import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, likeBlog, deleteBlog, username }) => {
  const [visible, setVisible] = useState(null)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (event) => {
    event.preventDefault()

    const blogObject = {
      id: blog.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    likeBlog(blogObject)
  }

  const handleRemove = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }


  return (
    <div style={blogStyle}>
      {visible === null
        ? <>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(1)}>view</button>
        </>
        : <>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(null)}>hide</button>
          <br></br>
          {blog.url}
          <br></br>
          {blog.likes}
          <button onClick={handleLike}>like</button>
          <br></br>
          {/* {blog.author}  */}
          {blog.creator}
          {username === blog.creator
            ? <>
              <br></br>
              <button onClick={handleRemove}>remove</button>
            </>
            : <></>
          }
        </>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog
