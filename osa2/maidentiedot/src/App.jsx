import { useState,useEffect } from 'react'
import PersonsService from './assets/services/PersonsService'
import axios from "axios"




const Country = (prop) => {
  return (
    <p>{prop.name.name.common}
    <button onClick={() => prop.handleFiltering(prop.name.name.common)}>show</button>
    </p>
  )
}

const ShowCountries = (prop) => {
  console.log(prop)
  var filter = prop.Filtered
  
  if (!filter){
    return null
  }
  if (filter.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (filter.length === 1){
    console.log(filter[0],"filter[0]")
    return(
      <ShowCountry country={filter[0]}/>
    )
    
  }
  return(
    <div>
      {filter.map(
        country => <Country 
        name={country}
        key={country.ccn3}
        handleFiltering={prop.handleFiltering}
        />)}
        
    </div>
    )
  }

const ShowCountry = (prop) => {
  const [Weather,setWeather] = useState(null)
  console.log(prop,"prop in showcountry")
  var country = prop.country
  var languages = country.languages
  
  const hook = () => {
    console.log('effect')
    PersonsService
      .getWeather(country.capital)
      .then(response => {
        console.log("set")
        setWeather(response.data)
      })
  }
  useEffect(hook, [])
  if (Weather) {
  
  var temp = (Weather.main.temp - 273.15).toFixed(2)
  var wind = Weather.wind.speed
  var clouds = Weather.weather[0].icon
  console.log(clouds)
  var iconurl = `https://openweathermap.org/img/wn/${clouds}@2x.png`
  console.log(Weather,"weather")
  console.log(iconurl)
  return (
    <div>
      <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
      { Object.entries(languages).map((t,k) => <li key={k} value={t[0]}>{t[1]}</li>) } 
      </ul>
      <img src={country.flags.png} width={200} ></img>
      </div>
      <div>
        <b>Weather in {country.capital}</b>
        <p>temperature {temp} Celcius</p>
        <p>wind {wind} m/s</p>
        <img src={iconurl}></img>
      </div>
      </div>
  )}
}

const Form = (prop) => {
  return (
    <form onChange={prop.handleSearch}>find countries
    <input></input>
    </form>
  )
}


function App() {
  const [AllCountries,SetAllCountries] = useState(null)
  const [Search,SetSearch] = useState(null)
  const [Filtered,SetFiltered] = useState(null)
  

  const hook = () => {
    console.log('effect')
    PersonsService
      .getAll()
      .then(response => {
        console.log("set")
        SetAllCountries(response.data)
        SetFiltered(response.data)
        
      })
  }
  useEffect(hook, [])


  const handleFiltering= (prop) => {
    if (AllCountries) {
      var Countrys = [...AllCountries]
      console.log("search by ",prop)
      var filtered = Countrys.filter((Countrys) => Countrys.name.common.toLowerCase().includes(prop.toLowerCase()))
      SetFiltered(filtered)
      console.log(filtered)}
  }
  const handleSearch = (event) => {
    let newSearch = event.target.value
    SetSearch(newSearch)
    handleFiltering(newSearch)
    console.log(newSearch)
  }
  return (
    <div>
    <Form handleSearch={handleSearch}/>
    <ShowCountries Filtered={Filtered} handleFiltering={handleFiltering}/>
    </div>
  )
}

export default App
