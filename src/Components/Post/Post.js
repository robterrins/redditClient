import React from 'react';
import './Post.css';
import {CommentList} from '../CommentList/CommentList.js'
import {useDispatch, useSelector} from 'react-redux'
import {showComments, getComments} from '../Feed/FeedSlice.js'

import {Comment} from '../CommentList/Comment.js'

export default function Post(props){

  const commentStatus = useSelector(state => state.feed.showComments);
  const dispatch = useDispatch();

  const convertTimeStamp = (timestamp)=>{
    const milliseconds = timestamp * 1000;
    const dateObj = new Date(milliseconds);
    return dateObj.toLocaleString('en-GB')
  }

  const toggleComments = (e) => {
    e.preventDefault();
    dispatch(showComments(true));
    const permalink = props.post.permalink;
    const index = props.post.index
    const comment = getPostComments(permalink)
    dispatch(getComments({index: index, comment: comment}))
  }

  const getPostComments = async (permalink) => {
    const response = await fetch(`https://www.reddit.com/${permalink}.json`);
    const json = await response.json();
    console.log(json)
    return Array.from(json[1].data.children.map((comment) => comment.data),);
  };

  return (
    <article className="post">
    <span className="author">Posted by {props.post.author} on {convertTimeStamp(props.post.created_utc)}</span>
      <a href={'https://www.reddit.com' + props.post.permalink} target="_blank">
        <h3>{props.post.title}</h3>
      </a>
      {(props.post.thumbnail.length > 6) ? <img src={props.post.url} /> : <a>{props.post.thumbnail}</a>}
      <hr></hr>
      <div className="postScore">
        <button>Up</button>
        {props.post.score}
        <button>Down</button>
        ({props.post.upvote_ratio * 100}% Upvoted)
      </div>
        <button type="button" onClick={toggleComments}>
          Comments ({props.post.num_comments})
        </button>
        {commentStatus ? <CommentList /> : ""}
        <div>

        </div>
    </article>
  )
}
  // {getPostComments(props.post.permalink).map((comment, index) => <Comment key={index} id={index} comment={comment.data}/>)}
