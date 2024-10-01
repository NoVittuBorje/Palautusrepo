import { useState,useEffect } from 'react'
import PersonsService from './assets/services/PersonsService'
import './index.css'
import Notification from './assets/components/Noti'
import ErrorNotification from './assets/components/Error'
const ShowPersons = (prop) => {
  var filter = prop.filteredPersons
  console.log(filter,"showperson filter")
  return(
    <div>
      {filter.map(
        person => <Person 
        key={person.id} 
        id={person.id}
        name={person.name} 
        number={person.number}
        handleDelete={prop.handleDelete}
        />)}
        
    </div>
    )
}

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
  return (
    <p>{prop.name} {prop.number} <button onClick={() => prop.handleDelete(prop)} >delete</button></p> 
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter,setNewFilter] = useState("")
  const [filteredPersons,setfilteredPersons] = useState(persons)
  const [Message,setMessage] = useState(null)
  const [Errormsg,setError] = useState(null)

  const hook = () => {
    console.log('effect')
    PersonsService
      .getAll()
      .then(response => {
        console.log("set")
        setPersons(response.data)
        setfilteredPersons(response.data)
      })
  }
  useEffect(hook, [])
  



  const AddName = (event) => {
    event.preventDefault()
    const NewPerson = {
      name:newName,
      number:newNumber
    }
    console.log(persons,"persons")
    var listanimista = persons.map(person => person.name)
    console.log(listanimista,"listanimistä")
    let onko = listanimista.includes(newName,0);
    if (onko === false) {
      PersonsService
      .create(NewPerson)
        .then(response => {        
        console.log(response.data,"tää")
        let uusi = persons.concat(response.data)
        setPersons(uusi)
        setfilteredPersons(uusi)
        console.log(persons,"persons after create")
        setNewName("")
        setNewNumber("")
        handleMessage("Added "+newName)})
        .catch(error => {
          console.log(error.response.data)
          handleError(error.response.data)
          })
    }
      
    
    else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      persons.map(person => {
        if (person.name == newName) {
          person.number = newNumber
          PersonsService.update(person.id,NewPerson)
          .then(response => {
            console.log(response)
            setNewName("")
            setNewNumber("")
            handleMessage("Changed "+newName +" number")})
          .catch(error => {handleError(error.response.data)})}}
        )
        }
      
  }
  const handleMessage= (prop) => {
    setMessage(prop)
    setTimeout(MessageNull,2000)
  }
  const handleError = (prop) => {
    setError(prop)
    setTimeout(ErrorNull,2000)
  }
  const handleDelete = (prop) => {

    let id = prop.id
    let name = prop.name
    
    if (window.confirm("Delete "+name+" ?")) {
      PersonsService.deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
      setfilteredPersons(persons.filter(person => person.id !== id))
      handleMessage("Deleted " +name)
    }
  }
  const handleName = (event) => {
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    var filt = event.target.value
    
    setNewFilter(filt)
    console.log(filt,newFilter,"filters")
    console.log("filtering")
    if (persons.length > 0)
      setfilter(filt)
      console.log(filt)
      
      
  }
  const MessageNull = () =>{
    setMessage(null)
  }
  const ErrorNull = () => {
    setError(null)
  }
  const setfilter = (prop) => {
    var personscopy = [...persons]
      console.log(personscopy,"persons in filter")
      var filtered = personscopy.filter((personscopy) => personscopy.name.includes(prop))
      console.log(filtered,"filtered array")
      setfilteredPersons(filtered)
  }
  return (
    
    
    
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message}/>
      <ErrorNotification message ={Errormsg}/>
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
        <ShowPersons ShowPersons={ShowPersons} filteredPersons={filteredPersons} persons={persons} handleDelete={handleDelete} AddName={AddName}/>
      </div>
    </div>
    
  )

}

export default App