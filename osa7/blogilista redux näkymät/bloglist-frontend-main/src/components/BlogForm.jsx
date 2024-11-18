import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs ,setBlogs,addBlog} from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
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
      <Form onSubmit={createBlog}>
      <Form.Group className="mb-2" controlId="formGrouptitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="Title" placeholder="Title" onChange={event => setNewblogTitle(event.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-2" controlId="formGroupauthor">
        <Form.Label>Author</Form.Label>
        <Form.Control type="Author" placeholder="Author" onChange={event => setNewblogAuthor(event.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-2" controlId="formGroupUrl">
        <Form.Label>Url</Form.Label>
        <Form.Control type="Url" placeholder="Url" onChange={event  => setNewblogUrl(event.target.value)}/>
      </Form.Group>
      <Button type='submit'>Create</Button>
    </Form>

    </div>
    )
}


export default BlogForm