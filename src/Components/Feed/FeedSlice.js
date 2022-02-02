import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  subreddit: 'pics',
}

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {
    setPosts(state,action){
      state.posts = action.payload;
    },
    setSubreddit(state, action) {
      state.subreddit = action.payload;
    },
    getComments(state,action){
      state.posts[action.payload.index].comments = action.payload.comments;
    }
  },
})

export const {
  setPosts,
  setSubreddit,
  getComments,
} = feedSlice.actions;

export default feedSlice.reducer;
