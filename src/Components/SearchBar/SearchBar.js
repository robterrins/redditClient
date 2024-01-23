import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from './SearchBarSlice.js'
import { setSubreddit, setSubredditIcon, setPosts, setBannerColor, setBannerImg } from '../Feed/FeedSlice.js';
import { Search } from '@mui/icons-material';
import RedditIcon from '../../assets/RedditIcon.png'
import './SearchBar.css';

export default function SearchBar() {
  const [searchTermInput, setSearchTermInput] = useState("");
  const [searchResults, setSearchResults] = useState([])
  const getSearchTermState = useSelector((state) => state.feed.subreddit);
  const dispatch = useDispatch();

  const onSearchTermChange = async (e) => {
    e.preventDefault();
    setSearchTermInput(e.target.value);
    // if(searchTermInput.length < 2){
    //   setSearchResults([])
    // }
    const response = await fetch(`https://www.reddit.com/api/subreddit_autocomplete_v2.json?query=${searchTermInput}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const listings = data.data.children.map((listing) => {
      console.log(listing)
      return {
        displayName: listing.data.display_name_prefixed || `${listing.data.display_name}`,
        iconImg: listing.data.icon_img || RedditIcon
      }
    })
    setSearchResults(listings)
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
      })
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
      {searchResults.length > 0 && (
        <ul className="searchResults">
          {searchResults.map((result, index) => (
            // <li key={index}>{result.displayName}</li>

            <li key={index}>
              {/* <a href={`/r/${listing.data.display_name_prefixed}`} target="_blank" rel="noopener noreferrer"> */}
                <img className="searchResultsIcon" src={result.iconImg} alt={`${result.displayName} Subreddit Icon`} />
                {result.displayName}
              {/* </a> */}
            </li>
          ))}
        </ul>
      )}
    </span>
  )
}
