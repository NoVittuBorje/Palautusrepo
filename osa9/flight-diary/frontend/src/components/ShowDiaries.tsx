import { Diary } from "../utils/types"

interface DiaryProps {
    Diaries:Diary[]
}
const ShowDiaries = (props:DiaryProps) => {
    const Diaries = props.Diaries
    return (
        <div>
          <h3>Diary entries</h3>
            {Diaries.map(diary => {
        return(
        <div key={diary.id}>
          <p>{diary.comment}</p>
          <p>weather {diary.weather}</p>
          <p>visibility {diary.visibility}</p>
          <p>{diary.date}</p>
        </div>
        )
          })}
      </div>
    )
}
export default ShowDiaries