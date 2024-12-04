
const Book = ({books,Genre}) => {
    if (!Genre){
        return(
            <>
            {books.map((b) => 
                <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
                </tr>
              )}
            </>
        )
    }
    if (Genre){
        console.log(Genre)
        return(
            <>
            {books.map(b => {
                if (b.genres.includes(Genre)){
                return (
                <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
                </tr>
                )
                }}
            )}
            </>
        )
    }
    
}
export default Book