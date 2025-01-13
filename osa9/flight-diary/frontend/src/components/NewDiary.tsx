import { useState } from "react"
import { NewDiary ,Weather,Visibility,Diary,Message} from "../utils/types"
import { addDiary } from "../Services/DiaryService";
interface CreateDiaryProps {
    setDiaries:React.Dispatch<React.SetStateAction<Diary[]>>
    Diaries:Diary[]
    setMessage:React.Dispatch<React.SetStateAction<Message>>
}
const CreateDiary = (props:CreateDiaryProps) => {
    const [Comment, setComment] = useState("")
    const [Date , setDate] = useState("")
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const createDiary = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const newDiary:NewDiary = {
            date: Date,
            weather: weather,
            visibility: visibility,
            comment: Comment
        }
        addDiary(newDiary).then(data => {
            props.setDiaries(props.Diaries.concat(data))
        }).catch(error => {
          props.setMessage(error.response.data)
          setTimeout(() => {
            props.setMessage(null)
          }, 2000);
        })
        setComment("")
        setDate("")
        setVisibility(Visibility.Great)
        setWeather(Weather.Sunny)
    }
    return (
    <div>
        <h3>Add new entry</h3>
        <form onSubmit={createDiary}>
            
            <p>date <input type="date" id="Date" name="Diary Date" value={Date} min="2018-01-01" max="2024-12-17" onChange={(event) => setDate(event.target.value)}/></p>
            <div style={{marginTop:0,marginBottom:0}}>
            <a>visibility </a>
            {Object.values(Visibility).map(key => (
                <label key={key}>
                    <input
                        type="radio"
                        value={key}
                        name={key}
                        onChange={(event) => setVisibility(event.target.value)}
                        checked={key === visibility}
                    />
                    {key}
                </label>
                ))}
            </div>
            <div style={{marginTop:0,marginBottom:0}}>
            <a>weather </a>
            {Object.values(Weather).map(key => (
                <label key={key}>
                    <input
                        type="radio"
                        value={key}
                        name={key}
                        onChange={(event) => setWeather(event.target.value)}
                        checked={key === weather}
                    />
                    {key}
                </label>
                ))}
            </div>
            <p>comment <input value={Comment} onChange={(event) => setComment(event.target.value)}/></p>
            <button type='submit'>add</button>
        </form>
    </div>
    )
}
export default CreateDiary