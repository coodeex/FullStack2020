import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog}) => {
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


    console.log("handleremove")
    deleteBlog(blog.id)
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
          <br></br>
          <button onClick={handleRemove}>remove</button>        
        </>
      }
    </div>
  )
}

export default Blog
