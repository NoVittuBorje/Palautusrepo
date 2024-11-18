import { useState ,useImperativeHandle, forwardRef } from 'react'
import blogService from '../services/blogsService'
import PropTypes from 'prop-types'
import { setBlogs,LikeBlog,delBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import NavLink from 'react-bootstrap/esm/NavLink'


const Blog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogstyle = {paddingTop:10,paddingLeft: 2,border: 'solid',borderWidth: 1, marginBottom: 5 }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
    return (
      <Link className="nav-link" to={`/blogs/${props.blog.id}`}>{props.blog.title} {props.blog.author}</Link>
    )
})
Blog.propTypes = {
  blog:PropTypes.object.isRequired,
  user:PropTypes.object.isRequired,
  buttonLabel:PropTypes.string.isRequired
  

}
Blog.displayName = 'Blog'
export default Blog