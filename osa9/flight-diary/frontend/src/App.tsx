import { useState ,useEffect} from 'react'
import { getAllDiaries } from './Services/DiaryService'
import { Diary,Message } from './utils/types'
import ShowDiaries from './components/ShowDiaries'
import CreateDiary from './components/NewDiary'
import Notification from './components/Notification'
function App() {
  const [Diaries ,setDiaries] = useState<Diary[]>([])
  const[Message, setMessage] = useState<Message>(null)

  useEffect(() => {
    getAllDiaries().then(data => {
      console.log(data)
    setDiaries(data)
    })  
  }, [])
  return (
    <div>
      <Notification message={Message}></Notification>
      <CreateDiary setDiaries={setDiaries} Diaries={Diaries} setMessage={setMessage}></CreateDiary>
      <ShowDiaries Diaries={Diaries} ></ShowDiaries>
    </div>
  )
   
  
}

export default App
