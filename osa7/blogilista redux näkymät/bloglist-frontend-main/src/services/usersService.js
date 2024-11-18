import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
export default {getAll}