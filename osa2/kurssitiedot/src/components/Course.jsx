const Header = (props) => {
    return (
      <h2>{props.course}</h2>
    )
  }
const Content = (props) => {
    
    var array = props.parts
    return (
      <p>
        {array.map(line => <li>{line.name} {line.exercises}</li>)}
      </p>
    )
    }
const Total = (props) => {
    const sum = (props.parts.map(line => line.exercises)).reduce((partialSum, a) => partialSum + a, 0);
    return (
      <b>total of {sum} exercises</b>
    )
}
const Course = (props) => {
    const courses = props
    return (
      
      <div>
        <h1>Web development curriculum</h1>
        {courses.course.map(course => 
        <div>
        <Header key={course.id} course={course.name}/>
        <Content key={course.id} parts={course.parts} />
        <Total key={course.id} parts={course.parts} />
        </div>
        )}
      </div>
        
      
    
  
  
  
  
  
  )

    
    
    
}


export default Course
