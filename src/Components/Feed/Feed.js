import React, {useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';


import './Feed.css';
import Post from '../Post/Post.js';

export default function Feed () {

  const getFeed = useSelector((state) => state.feed.subreddit);
  const [posts, setPosts] = useState([])
  // const [subreddit, setSubreddit] = useState(['pics'])

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${getFeed}.json`).then(res => {
      if(res.status!=200){
        console.log(`${res.status} error!`)
        return;
      }
      res.json().then(data => {
        if(data!=null){
          console.log(data)
          setPosts(data.data.children);
        }
      });
    })
  }, [getFeed]);

  return (
    <div>
      <h2 className="subredditName">r/{getFeed}</h2>
      <div className="feed">
        <div className="posts">
          {(posts != null) ? posts.map((post, index) => <Post key={index} post={post.data} />) : ''}
        </div>
      </div>
    </div>
  )
}
