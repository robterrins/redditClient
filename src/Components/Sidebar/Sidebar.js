import react from 'react';
import './Sidebar.css'
import { useSelector, useDispatch } from 'react-redux';
import { removeFavouriteSubreddit } from './SidebarSlice.js'
import { setSubreddit } from '../Feed/FeedSlice.js';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { Whatshot } from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { NewReleases } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function Sidebar() {

  const getFavouriteSubreddits = useSelector((state) => state.sidebar.favouriteSubreddits)
  const dispatch = useDispatch();

  const onFavClick = (e) => {
    e.preventDefault();
    dispatch(setSubreddit(e.target.innerHTML.slice(2)))
  }

  const onFavRemoveClick = (e) => {
    e.preventDefault()
    console.log(e.target)
    console.log(e.target.id)
    const index = getFavouriteSubreddits.indexOf(e.target.id);
    return dispatch(removeFavouriteSubreddit(index));
  }

  return (
    <div className="sidebar">
      <div>
        <button><NewReleases /><br />New</button>
        <button><Whatshot /><br />Hot</button>
        <button><EmojiEventsIcon /><br />Best</button>
        <button><TrendingUp /><br />Rising</button>
      </div>

      <h3>Favourite Subreddits</h3>
      <hr></hr>
      <div className='subreddits'>
        {getFavouriteSubreddits.map((subreddit, index) => <li key={index}><img className="favoriteIcon" alt="" /><a href="/" onClick={onFavClick} >r/{subreddit}</a> <DeleteForeverIcon id={subreddit} className="removeFav" onClick={onFavRemoveClick} /></li>)}
      </div>
    </div>
  )
}
