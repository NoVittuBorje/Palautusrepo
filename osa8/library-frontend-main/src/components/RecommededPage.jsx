import { useState} from "react"
import {ME,ALL_BOOKS} from "../queries"
import { useQuery ,useMutation} from "@apollo/client"
import Book from "./Book"
const Recommended = (props) => {
    console.log(props)
    if (!props.show) {
        return null
    }
    const [books, setBooks] = useState([])
    const [genre , setGenre] = useState(null)

    const result = useQuery(ME,{
        onCompleted:(result) => {
            console.log(result)
            const genre = result.me.favoriteGenre
            setGenre(genre)
            
        }})

    const result2 = useQuery(ALL_BOOKS, {
        variables: { genre:genre },
        onCompleted:(result2) => {
            console.log(result2)
            setBooks(result2.allBooks)
        }})
    if (result.loading || result2.loading){
            return <div>loading...</div>
    }
    console.log(genre,books)
    console.log(result2)
    const CurrentGenre = () => {
      console.log(genre)
      if (genre === null){
        return <p>No favorite genre</p>
      }
      else{
        return (
        <p>favorite genre {genre}</p>
      )
      }
      }
    
    
    

    return (
    <div>
    <h2>Recommendations</h2>
    <p>books in your favorite genre <b>patterns</b></p>
    <CurrentGenre/>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          <Book books={books} Genre={genre} ></Book>
        </tbody>
      </table>
    </div>
        
    )
}


export default Recommended