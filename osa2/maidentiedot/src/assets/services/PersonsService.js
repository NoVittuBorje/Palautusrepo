import axios from 'axios'
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
  return axios.get(baseUrl)
}
const getWeather = (prop) => {
  const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${prop}&appid=${api_key}`
  return axios.get(queryURL)
}

export default { 
  getAll: getAll,
  getWeather: getWeather
}