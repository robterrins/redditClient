import react, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar.js'
import SortOptions from '../SortOptions/SortOptions.js'

import redditLogo from '../../assets/Reddit-Logo-700x394.png'

export default function Header () {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="Header">
      <img src={redditLogo} className="redditLogo"/>
      <SearchBar />
    </div>
  )
}
// <div>
//   <SortOptions/>
// </div>
// <img src="Reddit-Logo-700x394.png">
