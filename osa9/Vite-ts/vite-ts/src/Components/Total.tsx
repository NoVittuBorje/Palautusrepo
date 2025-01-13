interface TotalProps {
    totalExercises:number
}
export const TotalExercises = (props:TotalProps) => {
    return (<p>
        Number of exercises {props.totalExercises}
      </p>)
}