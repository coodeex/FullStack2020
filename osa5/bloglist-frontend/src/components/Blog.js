import React, { useState } from 'react'

const Blog = ({ blog, likeBlog}) => {
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
    
    console.log("handlelike")

    const blogObject = {
      id: blog.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    likeBlog(blog.id, blogObject)
  }

  return (
    <div style={blogStyle}>
      {visible === null
        ? <>
          {blog.title}
          <button onClick={() => setVisible(1)}>view</button>
        </>
        : <>
          {blog.title}
          <button onClick={() => setVisible(null)}>hide</button>
          <br></br>
          {blog.url}
          <br></br>
          {blog.likes}
          <button onClick={handleLike}>like</button>
          {/* <button onClick={()=>console.log(blog)}>like</button> */}
          <br></br>
          {blog.author}
        </>
      }
    </div>
  )
}

export default Blog
