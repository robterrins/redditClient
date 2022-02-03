import React from 'react';
import './Post.css';
import {CommentList} from '../Comment/CommentList.js'
import {useDispatch, useSelector} from 'react-redux'
import {showComments, getComments} from '../Feed/FeedSlice.js'
import {useState} from 'react'

import {Comment} from '../Comment/Comment.js'

export default function Post(props){

  const commentStatus = useSelector(state => state.feed.showComments);
  const dispatch = useDispatch();
  // const { post, onToggleComments } = props;

  const convertTimeStamp = (timestamp)=>{
    const milliseconds = timestamp * 1000;
    const dateObj = new Date(milliseconds);
    return dateObj.toLocaleString('en-GB');
  }

  const renderComments = () => {
    if (props.post.showingComments) {
      return (
        <div>
          {props.post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    };
  };

  return (
    <article className="post">
    <span className="author">Posted by {props.post.author} on {convertTimeStamp(props.post.created_utc)}</span>
    <br/>
      <a href={'https://www.reddit.com' + props.post.permalink} target="_blank">
        <h3>{props.post.title}</h3>
      </a>
      <hr></hr>
      {(props.post.thumbnail.length > 6) ? <img src={props.post.url} /> : <a>{props.post.thumbnail}</a>}
      <hr></hr>
      <div className="postScore">
        <button>Up</button>
        {props.post.score}
        <button>Down</button>
        ({props.post.upvote_ratio * 100}% Upvoted)
      </div>
        <button type="button" onClick={() => props.populateComments(props.post.permalink)}>
          Comments ({props.post.num_comments})

        </button>

        <div>
          {renderComments()}
        </div>

    </article>
  )
}
