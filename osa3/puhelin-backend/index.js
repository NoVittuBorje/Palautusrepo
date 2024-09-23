const express = require('express')
const app = express()


app.use(express.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
  ]
app.get("/info",(request,response) => {
  let pituus = persons.length
  var mydate = new Date();
  response.send(
    `<p>Phonebook has info on ${pituus} people <p/> ${mydate} `
  
  )
})

app.get('/api/persons/:id', (request, response) => {
      const id = request.params.id
      const person = persons.find(note => note.id === id)
      if (!person) {
        return response.status(400).json({
            error: "no person with thet id"
        })}
      response.json(person)})

app.get("/api/persons",(request,response) => {
  response.json(persons)
})
app.post("/api/persons", (request,response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: "content missing"
    })}
  
  const person = {
    "name": body.name,
    "number": body.number,
    "id": getRandomInt(0,99999)
  }
  persons = persons.concat(person)
  response.json(person)
})
app.delete('/api/persons/:id', (request, response) => {
  let id = Number(request.params.id)
  persons = persons.filter(note => {
    return note.id != id})
  response.json(persons)
})
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);}

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)