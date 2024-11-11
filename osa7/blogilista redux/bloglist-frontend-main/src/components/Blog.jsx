import { useState ,useImperativeHandle, forwardRef } from 'react'
import blogService from '../services/blogsService'
import PropTypes from 'prop-types'
import { setBlogs,LikeBlog,delBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
const Blog = forwardRef((props, ref) => {
  
  const dispatch = useDispatch()
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
  const likeblog= () => {
    dispatch(LikeBlog(props.blog))
  }


  const DeleteBlog = () => {
    if (window.confirm('Remove blog ' + props.blog.title +' by '+props.blog.author)) {
      dispatch(delBlog(props.blog.id))
      
      
      
      
    }
  }

  const DelButton = () => {
    if (props.user.username === props.blog.user.username){
      return (
        <button onClick={DeleteBlog}>remove</button>
      )}
    else{return null}
  }

  
    return (
      <div style={blogstyle} data-testid='blogform'>
        <div style={hideWhenVisible}>
          {props.blog.title} {props.blog.author}
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div>
          <div style={showWhenVisible } className="togglableContent">
            <p className='no-margin'>{props.blog.title} {props.blog.author} <button onClick={toggleVisibility}>hide</button></p>
            <a href={props.blog.url} className='no-margin'>{props.blog.url}</a>
            <p className='no-margin'>Likes {props.blog.likes} <button placeholder='like' onClick={likeblog}>like</button></p>
            <p className='no-margin'>{props.blog.user.name}</p>
            <DelButton />

          </div>
        </div>
      </div>
    )
})
Blog.propTypes = {
  blog:PropTypes.object.isRequired,
  user:PropTypes.object.isRequired,
  buttonLabel:PropTypes.string.isRequired
  

}
Blog.displayName = 'Blog'
export default Blog