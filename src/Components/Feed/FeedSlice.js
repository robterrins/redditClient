import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  subreddit: 'pics',
  showComments: false,
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
    },
    showComments(state, action){
      if(state.showComments){
        state.showComments = false;
      } else {
        state.showComments = action.payload;
      }
    }
  },
})

export const {
  setPosts,
  setSubreddit,
  getComments,
  showComments,
} = feedSlice.actions;

export default feedSlice.reducer;
