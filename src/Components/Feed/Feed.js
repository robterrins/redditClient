import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './Feed.css';
import Post from '../Post/Post.js';

import {addFavouriteSubreddit} from '../Sidebar/SidebarSlice.js'
import {setPosts} from "./FeedSlice.js"

export default function Feed () {
  const dispatch = useDispatch();
  const currentSubreddit = useSelector((state) => state.feed.subreddit);
  const posts = useSelector((state) => state.feed.posts);
  const getSubredditList = useSelector((state) => state.sidebar.favouriteSubreddits);
  const icon = useSelector((state) => state.feed.icon);

  const generateFeed = () => {
    console.log(icon)
    fetch(`https://www.reddit.com/r/${currentSubreddit}.json`).then(res => {
      if(res.status!==200){
        console.log(`${res.status} error!`)
        return;
      }
      res.json().then(data => {
        if(data!==null){
          console.log(data)
          const posts = data.data.children;
          const postsWithMetadata = posts.map((post) => ({
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            errorComments: false,
          }));
          dispatch(setPosts(postsWithMetadata));
        }
      });
    })
  }

  // const generateFeed = () => {
  //   Promise.all([
  //   fetch(`https://www.reddit.com/r/${currentSubreddit}.json`),
  //     fetch(`https://www.reddit.com/r/${currentSubreddit}/about.json`)
  //   ])
  //   .then(responses => {
  //     return Promise.all(responses.map(function (response) {
  //     return response.json()
  //     }))
  //     .then(function(data){
  //       console.log("data")
  //       console.log("link", data[1])
  //       if(data[1] !== null){
  //         icon = data[1].icon_img
  //       }
  //       if (data[0] !== null) {
  //         console.log(data[0])
  //         const posts = data[0].data.children;
  //         const postsWithMetadata = posts.map((post) => ({
  //           ...post,
  //           showingComments: false,
  //           comments: [],
  //           loadingComments: false,
  //           errorComments: false,
  //         }));
  //         dispatch(setPosts(postsWithMetadata));
  //       }
  //     })
  //     .catch(function(error) {
  //       console.log(error)
  //     })
  //     // if (res.status !== 200) {
  //     //   console.log(`${res.status} error!`)
  //     //   return;
  //     // }
      
  //   })
  // }

  useEffect(() => {
    generateFeed()
  }, [currentSubreddit, icon]);

  const onFavouriteClick = (e) => {
    e.preventDefault();
    if(getSubredditList.includes(currentSubreddit)){
      return
    } else {
      dispatch(addFavouriteSubreddit(currentSubreddit));
    }
  }

  return (
    <div>
      <div>
        <img id="headerIcon" src={`${icon}`} alt=""></img><h2 className="subredditName"> r/{currentSubreddit}</h2>
        <button type="button" onClick={onFavouriteClick}>Favourite</button>
      </div>
        <div className="feed">
          <div className="posts">
            {(posts != null) ? posts.map((post, index) => <Post key={index} id={index} post={post} />) : ''}
          </div>
        </div>
    </div>
  )
}
