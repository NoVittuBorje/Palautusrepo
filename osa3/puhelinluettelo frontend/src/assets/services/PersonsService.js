import axios from 'axios'
const baseUrl = "https://puhelin-backend.fly.dev/api/persons"

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}
const deletePerson = (id) => {
  axios.delete(`${baseUrl}/${id}`)
  .then(response => {
    console.log(`Deleted post with ID ${id}`)
  })}

export default { 
  getAll: getAll, 
  create: create, 
  update: update, 
  deletePerson: deletePerson
}