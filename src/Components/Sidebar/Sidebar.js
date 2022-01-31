import react from 'react'
import './Sidebar.css'
import {useSelector, useDispatch} from 'react-redux';

export default function Sidebar () {

  const getFavouriteSubreddits = useSelector((state) => state.sidebar.favouriteSubreddits)


  return (
    <div className="sidebar">
      Favourite Subreddits:
      <div className='subreddits'>
        {getFavouriteSubreddits.map((subreddit, index) => <li key={index}><a>r/{subreddit}</a> <button>X</button></li>)}
      </div>
    </div>
  )
}
