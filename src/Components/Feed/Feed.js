import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Feed.css';
import Post from '../Post/Post.js';
import { addFavouriteSubreddit } from '../Sidebar/SidebarSlice.js';
import { setSubredditIcon, setPosts, setBannerColor, setBannerImg, setBefore, setAfter } from "./FeedSlice.js";
import { ArrowForwardIos, ArrowBackIos, Star } from '@mui/icons-material';
import RedditIcon from "../../assets/RedditIcon.png";

const Feed = () => {
  const dispatch = useDispatch();
  const currentSubreddit = useSelector((state) => state.feed.subreddit);
  const posts = useSelector((state) => state.feed.posts);
  const getSubredditList = useSelector((state) => state.sidebar.favouriteSubreddits);
  const icon = useSelector((state) => state.feed.icon);
  const bannerColor = useSelector((state) => state.feed.bannerColor);
  const bannerImg = useSelector((state) => state.feed.bannerImg);
  const beforeLink = useSelector((state) => state.feed.before);
  const afterLink = useSelector((state) => state.feed.after);

  const fetchPosts = () => {
    fetch(`https://www.reddit.com/r/${currentSubreddit}.json`)
      .then(handleResponse)
      .then(data => {
        if (data !== null) {
          console.log("Posts: ", data)
          const posts = data.data.children.map(post => ({
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            errorComments: false,
          }));
          dispatch(setPosts(posts));
          dispatch(setBefore(data.data.before))
          dispatch(setAfter(data.data.after))
        }
      })
      .catch(error => console.error("Error fetching posts:", error));
  };

  const fetchSubredditInfo = () => {
    fetch(`https://www.reddit.com/r/${currentSubreddit}/about.json`)
      .then(handleResponse)
      .then(data => {
        // console.log("Subreddit Info: ", data)
        if (data !== null) {
          dispatch(setBannerColor(data.data.banner_background_color))
          dispatch(setSubredditIcon(data.data.icon_img || RedditIcon));
          dispatch(setBannerImg(data.data.banner_img || ""));
        }
      })
      .catch(error => console.error("Error fetching subreddit info:", error));
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status} error!`);
    }
    return response.json();
  };

  useEffect(() => {
    fetchPosts();
    fetchSubredditInfo();
  }, [currentSubreddit, icon]);

  const onFavouriteClick = (e) => {
    e.preventDefault();
    if (!getSubredditList.some(x => x.name === currentSubreddit)) {
      dispatch(addFavouriteSubreddit({ name: currentSubreddit, icon: icon }));
    }
  };

  const onNextClick = () => {
    console.log(afterLink)
  }

  // const onRandomClick = (e) => {
  //   getRandomSubreddit(currentSubreddit)
  // }

  return (
    <div>
      <div className="header" style={{ backgroundColor: bannerColor, backgroundImage: `url("${bannerImg}")` }}>
        <img id="headerIcon" src={icon} alt="" />
        <h2 className="subredditName"> r/{currentSubreddit}</h2>
        <button type="button" ><ArrowBackIos /></button>
        <button type="button" onClick={onFavouriteClick}><Star /></button>
        <button type="button" onClick={onNextClick}><ArrowForwardIos /></button>
      </div>
      <div className="feed">
        <div className="posts">
          {posts && posts.map((post, index) => <Post key={index} id={index} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export default Feed;