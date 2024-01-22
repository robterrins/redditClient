import { createSlice } from '@reduxjs/toolkit';
import RedditIcon from '../../assets/RedditIcon.png'

const initialState = {
  favouriteSubreddits: [
    {
      name: 'soccer',
      icon: "https://b.thumbs.redditmedia.com/NojkQWzGBAau2dP3q0NTY5uJisbRx_q3ithIT5iLypE.png"
    },
    {
      name: 'fantasypl',
      icon: "https://b.thumbs.redditmedia.com/ZvZBvQ9kg21R8OcRKt0K8hsusgoqMHGtdQ6pCDKj1ok.png"
    },
    {
      name: 'chess',
      icon: RedditIcon
    }
  ]
}
// [{ name: 'soccer', icon: "https://b.thumbs.redditmedia.com/NojkQWzGBAau2dP3q0NTY5uJisbRx_q3ithIT5iLypE.png" }, { name: 'fantasypl', icon: "https://b.thumbs.redditmedia.com/NojkQWzGBAau2dP3q0NTY5uJisbRx_q3ithIT5iLypE.png" }, { name: 'chess', icon: RedditIcon }],
export const sidebarSlice = createSlice({
  name: 'sidebarSlice',
  initialState,
  reducers: {
    addFavouriteSubreddit(state, action) {
      state.favouriteSubreddits.push(action.payload);
    },
    removeFavouriteSubreddit(state, action) {
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
