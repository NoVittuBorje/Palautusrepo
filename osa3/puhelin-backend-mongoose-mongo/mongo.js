
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]

const url = `mongodb+srv://jerepoysti:${password}@puhelin-db.3kvo3.mongodb.net/?retryWrites=true&w=majority&appName=puhelin-db`
mongoose.set('strictQuery', false)
mongoose.connect(url)


const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema)

console.log(process.argv.length)

if (process.argv.length == 3) {
    console.log("Phonebook:")
    Person
  .find({})
  .then(persons => {
    console.log(persons.map(person => {
        console.log(person.name,person.number)}))
    mongoose.connection.close()
  })
    
}

if (process.argv.length > 3){
    console.log("juu")
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number,
      })
    person.save().then(result => {
        console.log('added '+name +" number "+number+ " to phonebook")
        mongoose.connection.close()
      })
}
