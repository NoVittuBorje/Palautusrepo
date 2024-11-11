import { useState, useEffect ,useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import './styles.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs ,setBlogs} from './reducers/blogReducer'
import { initializeUser,setUser,handleLogin} from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {    
  dispatch(initializeBlogs())
  }, []) 

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()
  const blogref = useRef()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(user))
      
    }
  }, [])

  

  const loginForm = () => (
    <div>
      <h2>Log in to app</h2>
      <form onSubmit={Login}>
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

  const Login = async (event) => {
    event.preventDefault()
    dispatch(handleLogin(username, password))
    setUsername('')
    setPassword('')
    
  }
 

  const logOut = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedUser')
  }

  if (user === null) {
    return (
      <div>
        <Notification/>
        
        <div>
          {loginForm()}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification/>
      
      <div>
        <p>{user.name} logged in <button onClick={logOut}>logout</button></p>

        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id}  blog={blog} ref={blogref}  buttonLabel="view" user={user} />)}
      </div>
    </div>
  )


}

export default App