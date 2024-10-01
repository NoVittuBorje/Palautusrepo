const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(requestLogger)
morgan.token('content', function(req, res) {return JSON.stringify(req.body)});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));

const unknownEndpoint = (request, response) => {
  response.send("index.html")
}

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url)


const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: false,
    trim: false,
    minlength: 3,
    maxlength: 40
},
  number: {
    type: String,
    required: true,
    lowercase: false,
    trim: false,
    minlength: 8,
    maxlength: 15,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{6,}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  }
})

const Person = mongoose.model('Person', PersonSchema)
PersonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



app.get("/info",(request,response) => {
  
  var mydate = new Date();
  Person.find({}).then(pituus => {
  response.send(`<p>Phonebook has info on ${pituus.length} people <p/> ${mydate} `)
  })
  
  
})

app.get('/api/persons/:id', (request, response,next) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)}
        else{response.status(404).end()}
      }).catch(error => next(error))})
      

app.get("/api/persons",(request,response) => {
  Person.find({}).then(persons => {
    response.json(persons)})
  
})

app.post("/api/persons", (request,response,next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ 
      error: "name missing"})}

  if (body.number === undefined) {
    return response.status(400).json({ 
      error: "number missing"})}

    const person = new Person({
        name: body.name,
        number: body.number,
      })
    
    person.save().then(result => {
        response.json(result)
        console.log('added '+body.name +" number "+body.number+ " to phonebook")})
        .catch(error => next(error))
})

app.put("/api/persons/:id",(request,response,next) => {
  Person.findByIdAndUpdate(request.params.id,request.body,{ new: true, runValidators: true, context: 'query' })
  .then(updatedPersons => {
    response.json(updatedPersons)}).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()})
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})