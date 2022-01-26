import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchTerm} from './SearchBarSlice.js'
import './SearchBar.css';

export default function SearchBar () {
  const [searchTermInput, setSearchTermInput] = useState("");
  const getSearchTermState = useSelector((state) => state.searchBar.searchTerm);
  const dispatch = useDispatch();

  const onSearchTermChange = (e) => {
    e.preventDefault();
    setSearchTermInput(e.target.value);
  }

  useEffect(() => {
    setSearchTerm(searchTermInput);
  }, [getSearchTermState]);


  const onSearchTermSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTermInput))
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
        <button className="searchButton" type="submit">Search</button>
      </form>
    </span>
  )
}
