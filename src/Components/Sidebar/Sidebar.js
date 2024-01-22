import React from 'react';
import './Sidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavouriteSubreddit } from './SidebarSlice.js';
import { setSubreddit } from '../Feed/FeedSlice.js';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { Whatshot } from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { NewReleases } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import RedditIcon from '../../assets/RedditIcon.png';

const FavouriteSubreddit = ({ subreddit, onFavClick, onFavRemoveClick }) => (
  <li key={subreddit.name}>
    <img className="favouriteIcon" alt={subreddit.name} src={subreddit.icon} />
    <a href="/" onClick={onFavClick}>r/{subreddit.name}</a>
    <CloseIcon id={subreddit.name} className="removeFav" onClick={onFavRemoveClick} />
  </li>
);

const Sidebar = () => {
  const favouriteSubreddits = useSelector((state) => state.sidebar.favouriteSubreddits);
  const dispatch = useDispatch();

  const onFavClick = (e) => {
    e.preventDefault();
    dispatch(setSubreddit(e.target.innerHTML.slice(2)));
  };

  const onFavRemoveClick = (e) => {
    e.preventDefault();
    const index = favouriteSubreddits.findIndex((subreddit) => subreddit.name === e.target.id);
    dispatch(removeFavouriteSubreddit(index));
  };

  return (
    <div className="sidebar">
      <div>
        <button><NewReleases /><br />New</button>
        <button><Whatshot /><br />Hot</button>
        <button><EmojiEventsIcon /><br />Best</button>
        <button><TrendingUp /><br />Rising</button>
      </div>

      <h3>Favourite Subreddits</h3>
      <hr />

      <div className='subreddits'>
        {favouriteSubreddits.map((subreddit) => (
          <FavouriteSubreddit
            key={subreddit.name}
            subreddit={subreddit}
            onFavClick={onFavClick}
            onFavRemoveClick={onFavRemoveClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;