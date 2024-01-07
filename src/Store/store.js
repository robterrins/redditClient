import {configureStore} from '@reduxjs/toolkit';
import searchBarReducer from '../Components/SearchBar/SearchBarSlice.js';
import feedReducer from '../Components/Feed/FeedSlice.js';
import sidebarReducer from '../Components/Sidebar/SidebarSlice.js'

const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    feed: feedReducer,
    sidebar: sidebarReducer,
  },
})

export default store;