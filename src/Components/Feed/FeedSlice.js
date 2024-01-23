import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  subreddit: 'pics',
  icon: 'https://b.thumbs.redditmedia.com/VZX_KQLnI1DPhlEZ07bIcLzwR1Win808RIt7zm49VIQ.png',
  bannerColor: "#000000",
  bannerImg: "",
  comments: [],
  showingComments: false,
  pageNumber: 0,
  before: "",
  after: ""
}

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setSubreddit(state, action) {
      state.subreddit = action.payload;
    },
    setSubredditIcon(state, action) {
      state.icon = action.payload
    },
    setBannerColor(state, action) {
      state.bannerColor = action.payload
    },
    setBannerImg(state, action) {
      state.bannerImg = action.payload
    },
    setComments(state, action) {
      state.posts[action.payload.index].comments = action.payload.comments;
    },
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
    },
    setBefore(state, action) {
      state.before = action.payload
    },
    setAfter(state, action) {
      state.after = action.payload
    },
  },
})

export const {
  setPosts,
  setSubreddit,
  setSubredditIcon,
  setBannerColor,
  setBannerImg,
  setComments,
  toggleShowingComments,
  setBefore,
  setAfter
} = feedSlice.actions;

export default feedSlice.reducer;