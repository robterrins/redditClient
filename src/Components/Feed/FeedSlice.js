import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  subreddit: 'pics'
}

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {
    setFeed(state, action) {
      state.subreddit = action.payload;
    },
  },
})

export const {
  setFeed,
} = feedSlice.actions;

export default feedSlice.reducer;
