import react from 'react'
import './Sidebar.css'
import {useSelector, useDispatch} from 'react-redux';
import {removeFavouriteSubreddit} from './SidebarSlice.js'

export default function Sidebar () {

  const getFavouriteSubreddits = useSelector((state) => state.sidebar.favouriteSubreddits)
  const dispatch = useDispatch();


  const onFavRemoveClick = (e) => {
    e.preventDefault()
    const index = getFavouriteSubreddits.indexOf(e.target.id);
    return dispatch(removeFavouriteSubreddit(index));
  }

  return (
    <div className="sidebar">
      <h3>Favourite Subreddits:</h3>
      <hr></hr>
      <div className='subreddits'>
        {getFavouriteSubreddits.map((subreddit, index) => <li key={index}><a>r/{subreddit}</a> <button type="button" id={subreddit} className="removeFav" onClick={onFavRemoveClick}>X</button></li>)}
      </div>
    </div>
  )
}
