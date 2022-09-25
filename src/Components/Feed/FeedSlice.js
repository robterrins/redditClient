import {createSlice} from '@reduxjs/toolkit';
import { getSubredditPosts, getPostComments } from '../../API/reddit.js';

const initialState = {
  posts: [],
  subreddit: 'pics',
  icon: '"https://b.thumbs.redditmedia.com/VZX_KQLnI1DPhlEZ07bIcLzwR1Win808RIt7zm49VIQ.png'
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
    setIcon(state, action) {
      state.icon = action.payload
    },
    setComments(state, action) {
      state.posts[action.payload.index].comments = action.payload.comments;
    },
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments = !state.posts[action.payload]
        .showingComments;
    },
  },
})

export const {
  setPosts,
  setSubreddit,
  setIcon,
  setComments,
  toggleShowingComments
} = feedSlice.actions;

export default feedSlice.reducer;