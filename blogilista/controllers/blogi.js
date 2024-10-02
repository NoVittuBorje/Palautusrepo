const blogiRouter = require('express').Router()
const Blog = require('../models/blogi_model')
const logger = require("../utils/logger")


blogiRouter.get('/', (request, response) => {
    Blog.find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogiRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

module.exports = blogiRouter