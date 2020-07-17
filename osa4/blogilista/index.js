// const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

// const server = http.createServer(app)

const express = require('express')//
const app = express()//
const cors = require('cors')//
const mongoose = require('mongoose')//
const blogsRouter = require('./controllers/blogs')//


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)



app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})