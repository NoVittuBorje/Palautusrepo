import { useState, useEffect ,useRef } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogin,setUser } from '../reducers/userReducer'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const Login = async (event) => {
        event.preventDefault()
        dispatch(handleLogin(username, password))
        setUsername('')
        setPassword('')
    }
     
    

  
    return(
      <div>
      <h2>Log in to app</h2>
      <Form onSubmit={Login}>
      <Form.Group className="mb-3" controlId="formGroupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="Username" placeholder="Enter Username" onChange={({ target }) => setUsername(target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={({ target }) => setPassword(target.value)}/>
      </Form.Group>
      <Button type='submit'>login</Button>
    </Form>
    </div>
    )
  }
export default LoginForm