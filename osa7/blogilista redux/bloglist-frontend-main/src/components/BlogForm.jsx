import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs ,setBlogs,addBlog} from '../reducers/blogReducer'
const BlogForm = () => {
  const dispatch = useDispatch()
  const [newblogTitle,setNewblogTitle] = useState('')
  const [newblogAuthor,setNewblogAuthor] = useState('')
  const [newblogUrl,setNewblogUrl] = useState('')
  const createBlog = (event) => {
    event.preventDefault()
    dispatch(addBlog({
      'title': newblogTitle,
      'author': newblogAuthor,
      'url': newblogUrl }))
    setNewblogAuthor('')
    setNewblogTitle('')
    setNewblogUrl('')
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={createBlog}>
        <div>title:
          <input value={newblogTitle} data-testid='Title' onChange={event => setNewblogTitle(event.target.value)}/>
        </div>
        <div>author:
          <input value={newblogAuthor} data-testid='Author' onChange={event => setNewblogAuthor(event.target.value)}/>
        </div>
        <div>url:
          <input value={newblogUrl} data-testid='Url' onChange={event  => setNewblogUrl(event.target.value)}/>
        </div>

        <button type="submit">create</button>
      </form>
    </div>)
}


export default BlogForm