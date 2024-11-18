import { useState, useEffect ,useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserPage from './components/UsersPage'
import BlogPage from './components/BlogPage'
import ViewUser from './components/ViewUser'
import './styles.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs ,setBlogs} from './reducers/blogReducer'
import { initializeUser,setUser,handleLogin} from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch
} from "react-router-dom"
import usersService from './services/usersService'
import SingleBlog from './components/SingleBlog'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/esm/Button'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {    
  dispatch(initializeBlogs())
  }, []) 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(user))
    }
  }, [])
  
  useEffect(() => {
      usersService.getAll().then(res => {
          let sortedusers = res.sort((a,b) => b.blogs.length - a.blogs.length)
          setusers(sortedusers)
      })
  },[])
  const padding = {
    paddingRight: 5
  }
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [users,setusers] = useState([])
  

  const match = useMatch('/users/:id')
  const matchUser = match ? users.find(user => user.id === Number(match.params.id)) : null

  
  const logOut = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedUser')
  }

  if (user === null) {
    return (
      <div>
        <Notification/>
        <LoginForm/>
      </div>
    )
  }
  
  return (
    <div className="container">
      <h1>Blogs</h1>
      <Notification />
      <Container>
      <Navbar bg="light" data-bs-theme="light">
      <Nav className="me-auto">
      <Link className="nav-link" to='' >Blogs</Link>
      <Link className="nav-link" to='/users'>Users </Link>
      <a className='nav-link'>{user.name} logged in <Button size='sm' onClick={logOut}>logout</Button></a>
      </Nav>
      </Navbar>
      </Container>
      
        

        

        <Routes>
          <Route path='/users' element={<UserPage users={users} />}></Route>
          <Route path="/users/:id" element={<ViewUser users={users} />} />
          <Route path='/blogs/:id' element={<SingleBlog blogs={blogs} user={user}/>} />
          <Route path='/' element={<BlogPage blogs={blogs} user={user}/>}></Route>
        </Routes>


      
    </div>
  )
}

export default App