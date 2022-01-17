import react, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './SearchBar.css';

export default function SearchBar () {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <span className="searchBar">
      <form className="searchBar" onSubmit="">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {setSearchTerm(e.target.value)}}
        />
        <button className="searchButton" type="submit">Search</button>
      </form>
    </span>
  )
}
