import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { sub } from "date-fns"
import { client } from "../../api/client"

const initialReaction = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
}

const initialState = {
  data: [],
  status: 'idle',
  error: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action) {
    //     state.data.push(action.payload)
    //   },
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         title,
    //         content,
    //         user: userId,
    //         reactions: {...initialReaction}
    //       }
    //     }
    //   }
    // },
    postUpdated(state, action) {
      const { postId, title, content } = action.payload
      const existingPost = state.data.find(post => post.id === postId)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const {postId, reaction} = action.payload
      const existingPost = state.data.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.data.push(action.payload)
      })
  }
})

export const { postUpdated, reactionAdded } = postsSlice.actions

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async(initalPost) => {
  const response = await client.post('/fakeApi/posts', initalPost)
  // 响应包括完整的帖子对象，包括唯一ID
  return response.data
})

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.data

export const selectPostById = (state, postId) => state.posts.data.find(post => post.id === postId)

export const selectPostsByUser = (state, userId) => state.posts.data.filter(post => post.user === userId)