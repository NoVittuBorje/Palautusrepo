import axios from 'axios';
import { Diary, NewDiary } from '../utils/types';
interface ValidationError {
    message: string;
    errors: Record<string, string[]>
  }
  
export const getAllDiaries = () => {
    return axios.get<Diary[]>('http://localhost:3000/api/diaries').then(res => res.data)
}
export const addDiary = (object: NewDiary) => {
    console.log(object)
    try {
        return axios.post<Diary>('http://localhost:3000/api/diaries',object).then(res => res.data)
    }catch(error) {
        console.log(error)
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)){
            console.log(error)
            return error
        }
        else{
            return error
        }
    }
    
}