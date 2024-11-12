import { useState, useEffect ,useRef,useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import { getAll,setToken,update,create,deleteblog } from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import './styles.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useNotiDispatch } from './components/NotificationContext'
import { useUserDispatch, useUserValue } from './components/UserContext'
const App = () => {
  const queryClient = useQueryClient()
  const message = useNotiDispatch()

  const userDispatch = useUserDispatch()
  const user = useUserValue()
  
  const blogFormRef = useRef()
  const blogref = useRef()

 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({type:'Login',payload:{user}})
      setToken(user.token)
    }
  }, [])


  const updateBlogsMutation = useMutation({
    mutationFn: update,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      message({type:'MSG',payload:`Liked for ${blog.title}`})
      setTimeout(() => {
      message({type:'RST'})
      }, 5000)
    },
  })
  const createBlogsMutation = useMutation({
    mutationFn:create,
    onSuccess:(blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      message({type:'MSG',payload:`a new blog ${blog.title} by ${blog.author} added`})
      setTimeout(() => {
      message({type:'RST'})
      }, 5000)
    }
  })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    
  })

  
  
  const loginForm = () => (
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setToken(user.token)
      userDispatch({type:'Login',payload:{user}})
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log(exception.message)
      message({type:'MSG',payload:'wrong credentials'})
      setTimeout(() => {
      message({type:'RST'})
      }, 5000)
    }
  }
  const LikeBlog= (props) => {
    updateBlogsMutation.mutate({...props.blog, likes: props.blog.likes +1 })
  }

  const addBlog = (BlogObject) => {
    createBlogsMutation.mutate(BlogObject)
    blogFormRef.current.toggleVisibility()
  }

  const logOut = () => {
    userDispatch({type:'Logout',payload:null})
    window.localStorage.removeItem('loggedUser')
  }
  
  if (user === null) {
    return (
      <div>
        <Notification />
        
        <div>
          {loginForm()}
        </div>
      </div>
    )
  }
  if ( result.isLoading ) {
    return <div>Blogs service not available due to problems in server</div>
  }
  
  const blogs = result.data.sort((a,b) => b.likes - a.likes)
  
  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      
      <div>
        <p>{user.name} logged in <button onClick={logOut}>logout</button></p>

        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id}  blog={blog} ref={blogref} LikeBlog={LikeBlog} buttonLabel="view" user={user} />)}
      </div>
    </div>
  )


}

export default App