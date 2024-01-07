import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favouriteSubreddits: ['soccer', 'fantasypl', 'chess'],
}
// [{ name: 'soccer', icon: "" }, { name: 'fantasypl', icon: "" }, { name: 'chess', icon: "" }],
export const sidebarSlice = createSlice({
  name: 'sidebarSlice',
  initialState,
  reducers: {
    addFavouriteSubreddit(state, action){
      state.favouriteSubreddits.push(action.payload);
    },
    removeFavouriteSubreddit(state, action){
      console.log(state)
      console.log(action.payload, 1)
      state.favouriteSubreddits.splice(action.payload, 1);

    },
  },
})

export const {
  addFavouriteSubreddit,
  removeFavouriteSubreddit,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
