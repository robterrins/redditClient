import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomSubreddit } from '../../API/reddit.js';

import './Feed.css';
import Post from '../Post/Post.js';

import { addFavouriteSubreddit } from '../Sidebar/SidebarSlice.js'
import { setSubredditIcon, setPosts, setBannerColor, setBannerImg } from "./FeedSlice.js"

import { ArrowForwardIos } from '@mui/icons-material';
import { ArrowBackIos } from '@mui/icons-material';
import Star from '@mui/icons-material/Star'

export default function Feed() {
  const dispatch = useDispatch();
  const currentSubreddit = useSelector((state) => state.feed.subreddit);
  const posts = useSelector((state) => state.feed.posts);
  const getSubredditList = useSelector((state) => state.sidebar.favouriteSubreddits);
  const icon = useSelector((state) => state.feed.icon);
  const bannerColor = useSelector((state) => state.feed.bannerColor);
  const bannerImg = useSelector((state) => state.feed.bannerImg)

  const generateFeed = () => {
    fetch(`https://www.reddit.com/r/${currentSubreddit}.json`).then(res => {
      if (res.status !== 200) {
        console.log(`${res.status} error!`)
        return;
      } else {
        res.json().then(data => {
          if (data !== null) {
            console.log("Subreddit Data", data)
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
      }
    })
    fetch(`https://www.reddit.com/r/${currentSubreddit}/about.json`).then(res => {
      if (res.status !== 200) {
        console.log(`${res.status} error!`)
        return;
      } else {
        console.log(res)
        res.json().then(data => {
          if (data !== null) {
            console.log(data)
            console.log("Banner Color", data.data.banner_background_color)
            console.log("Banner Image", data.data.banner_img)
            dispatch(setBannerColor(data.data.banner_background_color))
            dispatch(setSubredditIcon(data.data.icon_img))
            if (data.data.banner_img !== "") {
              dispatch(setBannerImg(data.data.banner_img))
            } else {
              dispatch(setBannerImg(""))
            }
          }
        })
      }
    })
  }

  // const generateFeed = () => {
  //   console.log(icon)
  //   // dispatch(setIcon(icon))

  //   fetch(`https://www.reddit.com/r/${currentSubreddit}.json`)
  //     .then(res => {
  //       if (res.status !== 200) {
  //         console.log(`${res.status} error!`)
  //         return;
  //       } else {
  //         return res.json()
  //       }
  //     })
  //     .then(data => {
  //       if (data !== null) {
  //         console.log(data)
  //         const iconUrl = data[1]?.icon_img || '';
  //         dispatch(setIcon(iconUrl));
  //         const posts = data.data.children;
  //         const postsWithMetadata = posts.map((post) => ({
  //           ...post,
  //           showingComments: false,
  //           comments: [],
  //           loadingComments: false,
  //           errorComments: false,
  //         }));
  //         dispatch(setPosts(postsWithMetadata));
  //       }
  //     });
  // }

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
    if (getSubredditList.includes(currentSubreddit)) {
      return
    } else {
      dispatch(addFavouriteSubreddit(currentSubreddit));
    }
  }

  const onRandomClick = (e) => {
    getRandomSubreddit(currentSubreddit)
  }

  return (
    <div>
      <div style={{ backgroundColor: bannerColor, backgroundImage: `url("${bannerImg}")` }} >
        <img id="headerIcon" src={icon} alt="" /><h2 className="subredditName"> r/{currentSubreddit}</h2>

        <button type="button" ><ArrowBackIos /></button>
        <button type="button" onClick={onFavouriteClick}><Star /></button>
        {/* <button type="button" onClick={onRandomClick}>Random</button> */}
        <button type="button" ><ArrowForwardIos /></button>
      </div>
      <div className="feed">
        <div className="posts">
          {(posts != null) ? posts.map((post, index) => <Post key={index} id={index} post={post} />) : ''}
        </div>
      </div>
    </div>
  )
}
