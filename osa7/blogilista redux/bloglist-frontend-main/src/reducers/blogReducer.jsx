import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogsService"
import { setNotification } from "./notificationReducer"
const blogsSlice = createSlice({
    name:'blogs',
    initialState:[],
    reducers:{
        setBlogs(state,action) {
            return action.payload
        },
        Like(state,action){
            const id = action.payload.id
            const blogsToChange = state.find(n => n.id === id)
            const changedblogs = {
              ...blogsToChange,
              likes:blogsToChange.likes+1
            }
            state = state.map(blogs =>
            blogs.id !== id ? blogs : changedblogs)

            state = state.sort((a,b) => b.likes - a.likes)
            return state
        },

}
})
export const addBlog = content => {
  return async dispatch => {
    blogsService.create(content).then(blog => {
      blogsService.getAll().then(blogs => {
        blogs.sort((a,b) => b.likes - a.likes)
        dispatch(setBlogs( blogs ))})
      dispatch(setNotification({message:`a new blog ${blog.title} by ${blog.author} added`,type:'message'},5000))
    }).catch(exception => {
      console.log(exception.message)
      dispatch(setNotification({message:exception.message,type:'message'},5000))
  })
  }
}
export const delBlog = content => {
  return async dispatch => {
    blogsService.deleteblog(content).then(res => {
      blogsService.getAll().then(blogs => {
        dispatch(setBlogs(blogs))
      })
    })
  }
}
export const LikeBlog = content => {
    return async dispatch =>{
      const newBlog = {
        author:content.author,
        id:content.id,
        likes:content.likes +1,
        title:content.title,
        url:content.url,
        user:content.user,
        
      }
      const update = await blogsService.update(content.id,newBlog)
      console.log(update,'update')
      dispatch(Like(update))
    }
  }
export const initializeBlogs = () => {
    return async dispatch => {
        await blogsService.getAll().then(blogs => {
            blogs.sort((a,b) => b.likes - a.likes)
            dispatch(setBlogs(blogs))}
        )
    }}

export const { setBlogs,Like,deleteBlog} = blogsSlice.actions
export default blogsSlice.reducer