import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './Feed.css';
import Post from '../Post/Post.js';

import {addFavouriteSubreddit} from '../Sidebar/SidebarSlice.js'

export default function Feed () {
  const dispatch = useDispatch();
  const currentFeed = useSelector((state) => state.feed.subreddit);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${currentFeed}.json`).then(res => {
      if(res.status!=200){
        console.log(`${res.status} error!`)
        return;
      }
      res.json().then(data => {
        if(data!=null){
          console.log(data);
          setPosts(data.data.children);
        }
      });
    })
  }, [currentFeed]);

  const getSubredditList = useSelector((state) => state.sidebar.favouriteSubreddits);

  const onFavouriteClick = (e) => {
    e.preventDefault();
    if(getSubredditList.includes(currentFeed)){
      return
    } else {
      dispatch(addFavouriteSubreddit(currentFeed));
    }
  }

  return (
    <div>
      <div>
        <h2 className="subredditName">r/{currentFeed}</h2>
        <button type="button" onClick={onFavouriteClick}>Favourite</button>
      </div>
      <div className="feed">
        <div className="posts">
          {(posts != null) ? posts.map((post, index) => <Post key={index} post={post.data} />) : ''}
        </div>
      </div>
    </div>
  )
}
