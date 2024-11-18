import { useRef } from "react"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"
import Table from 'react-bootstrap/Table'
import NavLink from "react-bootstrap/esm/NavLink"
const BlogPage = ({blogs,user}) => {
    
    const blogFormRef = useRef()
    const blogref = useRef()
    
    return (
        <div>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm />
        </Togglable>
    <Table striped>
        <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Blog key={blog.id} blog={blog} ref={blogref}  buttonLabel="view" user={user} />
            </td>
           
          </tr>
        )}
      </tbody>
    </Table>
        
        </div>
    )
}
export default BlogPage