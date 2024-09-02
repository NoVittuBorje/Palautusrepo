import { useState } from 'react'
const Form = (prop) => {
  return (
    <form onSubmit={prop.AddName}>
    <div>
      name: <input 
      value={prop.newName}
      onChange={prop.handleName}
      id={"name"}/>
    </div>
    <div>
      number: <input 
      value={prop.newNumber}
      onChange={prop.handleNumber}
      id={"number"}
      />
      </div>
    <div>
      <button>add</button>
    </div>
  </form>
  )
}
const Person = (prop) => {
  var name = prop.name
  var number = prop.number
  return (
    <p>{name} {number}</p>
  )
}
const ShowPersons = (prop) => {
  return(
  <div>
    {prop.filteredPersons.map(filteredPersons => <Person key={filteredPersons.name} name={filteredPersons.name} number={filteredPersons.number} />)}
  </div>
  )
}
const Filter = (prop) => {
  return (
      <div>
      filter with<input
      value={prop.newFilter}
      onChange={prop.handleFilter}
      />
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter,setNewFilter] = useState("")
  const [filteredPersons,setfilteredPersons] = useState(persons)
  const AddName = (event) => {
    event.preventDefault()
    var listanimista = persons.map(person => person.name)
    let onko = listanimista.includes(newName,0);
    if (onko === false) {
      setPersons(persons => [...persons, {name: newName ,number: newNumber}])}
    else alert(`${newName} is already added to phonebook`);
  }

  const handleName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    console.log(event.target.value)
    var filt = event.target.value
    setNewFilter(event.target.value)
    let filtered = persons.filter((person) => person.name.includes(filt))
    setfilteredPersons(filtered)
    console.log(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        <Filter handleFilter={handleFilter} newFilter={newFilter}/>
      </div>

      <h2>Add new</h2>

        <Form AddName={AddName} 
        newName={newName} 
        handleName={handleName} 
        newNumber={newNumber} 
        handleNumber={handleNumber}/>

      <h2>Numbers</h2>
      
      <div>
        <ShowPersons filteredPersons={filteredPersons} />
      </div>
    </div>
  )

}

export default App