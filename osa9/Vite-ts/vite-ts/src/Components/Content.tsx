import { CoursePart } from "../App"

interface ContentProps {
    courseParts:CoursePart[]
}
export const Content = (props:ContentProps) => {
    
    console.log(props)
    const CourseParts = props.courseParts
    console.log(CourseParts)
    return (
    <div >
    {CourseParts.map(part => {
        switch(part.kind){
            case"basic":
            console.log("basic",part.name,part.kind)
            return (
                <div >
                    <p><b>{part.name} {part.exerciseCount}</b></p>
                    <p>{part.description}</p>
                </div>
            )
            break;
            case"group":
            console.log("group",part.name,part.kind)
            return (
                
                <div>
                    <p><b>{part.name} {part.exerciseCount}</b></p>
                    <p >{part.description}</p>
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            )
            break;
            case"background":
            console.log("background",part.name,part.kind)
            return (
                <div>
                    <p><b>{part.name} {part.exerciseCount}</b></p>
                    <p>{part.description}</p>
                    <p>{part.backgroundMaterial}</p>
                </div>
            )
            break;
            case"special":
            console.log("special",part.name,part.kind)
            return (
                <div>
                    <p><b>{part.name} {part.exerciseCount}</b></p>
                    <p>{part.description}</p>
                    <p>required skills: {part.requirements.join(", ")}</p>
                </div>
            )
            break;
        }
    })}
    </div>
)
}
