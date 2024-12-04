import { useState ,useEffect} from "react"
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify"
import LoginForm from "./components/Login"
import Recommended from "./components/RecommededPage"
import { useApolloClient,useSubscription,useQuery } from "@apollo/client";
import { BOOK_ADDED,ALL_BOOKS } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  console.log(addedBook)
  cache.updateQuery(query, ({ allBooks }) => {
    console.log(allBooks)
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}
const App = () => {
  const [page, setPage] = useState("authors")
  const [token,setToken] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      notify('new book added')
      console.log(data)
    }
  })
  if (result.loading){
    return <div>loading...</div>
  }
  const logout = () => {
    setToken(null)
    console.log(localStorage)
    localStorage.clear() 
    console.log("reset store")
    client.resetStore()
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const loginstate = (token,setPage,logout) => {
    if (!token){
      return(
        <button onClick={() => setPage("login")}>login</button>
    )
    }
    
    return(
      <>
      <button onClick={() => setPage("add")}>add book</button>
      <button onClick={() => setPage("recommended")} >recommend</button>
      <button onClick={logout}>logout</button>
      </>
    )
    
  }
  
  console.log(result.data.allBooks)
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        
        {loginstate(token,setPage,logout)}
        
        
      </div>
      <Notify errorMessage={errorMessage}></Notify>
      
      <LoginForm notify={notify} show={page === "login"} setToken={setToken} setPage={setPage} />

      <Authors notify={notify} show={page === "authors"} />

      <Books books={result.data.allBooks} show={page === "books"} />

      <NewBook notify={notify} show={page === "add"} />

      <Recommended show={page === "recommended"} />

    </div>
  );
};

export default App
