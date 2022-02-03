import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getComments} from '../Feed/FeedSlice.js'

import './Feed.css';
import Post from '../Post/Post.js';

import {addFavouriteSubreddit} from '../Sidebar/SidebarSlice.js'
import {setPosts} from "./FeedSlice.js"
import {generateFeed} from "./FeedSlice.js"

export default function Feed () {
  const dispatch = useDispatch();
  const currentSubreddit = useSelector((state) => state.feed.subreddit);
  const posts = useSelector((state) => state.feed.posts);
  const getSubredditList = useSelector((state) => state.sidebar.favouriteSubreddits);

  const generateFeed = () => {
    fetch(`https://www.reddit.com/r/${currentSubreddit}.json`).then(res => {
      if(res.status!=200){
        console.log(`${res.status} error!`)
        return;
      }
      res.json().then(data => {
        if(data!=null){
          console.log(data);
          dispatch(setPosts(data.data.children));
        }
      });
    })
  }

  useEffect(() => {
    generateFeed()
  }, [currentSubreddit]);

  const onFavouriteClick = (e) => {
    e.preventDefault();
    if(getSubredditList.includes(currentSubreddit)){
      return
    } else {
      dispatch(addFavouriteSubreddit(currentSubreddit));
    }
  }

  const populateComments = (index) => {
    const comments = (permalink) => {
      dispatch(fetchComments(index, permalink));
    }
  }

  const getPostComments = async (permalink) => {
    const response = await fetch(`https://www.reddit.com/${permalink}.json`);
    const json = await response.json();
    console.log(json)
    return Array.from(json[1].data.children.map((comment) => comment.data),);
  };

  const fetchComments = (index, permalink) => async (dispatch) => {
    try {
      const comments = await getPostComments(permalink);
      dispatch(getComments({ index, comments }));
    } catch (error) {
      console.log(error);
      return;
    };
  };

  return (
    <div>

      <div>
        <h2 className="subredditName">r/{currentSubreddit}</h2>
        <button type="button" onClick={onFavouriteClick}>Favourite</button>
      </div>

        <div className="feed">
          <div className="posts">
            {(posts != null) ? posts.map((post, index) => <Post key={index} id={index} post={post.data} populateComments={populateComments(index)}/>) : ''}
          </div>
        </div>

    </div>
  )
}
