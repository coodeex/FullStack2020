import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog>', () => {
  const blog = {
    id: '5f2d306794fe5d0d781a15b0',
    likes: 666,
    author: 'test-author',
    title: 'this is a test blog title',
    url: 'www.testing.com'
  }

  let component

  const mockLikeBlog = jest.fn()

  //A blog requires functions likeBlog and deleteBlog so mockfunction jest.fn() is used here
  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeBlog={mockLikeBlog} deleteBlog={jest.fn()} username='testUserName' />
    )
  })

  test('5.13', () => {
    expect(component.container).toHaveTextContent(
      'this is a test blog title'
    )
  
    expect(component.container).toHaveTextContent(
      'test-author'
    )
  
    expect(component.container).not.toHaveTextContent(
      'www.testing.com'
    )
  
    expect(component.container).not.toHaveTextContent(
      '666'
    )
  })

  test('5.14', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'www.testing.com'
    )
  
    expect(component.container).toHaveTextContent(
      '666'
    )
  })

  test('5.15', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeBlog.mock.calls).toHaveLength(2)
  })

})