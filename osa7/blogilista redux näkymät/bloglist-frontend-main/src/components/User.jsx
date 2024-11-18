import { Link } from "react-router-dom"
const User = (user) => {
    console.log(user)
    const numofBlogs = user.user.blogs
    console.log(numofBlogs.length)
    return (
        <tr>
            <td key={user.id}><Link to={`/users/${user.user.id}`}>{user.user.name}</Link> </td>
            <td>{numofBlogs.length}</td>
        </tr>
        
        
    )
}




export default User