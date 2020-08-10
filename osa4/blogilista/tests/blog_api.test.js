const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [{
  title: "First Post",
  author: "person",
  url: "https://www.google.com/",
  likes: 5,
  userId: "5f1eef58278fad17503a9aa5"
},
{
  title: "Kesämuistoja",
  author: "Kesä Esa",
  url: "https://www.google.com/search?q=summer",
  likes: 8,
  userId: "5f1eef58278fad17503a9aa5"

}]
let exampleUser = {}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const newUser1 = {
    username: 'juhax',
    name: 'Juuhan Lehti',
    password: 'salaisuus',
  }

  exampleUser1 = await api
    .post('/api/users')
    .send(newUser1)

    const newUser2 = {
      username: 'juhaxis',
      name: 'Juan Lelo',
      password: 'salaisuus',
    }
  
    exampleUser2 = await api
      .post('/api/users')
      .send(newUser2)

  // let blogObject = new Blog(initialBlogs[0])
  // await blogObject.save()

  // blogObject = new Blog(initialBlogs[1])
  // await blogObject.save()

  // console.log("User", exampleUser.body)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('of number of blogs is right', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog identifier is id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined
})


test('blogs length', async () => {
  const newBlog = {
    title: 'asynchronous',
    author: '4.10',
    url: 'https://www.google.com/search?q=asyncawait',
    likes: 4,
    userId: "5f1eef58278fad17503a9aa5"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(response.body.map(r => r.title)).toContain('asynchronous')
})

test('if likes has no value it is set to 0', async () => {
  const newBlog = {
    title: 'no likes value',
    author: '4.11',
    url: 'https://www.google.com/search?q=nolikes'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api.get('/api/blogs')
  expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('if new blogs do not have a title or a url', async () => {
  const newBlog = {
    url: 'https://www.google.com/search?q=nolikes',
    likes: 6
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

test('delete last post', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[response.body.length - 1].id

  await api.delete(`/api/blogs/${id}`)
    .expect(204)
})

test('modify last post', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[response.body.length - 1].id

  const newBlog = {
    title: 'modified',
    author: '4.14',
    url: 'https://www.google.com/search?q=modify',
    likes: 2
  }

  await api
    .put(`/api/blogs/${id}`)
    .send(newBlog)
    .expect(200)
})

afterAll(() => {
  mongoose.connection.close()
})