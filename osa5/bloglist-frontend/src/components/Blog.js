import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(null)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
          <button >like</button>
          <br></br>
          {blog.author}
        </>
      }
    </div>
  )
}

export default Blog
