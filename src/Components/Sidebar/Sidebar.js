import react from 'react'
import './Sidebar.css'
import {useSelector, useDispatch} from 'react-redux';
import {removeFavouriteSubreddit} from './SidebarSlice.js'
import { setSubreddit } from '../Feed/FeedSlice.js';

export default function Sidebar () {

  const getFavouriteSubreddits = useSelector((state) => state.sidebar.favouriteSubreddits)
  const dispatch = useDispatch();

  const onFavClick = (e) => {
    e.preventDefault();
    dispatch(setSubreddit(e.target.innerHTML.slice(2)))
  }

  const onFavRemoveClick = (e) => {
    e.preventDefault()
    const index = getFavouriteSubreddits.indexOf(e.target.id);
    return dispatch(removeFavouriteSubreddit(index));
  }

  return (
    <div className="sidebar">
      <h3>Favourite Subreddits</h3>
      <hr></hr>
      <div className='subreddits'>
        {getFavouriteSubreddits.map((subreddit, index) => <li key={index}><a href="/" onClick={onFavClick} >r/{subreddit}</a> <button type="button" id={subreddit} className="removeFav" onClick={onFavRemoveClick}>X</button></li>)}
      </div>
    </div>
  )
}
