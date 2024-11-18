import {useParams} from 'react-router-dom'

const ViewUser = ({users}) => {
    const id = useParams().id  
    const user = users.find(user => user.id === id)
    if (!user) {
        return null
      }
      
    return (
        <div>
            <h1>{user.name}</h1>
            <ul>
                {user.blogs.map(blog => <li>{blog.title}</li>)}
            </ul>
        </div>
    )
}
export default ViewUser