import React, { useEffect } from 'react';
import './Post.css';
import { CommentList } from '../Comment/CommentList.js'
import { useDispatch, useSelector } from 'react-redux'
import { setComments, toggleShowingComments } from '../Feed/FeedSlice.js'
import { convertTimeStamp } from '../../utils/convertTimeStamp.js'

import { Comment } from '../Comment/Comment.js'

export default function Post(props) {
  const dispatch = useDispatch()
  const index = props.id;
  const permalink = props.post.data.permalink

  const getPostComments = async (permalink) => {
    try {
      await fetch(`https://www.reddit.com/${permalink}.json`)
        .then((response) => response.json())
        .then(jsonResponse => {
          console.log("comments", jsonResponse[1].data.children.map((comment) => comment.data))
          const comments = jsonResponse[1].data.children.map((comment) => comment.data)
          dispatch(setComments({ index, comments }))
        })
    } catch (error) {
      console.log(error)
    }
  };

  const fetchComments = (index, permalink) => async (dispatch) => {
    try {
      await getPostComments(permalink);
    } catch (error) {
      console.log(error);
    }
  }

  const onToggleComments = async () => {
    console.log(index, permalink)
    if (props.post.comments.length < 1) {
      await dispatch(fetchComments(index, permalink));
    }
    dispatch(toggleShowingComments(index))
  };

  return (
    <article className="post">
      <span className="author">Posted by {props.post.data.author} on {convertTimeStamp(props.post.data.created_utc)} {(props.post.data.over_18) ? <span id="NSFWTag">NSFW</span> : null} </span>
      <br />
      <a href={'https://www.reddit.com' + props.post.data.permalink} target="_blank">
        <h3>{props.post.data.title}</h3>
      </a>
      <hr></hr>
      {(props.post.data.thumbnail.length > 6) ? <img src={props.post.data.url} /> : <a>{props.post.data.thumbnail}</a>}
      <p>{props.post.data.selftext.replace(/\"/g, "")}</p>

      <hr></hr>
      <div className="postScore">
        <button>Up</button>
        {props.post.data.score}
        <button>Down</button>
        {props.post.data.upvote_ratio * 100}% Upvoted
      </div>
      <button type="button" onClick={onToggleComments}>
        Comments {props.post.data.num_comments}
      </button>

      <div>
        {props.post.showingComments ? props.post.comments.map((comment) => <Comment key={comment.id} comment={comment} />) : null}
      </div>

    </article>
  )
}

// onToggleComments={onToggleComments(index)
// { props.post.showingComments ? props.post.comments.map((comment) => <Comment comment={comment} key={comment.id} />) : null }