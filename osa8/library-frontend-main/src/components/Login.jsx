import { useState, useEffect } from 'react'
import { useMutation ,useApolloClient} from '@apollo/client'
import { useQuery } from "@apollo/client"
import { LOGIN } from '../queries'
import { Query } from 'mongoose'

const LoginForm = (props) => {
    if (!props.show) {
        return null
      }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
          props.notify(error.graphQLErrors[0].message)
        }
      })

    useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          props.setToken(token)
          localStorage.setItem('user-token', token)
          props.setPage("authors")
        }
    }, [result.data])


    const handleLogin = (event) => {
        event.preventDefault()
        login({variables:{username:username,password:password}})
        
        
        
    }
    return (
        <div>
        <h2>Log in to app</h2>
        <form onSubmit={handleLogin}>
          <div>
        username
            <input
              type="text"
              value={username}
              name="Username"
              data-testid='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
        password
            <input
              type="password"
              value={password}
              name="Password"
              data-testid='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
}
export default LoginForm