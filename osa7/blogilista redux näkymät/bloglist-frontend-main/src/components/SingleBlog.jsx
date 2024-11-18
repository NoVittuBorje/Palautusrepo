import {useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LikeBlog } from '../reducers/blogReducer'
import { delBlog } from '../reducers/blogReducer'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import { AddComment } from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
const SingleBlog = ({blogs,user}) => {
    const [comment,setComment] = useState('')
    
    const dispatch = useDispatch()
    const id = useParams().id  
    const blog = blogs.find(blog => blog.id === id)
    

    const likeblog= () => {
        dispatch(LikeBlog(blog))
      }
    const DeleteBlog = () => {
        if (window.confirm('Remove blog ' + blog.title +' by '+blog.author)) {
          dispatch(delBlog(blog.id))
          
        }
      }
    const createComment = (event) => {
      event.preventDefault()
      console.log(comment)
      dispatch(AddComment({blog,comment}))
      setComment('')

    }
    const DelButton = () => {
        if (user.username === blog.user.username){
          return (
            <Button size='sm' onClick={DeleteBlog}>remove</Button>
          )}
        else{return null}
      }

      
    if (!blog) {
        return null
      }
    
    return (
      <div>
        <div>
            <h1>blog app</h1>
            <h2>{blog.title}</h2>
            <a href={blog.url} className='no-margin'>{blog.url}</a>
            <p className='no-margin'>Likes {blog.likes} <Button size='sm' placeholder='like' onClick={likeblog}>like</Button></p>
            <p className='no-margin'>added by {blog.user.name}</p>
            <DelButton />
        </div>

        <div>
            
            <Form onSubmit={createComment}>
              <Form.Group ontrolId="comment.Form">
                <Form.Label>Comments</Form.Label>
                <Form.Control as='textarea' value={comment} onChange={event => setComment(event.target.value)}></Form.Control>
              </Form.Group>
            
            <Button type='submit'>add comment</Button>
            </Form>
            <ul>
            {blog.comments.map(comment => <li>{comment}</li>)}
            </ul>
        </div>
      </div>
    )
}
export default SingleBlog