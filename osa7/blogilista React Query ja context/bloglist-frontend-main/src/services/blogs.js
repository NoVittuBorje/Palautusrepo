import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}
export const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl,newObject,config)
  if (response.status === 400){
    return console.log(response)
  }
  return response.data
}
export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const update = (updatedblog) => {
  axios.put(`${baseUrl}/${updatedblog.id}`, updatedblog).then(res => res.data)

}
export const deleteblog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.delete(`${ baseUrl }/${id}`,config)
  return response
}

