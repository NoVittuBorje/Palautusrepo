import { ALL_AUTHORS } from "../queries"
import { useQuery } from "@apollo/client"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR } from "../queries"

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const [Name, setName] = useState('')
  const [Born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      props.notify(error.graphQLErrors[0].message)
    }
    })
  const result = useQuery(ALL_AUTHORS)

  const submit = (event) => {
    event.preventDefault()
    console.log(Name,Born)
    editAuthor({variables:{name:Name,setBornTo:parseInt(Born)}})
    setName('')
    setBorn('')
  }
  const handleChange = (event) =>{
    event.preventDefault()
    console.log(event.target.value)
    setName(event.target.value)
    }
  if (result.loading){
    return <div>loading...</div>
  }
  console.log(result)
  const authors = result.data.allAuthors
  console.log(authors)
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>authors</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={Name} onChange={handleChange}>
            <option value="">Select Author</option>
            {authors.map(author => <option key={author.id} value={author.name} >{author.name}</option>)}
          </select>
        </div>
        <div>
          born
          <input value={Born} onChange={({target}) => setBorn(target.value)} ></input>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
