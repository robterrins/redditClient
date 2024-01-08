import React, { useEffect } from 'react';
import './Post.css';
import { CommentList } from '../Comment/CommentList.js'
import { useDispatch, useSelector } from 'react-redux'
import { setComments, toggleShowingComments } from '../Feed/FeedSlice.js'
import { convertTimeStamp } from '../../utils/convertTimeStamp.js'
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import { Chat, ChatBubble } from '@mui/icons-material';
import { Comment } from '../Comment/Comment.js'

export default function Post(props) {
  const dispatch = useDispatch()
  const index = props.id;
  const permalink = props.post.data.permalink
  
  let imgID = ""
  let imgURL = ""
  let imgType = ""
  if (props.post.data.is_gallery) {
    imgID = props.post.data.gallery_data.items[0].media_id;
    const imgMeta = props.post.data.media_metadata[`${imgID}`].id
    console.log("Image META", imgMeta)

    switch (props.post.data.media_metadata[`${imgID}`].m) {
      case "image/jpg":
        imgType = "jpg"
        break;
      case "image/png":
        imgType = "png"
        break;
      default:
        imgType = "png"
    }


    imgURL = `https://i.redd.it/${imgMeta}.${imgType}`
  } else {
    imgURL = props.post.data.url
  }

  // console.log(props.post.data.title)
  // console.log(imgID)
  // console.log(imgURL)

  const getPostComments = async (permalink) => {
    try {
      await fetch(`https://www.reddit.com/${permalink}.json`)
        .then((response) => response.json())
        .then(jsonResponse => {
          console.log(jsonResponse)
          console.log("comments", jsonResponse[1].data.children.map((comment) => comment.data))
          const comments = jsonResponse[1].data.children.map((comment) => comment.data)
          dispatch(setComments({ index, comments }))
        })
    } catch (error) {
      console.error(error)
    }
  };

  const fetchComments = (index, permalink) => async (dispatch) => {
    try {
      await getPostComments(permalink);
    } catch (error) {
      console.error(error);
    }
  }

  const onToggleComments = async () => {
    console.log(index, permalink)
    if (props.post.comments.length < 1) {
      await dispatch(fetchComments(index, permalink));
    }
    dispatch(toggleShowingComments(index))
  };

  //"https://i.redd.it/sv0oqrl3rtac1.png"

  return (
    <article className="post">
      <span className="author">Posted by {props.post.data.author} on {convertTimeStamp(props.post.data.created_utc)} {(props.post.data.over_18) ? <span id="NSFWTag">NSFW</span> : null} </span>
      <br />
      <a href={'https://www.reddit.com' + props.post.data.permalink} target="_blank">
        <h3>{props.post.data.title}</h3>
      </a>
      <hr></hr>
      {/* {(props.post.data.thumbnail.length > 6) ? <img src={props.post.data.url} /> : <a>{props.post.data.thumbnail}</a>} */}
      <img src={imgURL} />
      <p>{props.post.data.selftext.replace(/\"/g, "")}</p>

      <hr></hr>
      <div className="postScore">
        <button><ArrowUpward /></button>
        {props.post.data.score}
        <button><ArrowDownward /></button>
        {props.post.data.upvote_ratio * 100}% Upvoted
      </div>
      <button type="button" onClick={onToggleComments}>
        <ChatBubble /> {props.post.data.num_comments}
      </button>

      <div>
        {props.post.showingComments ? props.post.comments.map((comment) => <Comment key={comment.id} comment={comment} />) : null}
      </div>

    </article>
  )
}

// onToggleComments={onToggleComments(index)
// { props.post.showingComments ? props.post.comments.map((comment) => <Comment comment={comment} key={comment.id} />) : null }