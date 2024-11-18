import { useState ,useEffect} from "react"
import usersService from "../services/usersService"
import { setUser } from "../reducers/userReducer"
import User from "./User"

const UserPage = ({users}) => {
    
    console.log(users)

    return (
        <div>
            <h1>Users</h1>
            <table>
            <tr>
            <th></th>
            <th>blogs created</th>
            </tr>
                {users.map(user => <User user={user}></User>)}

                
            </table>
        </div>
    )

    
}

export default UserPage