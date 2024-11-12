import { useState ,useImperativeHandle, forwardRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { deleteblog } from '../services/blogs'

const Blog = forwardRef((props, ref) => {
  const queryClient = useQueryClient()

  const [visible, setVisible] = useState(false)
  const [deleted, setdeleted] = useState(false)

  const [Likes,setLikes] = useState(props.blog.likes)
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
    props.LikeBlog(props)
    setLikes(Likes +1)
    

  }
  const deleteBlogsMutation = useMutation({
    mutationFn:deleteblog,
    onSuccess:(blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })
  const DeleteBlog = () => {
    if (window.confirm('Remove blog ' + props.blog.title +' by '+props.blog.author)) {
      deleteBlogsMutation.mutate(props.blog.id)
      
      
    }
  }

  const DelButton = () => {
    if (props.user.username === props.blog.user.username){
      return (
        <button onClick={DeleteBlog}>remove</button>
      )}
    else{return null}
  }

  if (!deleted){
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
            <p className='no-margin'>Likes {Likes} <button placeholder='like' onClick={likeblog}>like</button></p>
            <p className='no-margin'>{props.blog.user.name}</p>
            <DelButton />

          </div>
        </div>
      </div>
    )}
})
Blog.propTypes = {
  blog:PropTypes.object.isRequired,
  user:PropTypes.object.isRequired,
  buttonLabel:PropTypes.string.isRequired,
  LikeBlog:PropTypes.func.isRequired

}
Blog.displayName = 'Blog'
export default Blog