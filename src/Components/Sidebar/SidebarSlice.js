import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favouriteSubreddits: ['soccer', 'fantasypl', 'chess'],
}

export const sidebarSlice = createSlice({
  name: 'sidebarSlice',
  initialState,
  reducers: {
    addFavouriteSubreddit(state, action){
      state.favouriteSubreddits.push(action.payload);
    },
  },
})

export const {
  addFavouriteSubreddit,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
