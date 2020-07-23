const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('of number of blogs is right', async () => {
  const response = await api.get('/api/blogs')
  // console.log(response)
  expect(response.body).toHaveLength(2)
})


test('blog identifier is id', async () => {
  const response = await api.get('/api/blogs')
  console.log("\n\n\niidee\n\n",response.body[0].id)
  expect(response.body[0].id).toBeDefined
})

afterAll(() => {
  mongoose.connection.close()
})