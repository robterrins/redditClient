import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from './SearchBarSlice.js'
import { setSubreddit, setSubredditIcon, setPosts, setBannerColor, setBannerImg } from '../Feed/FeedSlice.js';
import { Search } from '@mui/icons-material';
import './SearchBar.css';

export default function SearchBar() {
  const [searchTermInput, setSearchTermInput] = useState("");
  const getSearchTermState = useSelector((state) => state.feed.subreddit);
  const dispatch = useDispatch();

  const onSearchTermChange = async (e) => {
    e.preventDefault();
    setSearchTermInput(e.target.value);

    await fetch(`https://www.reddit.com/search_reddit_names?query=${searchTermInput}&type=sr`)
      .then(res => {
        console.log("search")
        return res.json()
      })
      .then((data)=> {
        console.log(data)
      })

  }

  useEffect(() => {
    setSubreddit(searchTermInput);
  }, [getSearchTermState]);

  const onSearchTermSubmit = async (e) => {
    e.preventDefault();
    dispatch(setSubreddit(searchTermInput))
    await fetch(`https://www.reddit.com/r/${searchTermInput}/about.json`)
      .then(res => {
        return res.json()
      })
      .then(function (data) {
        if (data !== null) {
          dispatch(setSubredditIcon(data.data.icon_img))
        }
      })
      .catch((error) => {
        console.log(error)
      } )
  }

  return (
    <span className="searchBar">
      <form className="searchBar" onSubmit={onSearchTermSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTermInput}
          onChange={onSearchTermChange}
        />
        <button className="searchButton" type="submit"><Search /></button>
      </form>
    </span>
  )
}
