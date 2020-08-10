import React from 'react'
import { renderToString } from 'react-dom/server'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test('<BlogForm /> calls a function createBlog with the right props', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#Title')
  const author = component.container.querySelector('#Author')
  const url = component.container.querySelector('#Url')

  const form = component.container.querySelector('form')

  fireEvent.change(title, { 
    target: { value: 'this is a test blog title' } 
  })
  fireEvent.change(author, { 
    target: { value: 'test-author' } 
  })
  fireEvent.change(url, { 
    target: { value: 'www.testing.com' } 
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  
  expect(createBlog.mock.calls[0][0].title).toBe('this is a test blog title' )
  expect(createBlog.mock.calls[0][0].author).toBe('test-author' )
  expect(createBlog.mock.calls[0][0].url).toBe('www.testing.com' )
})
