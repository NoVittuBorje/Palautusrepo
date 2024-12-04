import { ALL_BOOKS ,BOOK_ADDED} from "../queries"
import { useQuery,useSubscription, useApolloClient, } from "@apollo/client"
import { useState } from "react"
import { updateCache } from "../App"
import Book from "./Book"
const Books = (props) => {
  
  console.log(props)
  if (!props.show) {
    return null
  }
  
  const [Genre, setGenre] = useState(null)
  const books = props.books
  console.log(books)
  const uniqueGenres = []
  books.forEach(b => b.genres.forEach(g => {
      if (!uniqueGenres.includes(g)) {
        uniqueGenres.push(g)
    }
    }))
  
  
  const CurrentGenre = () => {
    console.log(Genre)
    if (Genre === null){
      return null
    }
    else{
      return (
      <p>in genre {Genre}</p>
    )
    }
  }
  return (
    <div>
      <h2>books</h2>
      {uniqueGenres.map(genre => <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)}
      <button onClick={() => setGenre(null)}>all genres</button>
      <CurrentGenre></CurrentGenre>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          <Book books={books} Genre={Genre} ></Book>
        </tbody>
      </table>
    </div>
  )
}

export default Books
