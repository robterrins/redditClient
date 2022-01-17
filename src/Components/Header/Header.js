import react, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar.js'

import redditLogo from './Reddit-Logo-700x394.png'

export default function Header () {


  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="Header">
      <img src={redditLogo} className="redditLogo"/>
      <SearchBar />
    </div>


  )
}

// <img src="Reddit-Logo-700x394.png">
