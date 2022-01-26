import {configureStore} from '@reduxjs/toolkit';
import searchBarReducer from '../Components/SearchBar/SearchBarSlice.js'
import feedReducer from '../Components/Feed/FeedSlice.js'

const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    feed: feedReducer,
  },
})

export default store;
